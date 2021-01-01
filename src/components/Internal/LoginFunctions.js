import { firebase, firestore, auth } from "components/Internal/Firebase.js";

export const loginUser = (WithExtendedScope=false) => {
  return new Promise((resolve, reject) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    // todo: Provide option to ignore
    if (WithExtendedScope) {
      provider.addScope(
        "https://www.googleapis.com/auth/fitness.activity.read"
      );
      console.log("added scope")
      provider.addScope("https://www.googleapis.com/auth/fitness.sleep.read");
      provider.addScope("https://www.googleapis.com/auth/fitness.body.read");
      provider.addScope(
        "https://www.googleapis.com/auth/fitness.blood_pressure.read"
      );
    }
    resolve(auth.signInWithPopup(provider));
  });
};

export const logoutUser = () => {
  return new Promise((resolve, reject) => {
    resolve(auth.signOut());
  });
};
