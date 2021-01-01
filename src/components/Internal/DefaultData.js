import {
  getCurrentDate,
  getStringDate,
} from "components/Internal/VisuElements.js";

export const defaultURL = "app.spexdoc.net";

export const CommonCompsData = {
  loginState: false,
  LoginAlertProps: {
    openLoginRequired: false,
    FuncParams: "test",
  },
  PopUpProps: {
    openPopUp: false,
    message: "Test Message",
    type: "info", //info, success, warning, danger, primary
    FuncParams: "test",
  },
};

export const DefaultCategories = [
  { title: "Kardiologie" },
  { title: "Dermatologie" },
  { title: "Allergologie" },
];


export const DefaultUserProfile={
  email: "",
  firstName: "",
  lastName: "",
  plz: "",
  city: "",
  street: "",
  birthDate: "",
  insurance: "",
  aboutMe: "",
}


export const DefaultMedRecord = {
  files: [],
  date: getCurrentDate(),
  open: false,
};
