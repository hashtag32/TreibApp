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
import { getPublicKey } from "components/Internal/Extraction.js";
import { getUserID } from "components/Internal/Checks.js";

import { readGlobalDoc } from "components/Internal/DBFunctions";


export const AdminUserIDList=["8X81AgrU6Sc3Z23OMsXw4zLNuno2"]

// export const isAdmin = () => {
//   return AdminUserIDList.includes(getUserID());
// };


export const isAdmin = async (user_id = getUserID()) => {
  var doc_data = await readGlobalDoc("UserInfo");

  console.log(doc_data[user_id] == "admin")
  return doc_data[user_id] == "admin";
};

export const isSupervisor = async (user_id = getUserID()) => {
  var doc_data = await readGlobalDoc("UserInfo");

  return doc_data[user_id] == "supervisor";
};


export const getUserInfo = async (user_id = getUserID()) => {
  var doc_data = await readGlobalDoc("UserInfo");

  if(doc_data[user_id]==null)
  {
    return "Patient";
  }
  return Capitalize(doc_data[user_id]);
};


const Capitalize=(str)=>{
  return str.charAt(0).toUpperCase() + str.slice(1);
  }