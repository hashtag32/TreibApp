import * as firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKI3uGP37dIErAQQXnSEfx6dHRmsJt8MM",
  authDomain: "treibapp.firebaseapp.com",
  projectId: "treibapp",
  storageBucket: "treibapp.appspot.com",
  messagingSenderId: "812959850843",
  appId: "1:812959850843:web:fc2c259e2f0ee5504b7a7e",
  measurementId: "G-2RE56T3HNH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.analytics();

// alias
const firestore = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// todo: Maybe add this to access offline pwa
// https://stackoverflow.com/questions/57234932/how-to-use-firebase-auth-and-cloud-firestore-from-different-components-as-a-sing
// https://firebase.google.com/docs/projects/pwa
firestore.enablePersistence();


export { firestore, auth, firebase, storage };
