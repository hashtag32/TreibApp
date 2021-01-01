import React from "react";
import LoginAlert from "components/LoginAlert/LoginAlert.js";
import PopUp from "components/PopUp/PopUp.js";

export const openLoginAlert = () => {
  console.log("openLoginAlert");

  const loginState = {
    openLoginRequired: true,
  };
  return <LoginAlert loginState={loginState} />;
};

export const openPopUp = () => {
  console.log("openPopUp");

  const PopUpProps = {
    openPopUp: true,
    message: "File Successfully uploaded",
  };
  return <PopUp popUp={PopUpProps} />;
};

export const openWindow = (link) => {
  window.open(link);
};

// Return 17.12.2020
export const getCurrentDate = (separator = ".") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
};

// Return 17.12.2020
export const getStringDate = (inputDate) => {
  var separator = ".";
  let date = inputDate.getDate();
  let month = inputDate.getMonth() + 1;
  let year = inputDate.getFullYear();

  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
};
