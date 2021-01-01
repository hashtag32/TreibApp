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
import CardActionArea from "@material-ui/core/CardActionArea";
import { openWindow } from "components/Internal/VisuElements.js";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import UploadImage from "components/VisuComps/UploadImage";

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

class ContactUs extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      uploadFiles: [],
      selectedRequest: "",
      answerMessage: "",
      medRecord: {
        ...DefaultMedRecord,
      },
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };
  }

  componentDidMount() {
    this.updateComp();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.updateComp();
    }
  }

  // Required from CommonProps
  updateComp = () => {};

  submitContactForm = () => {
    if (!this.checkLoginAndDisplay()) {
      return;
    }

    var requestData = {
      message: this.state.contactMessage,
      files: this.state.uploadFiles,
    };

    writeRequest(requestData, "contact").then(() => {
      this.setState({
        contactMessage: "",
      });
      this.setState({
        uploadFiles: [],
      });
      this.displayPopUp("Anfrage erfolgreich versendet");
    });
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
                <h4 className={classes.cardTitleWhite}>Kontaktformular</h4>

                <p className={classes.cardCategoryWhite}>
                  Deine Daten werden vertraulich behandelt.
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Deine Frage"
                      multiline
                      fullWidth="true"
                      rows={8}
                      variant="outlined"
                      inputProps={{
                        value: this.state.contactMessage,
                        onChange: (e) =>
                          this.handlePropertyChange("contactMessage", e),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  {this.state.uploadFiles.map((file) => (
                    <GridItem xs={12} sm={6} md={4}>
                      <Card className={classes.mediaroot}>
                        <CardActionArea
                          onClick={(e) => openWindow(file.link, e)}
                        >
                          {file.isImage ? (
                            <CardMedia
                              className={classes.media}
                              image={file.link}
                            />
                          ) : (
                            <CardMedia
                              className={classes.media}
                              image="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                            />
                          )}
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {file.name}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </GridItem>
                  ))}
                </GridContainer>
                <UploadImage
                  uploadImageAction={this.uploadImageAction}
                  param={null}
                />
              </CardBody>
              <CardFooter>
                <Button
                  className={classes.submitButton}
                  color="primary"
                  onClick={this.submitContactForm}
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

ContactUs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactUs);
