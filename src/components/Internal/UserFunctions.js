import {
  auth,
  firebase,
  firestore,
  storage,
} from "components/Internal/Firebase.js";

import Button from "components/CustomButtons/Button.js";
import LoginAlert from "components/LoginAlert/LoginAlert.js";
import MaterialTable from "material-table";
import React from "react";
import {
  getPublicKey,
  publicKeyProvided,
} from "components/Internal/Extraction.js";
import { isSharingAllowed } from "components/Internal/Sharing.js";

import { getUserID } from "components/Internal/Checks.js";
import {
  getStringDate,
  getCurrentDate,
} from "components/Internal/VisuElements.js";
import { readGlobalDoc } from "./DBFunctions";

// Use Case specific
export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
   
    var result=readGlobalDoc("UserInfo");
    
  });
};
