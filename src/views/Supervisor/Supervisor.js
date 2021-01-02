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

class Supervisor extends VisuComp {
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

  SupervisorName = () => {
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

  //todo: connect this.SupervisorName() and this.state.MedRecords.doctor

  submitMedRecord = () => {
    // Get UserProfile
    var user_id = this.state.medRecord.user_id;

    writeNotification(
      "Neuer Befund liegt vor von " + this.SupervisorName(),
      this.SupervisorName(),
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
      this.SupervisorName(),
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
        <CommonComps commonProps={this.state.commonProps} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Befund schreiben</h4>

                <p className={classes.cardCategoryWhite}>
                  Legen Sie einen Befund für einen Patienten an.
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  {/* Read all user -> provide in list - NO! Only userid */}
                  {/* More or less copy befunddaten hierher */}
                  {/* Directly write into the user space */}
                  {/* Write Notification that new befund available */}
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="User ID"
                      id="user_id"
                      required
                      inputProps={{
                        value: this.state.medRecord.user_id,
                        onChange: (e) => this.handlePropertyChangeWithProperty("medRecord","user_id", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Datum"
                      id="date"
                      inputProps={{
                        value: this.state.medRecord.date,
                        onChange: (e) => this.handlePropertyChangeWithProperty("medRecord","date", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Arzt"
                      id="doctor"
                      inputProps={{
                        value: this.state.medRecord.doctor,
                        onChange: (e) => this.handlePropertyChangeWithProperty("medRecord","doctor", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Krankheit"
                      id="disease"
                      inputProps={{
                        value: this.state.medRecord.disease,
                        onChange: (e) => this.handlePropertyChangeWithProperty("medRecord","disease", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    {/* todo: cleanup */}
                    <CustomInput
                      labelText="Kategorie"
                      id="disease"
                      inputProps={{
                        value: this.state.medRecord.category,
                        onChange: (e) => this.handlePropertyChangeWithProperty("medRecord","category", e),
                      }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Symptome"
                      id="moreInfo"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.medRecord.symptoms,
                        onChange: (e) => this.handlePropertyChangeWithProperty("medRecord","symptoms", e),
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Diagnose"
                      id="moreInfo"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.medRecord.diagnosis,
                        onChange: (e) => this.handlePropertyChangeWithProperty("medRecord","diagnosis", e),
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Weiteres"
                      id="moreInfo"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.medRecord.moreInfo,
                        onChange: (e) => this.handlePropertyChangeWithProperty("medRecord","moreInfo", e),
                        multiline: true,
                        rows: 5,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  className={classes.submitButton}
                  color="primary"
                  onClick={this.submitMedRecord}
                >
                  Absenden
                </Button>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Patientenfragen</h4>

                <p className={classes.cardCategoryWhite}>
                  Beantworten Sie dem Patienten die Frage. Die Daten werden
                  vertraulich übermittelt.
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {this.state.Requests ? (
                      <div>
                        <FormControl className={classes.formControl}>
                          <Select
                            value={this.state.selectedRequest}
                            onChange={(ev) =>
                              this.handlePropertyChange("selectedRequest", ev)
                            }
                          >
                            {this.state.Requests.map((request) => (
                              <MenuItem value={request.id}>
                                {request.id}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <br />
                        <Typography variant="body1">
                          Message:
                          {this.getRequestData("message")}
                        </Typography>
                        <br />
                        {this.getRequest().answered ? (
                          <Typography variant="body1">
                            Answered:
                            {this.getRequest().answered.toString()}
                          </Typography>
                        ) : null}
                        <br />
                        <Typography variant="body1">
                          User_id:
                          {this.getRequest().user_id}
                        </Typography>

                        <DisplayFiles files={this.getRequestData("files")} />
                        <br />
                      </div>
                    ) : null}

                    <br />
                    <Typography variant="body1">
                      Sie antworten als {this.SupervisorName()}
                    </Typography>
                    <br />

                    <TextField
                      id="outlined-multiline-static"
                      label="Deine Antwort"
                      multiline
                      fullWidth="true"
                      rows={8}
                      defaultValue="Default Value"
                      variant="outlined"
                      inputProps={{
                        value: this.state.answerMessage,
                        onChange: (ev) =>
                          this.handlePropertyChange("answerMessage", ev),
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  className={classes.submitButton}
                  color="primary"
                  onClick={this.submitAnswer}
                >
                  Absenden
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Supervisor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Supervisor);
