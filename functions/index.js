"use strict";

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

const functions = require("firebase-functions");

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
// [END import]

// ***Messaging***
// When a new request comes in, send notification to every person with supervisor status
exports.requestHandler = functions.firestore
  .document("/globalData/globalDoc/requests/{tx_id}")
  .onCreate(async (snap, context) => {
    var tx_id = context.params.tx_id;

    // Should be extended to list of admins
    // todo: read supervisor list from firebase
    var admin_user_id = "8X81AgrU6Sc3Z23OMsXw4zLNuno2";

    var message = `Du hast eine neue Anfrage. siehe (${tx_id})`;

    console.log(message);

    writeNotification(message, tx_id, admin_user_id);
  });

// Send notification that user got notification
exports.sendNotification = functions.firestore
  .document("userStorage/users/{user_id}/Notifications")
  .onUpdate(async (change, context) => {
    const previousValue = change.before.data();
    const newValue = change.after.data();

    // newValue must contain a larger array than the old one (notification added)
    if (previousValue["data"].length < newValue["data"].length) {
      var user_id = context.params.user_id;

      sendNotificationToUser(user_id);
    }
    return true;
  });

// *** User Management ***
// exports.sendNotification = functions.firestore
//   .document("userStorage/users/")
//   .onUpdate(async (change, context) => {
//     const previousValue = change.before.data();
//     const newValue = change.after.data();

//     // newValue must contain a larger array than the old one (notification added)
//     if (previousValue["data"].length < newValue["data"].length) {
//       var user_id = context.params.user_id;

//       sendNotificationToUser(user_id);
//     }
//     return true;
//   });

//
// DBFunctions.js
//
async function sendNotificationToUser(user_id) {
  return new Promise((resolve, reject) => {
    // Get the deviceTokens
    var docRef_userData = admin
      .firestore()
      .collection("userStorage")
      .doc("users")
      .collection(user_id)
      .doc("UserData");

    return docRef_userData.get().then(async (user_data_doc) => {
      // Get all devices of user_id
      const doc_data = user_data_doc.data()["data"];
      var deviceTokenList = doc_data.deviceTokenList;

      var payload = {
        data: {
          title: "Neue Benachrichtigung",
          body: `Es gibt Neuigkeiten. Überprüfe deine Nachrichten`,
        },
        tokens: deviceTokenList,
      };

      // Send a message to the device corresponding to the provided
      // registration token.
      admin
        .messaging()
        .sendMulticast(payload)
        .then((response) => {
          // Response is a message ID string.
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
    });
    resolve(true);
  });
}

async function newNotification(message, sender) {
  return new Promise(async (resolve, reject) => {
    var newNotification = {
      favoriteActive: false,
      message: message,
      sender: sender,
      date: await getCurrentDate(),
      title: "Neue Nachricht",
    };
    resolve(newNotification);
  });
}

async function writeNotification(message, sender, recipient_uid) {
  return new Promise(async (resolve, reject) => {
    // First read the data and then append list
    readDBDataWithUid("Notifications", recipient_uid).then(async (doc_data) => {
      var notificationList = [];
      if (doc_data != null) {
        notificationList = doc_data;
      }

      var newNotificationMsg = await newNotification(message, sender);
      notificationList.push(newNotificationMsg);

      writeDBDataWithUid("Notifications", notificationList, recipient_uid);
      resolve(true);
    });
  });
}

async function writeDBDataWithUid(docName, data, user_id) {
  admin
    .firestore()
    .collection("userStorage")
    .doc("users")
    .collection(user_id)
    .doc(docName)
    .set({
      data: data, // Required because array cannot be pushed
    });
  return true;
}

async function readDBDataWithUid(docName, user_id) {
  return new Promise((resolve, reject) => {
    var docRef = admin
      .firestore()
      .collection("userStorage")
      .doc("users")
      .collection(user_id)
      .doc(docName);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      })
      .then((doc_data) => {
        if (doc_data != null) resolve(doc_data["data"]);
        else resolve(null);
      });
  });
}

// Return 17.12.2020
async function getCurrentDate(separator = ".") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
}
