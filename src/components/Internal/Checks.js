import { firebase, firestore, auth } from "components/Internal/Firebase.js";
import { defaultURL } from "components/Internal/DefaultData.js";

const BitlyClient = require("bitly").BitlyClient;
//todo: Hide key
const bitly = new BitlyClient("10f3147740e04fd0ea4c68788a84147cc6034dfa");

// Get user_id -> checkUser -> LoginAlert
export const checkUser = () => {
  return auth.currentUser != null;
};

export const getUser = () => {
  if (checkUser()) {
    return auth.currentUser;
  }
  return null;
};

export const getUserID = () => {
  if (checkUser()) {
    return auth.currentUser.uid;
  }
  return null;
};

export const getUserEmail = () => {
  if (checkUser()) {
    return auth.currentUser.email;
  }
  return null;
};

export const getShortLink = async (property, withouthttps = false) => {
  var longLink =
    "https://app.spexdoc.net/" + property + "/publicKey=" + getUserID();
  const response = await bitly.shorten(longLink);

  var link = response.link;
  if (withouthttps) {
    var https = "https://";
    if (link.includes(https)) {
      var link_without_https_length = link.indexOf(https); // 38

      var link_without_https = link.substr(
        link_without_https_length + https.length
      );

      link = link_without_https;
    }
  }
  return link;
};

export const removehttpsFromLink = (link) => {
  var https = "https://";
  if (link.includes(https)) {
    var link_without_https_length = link.indexOf(https); // 38

    var link_without_https = link.substr(
      link_without_https_length + https.length
    );
    return link_without_https;
  } else {
    console.log("error: no https given");
    return link;
  }
};
