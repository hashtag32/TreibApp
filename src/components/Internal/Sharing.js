import React from "react";
import { readDBDataWithUid } from "./DBFunctions";
import { getPublicKey } from "./Extraction";

export const shareLink = (message, link) => {
  if (navigator.share) {
    navigator
      .share({
        title: "Sharing",
        text: message,
        url: link,
      })
      .then(() => {
        console.log("Successfully shared");
        return true;
      })
      .catch((error) => {
        console.error("Something went wrong sharing the blog", error);
      });
  } else {
    return false;
  }
};

// Based on link, get the publicKey
export const isSharingAllowed = (docName, writing = false) => {
  // Has to be generally allowed to share

  return TableInShareMap(docName) != null;
};

export const TableInShareMap = (Table) => {
  var returnValue = null;
  Object.keys(ShareToTable).map((ShareItem, index) => {
    var TableList = ShareToTable[ShareItem];

    if (TableList.includes(Table)) {
      returnValue = ShareItem;
    }
  });

  return returnValue;
};

export const ShareToTable = {
  Emergency: [
    "EmergencyPredisposition",
    "EmergencyMedication",
    "EmergencyContacts",
    "OrganDonationData",
  ],
  MedRecords: ["MedRecords", "CategoryList"],
  Vaccination: ["Vaccination"],
};
