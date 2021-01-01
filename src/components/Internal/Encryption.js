
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

export const writeDBData=(docName, data) => {
  var user = firebase.auth().currentUser;
  if (user == null) {
    return;
  }
  var user_id = user.uid;

  firebase
    .firestore()
    .collection("userStorage")
    .doc("users")
    .collection(user_id)
    .doc(docName)
    .set({
      data: data, // Required because array cannot be pushed
    });
}

export const readDBData=(docName, data) => {
  var user = firebase.auth().currentUser;
  if (user == null) {
    return;
  }
  var user_id = user.uid;

  firebase
    .firestore()
    .collection("userStorage")
    .doc("users")
    .collection(user_id)
    .doc(docName)
    .set({
      data: data, // Required because array cannot be pushed
    });
}
