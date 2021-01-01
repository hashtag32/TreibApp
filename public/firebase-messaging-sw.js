// Only working empty, otherwise the with firebase serve -p 8085, the token is not able to be retrieved
// Leave blank for now
// When testing make sure the Strg+Up+R + cache is deleted

// // Import and configure the Firebase SDK
// // These scripts are made available when the app is served or deployed on Firebase Hosting
// // If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts("/__/firebase/8.1.2/firebase-app.js");
importScripts("/__/firebase/8.1.2/firebase-messaging.js");
importScripts("/__/firebase/init.js");

const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START on_background_message]
messaging.onBackgroundMessage((payload) => {
  // Triggered when background is obtained
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "/favicon.ico",
    vibrate: [80, 270, 40, 530], //heart beat
    data: {
      url: "https://app.spexdoc.net", // doesn't work like that
    },
  };
  // todo: add link

  self.registration.showNotification(notificationTitle, notificationOptions);
});
// [END on_background_message]
