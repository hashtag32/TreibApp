import {
  labKeyToNameMapping,
  labKeyToNameUnit,
  limits,
} from "views/SmartDoc/SmartDoc_Data.js";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PlainTable from "components/EditableTableReport/PlainTable.js";
import PropTypes from "prop-types";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

import VisuComp from "components/Internal/VisuComp.js";
import { checkUser } from "components/Internal/Checks.js";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getAllUsers } from "components/Internal/UserFunctions.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import DisplayFiles from "components/VisuComps/DisplayFiles.js";

import {
  writeRequest,
  writeNotification,
  getRequests,
  changeRequest,
  writeDBDataWithUid,
  readDBDataWithUid,
} from "components/Internal/DBFunctions.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import CommonComps from "components/Internal/CommonComps.js";
import {
  DefaultUserProfile,
  DefaultMedRecord,
} from "components/Internal/DefaultData";

const styles = (theme) => ({
  margin: {
    margin: "0",
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  submitButton: {
    marginRight: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
});

class FAQ extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      selectedRequest: "",
      answerMessage: "",
      medRecord: {
        ...DefaultMedRecord,
      },
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      // this.TableFetch("Requests");
      this.fetchData();

      // Only required for visu, not loading
      this.setState({
        commonProps: { ...this.state.commonProps, loginState: checkUser() },
      });
    }
  }

  fetchData = async () => {
    // Loading UserProfile
    this.TableFetch("UserProfile");

    // Request Loading
    var requests = await getRequests();
    requests = this.filterRequests(requests);

    this.setState({
      Requests: requests,
    });
  };

  // Required from CommonProps
  updateComp = () => {};

  FAQName = () => {
    if (this.state.UserProfile != null) {
      return (
        //todo fix data bug
        this.state.UserProfile.firstName + " " + this.state.UserProfile.lastName
      );
    } else {
      return "";
    }
  };

  filterRequests = (requests) => {
    var filteredRequests = [];

    requests.forEach((request) => {
      if (request.data.answered == false) {
        filteredRequests.push(request);
      }
    });
    return filteredRequests;
  };

  //todo: connect this.FAQName() and this.state.MedRecords.doctor

  submitMedRecord = () => {
    // Get UserProfile
    var user_id = this.state.medRecord.user_id;

    writeNotification(
      "Neuer Befund liegt vor von " + this.FAQName(),
      this.FAQName(),
      user_id
    );

    // Write to user db
    readDBDataWithUid("MedRecords", user_id).then((doc_data) => {
      // Append
      const MedRecords = [...doc_data];
      MedRecords.push(this.state.medRecord);

      // Write new data
      writeDBDataWithUid("MedRecords", MedRecords, user_id);

      this.displayPopUp("Danke, Befund gesendet.");

      // Reset
      this.setState({
        medRecord: {
          ...DefaultMedRecord,
        },
      });
    });
  };

  submitAnswer = () => {
    // Get UserProfile
    writeNotification(
      this.state.answerMessage,
      this.FAQName(),
      this.getRequest().user_id
    );

    changeRequest(this.state.selectedRequest, "answered", true);

    // Reset
    this.setState({
      answerMessage: "",
    });

    this.displayPopUp("Danke, Frage beantwortet.");
  };

  getRequest = () => {
    var returnData = "";
    this.state.Requests.forEach((request) => {
      if (request.id == this.state.selectedRequest) {
        returnData = request.data;
      }
    });
    return returnData;
  };

  getRequestData = (property) => {
    if (this.getRequest() != "") {
      if (this.getRequest()["requestData"].hasOwnProperty(property)) {
        return this.getRequest()["requestData"][property];
      }
    }
    // Default values
    else if (property == "files") {
      return [];
    } else {
      return null;
    }
  };

  testfunc = async () => {
    // var test=await getAllUsers()
    console.log(this.state);
    // changeRequest("sFoan0ow0L1EbXVfeu5L", "answered", true);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* todo: Heading FAQ */}
        <CommonComps commonProps={this.state.commonProps} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose">
                <h4 className={classes.cardTitleWhite}>
                  Wie sicher sind meine Daten?
                </h4>
              </CardHeader>
              <CardBody>
                <Typography variant="body1">
                  Die Daten verfügen über mehrere Sicherheitsstufen:
                </Typography>
                {/* Https, verschlüsselt auf EU, open source, nicht genannte Verschlüsselungen */}
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose">
                <h4 className={classes.cardTitleWhite}>
                  Wer kann meine Daten einsehen?
                </h4>
              </CardHeader>
              <CardBody>
                <Typography variant="body1">
                  Über die Freigabe können Sie steuern wer ihre Daten einsehen kann.
                </Typography>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="rose">
                <h4 className={classes.cardTitleWhite}>
                  Kann jeder mit der Notfallkarte meine Daten einsehen?
                </h4>
              </CardHeader>
              <CardBody>
                <Typography variant="body1">
                  Ja, aber nur die eingegebenen Notfalldaten. 
                  Nach einer Kooperation mit allen Rettungsdiensten deutschlandweit, können nur noch Rettungsdienste ihre Daten einsehen
                </Typography>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Typography variant="body1">
          Weitere Fragen? Kontaktieren Sie uns.{" "}
        </Typography>
      </div>
    );
  }
}

FAQ.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAQ);
