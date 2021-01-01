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
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import GridItem from "components/Grid/GridItem.js";
import PlainTable from "components/EditableTableReport/PlainTable.js";
import PropTypes from "prop-types";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import VisuComp from "components/Internal/VisuComp.js";
import { checkUser } from "components/Internal/Checks.js";
import { withStyles } from "@material-ui/core/styles";
import { writeRequest } from "components/Internal/DBFunctions.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import CommonComps from "components/Internal/CommonComps.js";
import UploadImage from "components/VisuComps/UploadImage";
import {
  readDBData,
  uploadFile,
  writeDBData,
} from "components/Internal/DBFunctions.js";

import { openWindow } from "components/Internal/VisuElements.js";

const styles = (theme) => ({
  margin: {
    margin: "0",
  },
  mediaroot: {
    maxWidth: 345,
  },
  media: {
    height: 140,
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

class SmartDoc extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
      uploadFiles: [],
      bloodValueTable: {
        //todo: capsulate and parameterize
        name: "bloodValueTable",
        editable: {
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              resolve(this.onRowAdd(newData, "bloodValueTable"));
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              resolve(this.onRowUpdate(newData, oldData, "bloodValueTable"));
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              resolve(this.onRowDelete(oldData, "bloodValueTable"));
            }),
        },
        columns: [
          {
            title: "Laborwert",
            field: "labKey",
            lookup: {
              //todo: getall
              1: labKeyToNameUnit(1),
              2: labKeyToNameUnit(2),
              3: labKeyToNameUnit(3),
              4: labKeyToNameUnit(4),
              5: labKeyToNameUnit(5),
              6: labKeyToNameUnit(6),
              7: labKeyToNameUnit(7),
              8: labKeyToNameUnit(8),
              9: labKeyToNameUnit(9),
              10: labKeyToNameUnit(10),
              11: labKeyToNameUnit(11),
              12: labKeyToNameUnit(12),
              13: labKeyToNameUnit(13),
              14: labKeyToNameUnit(14),
              15: labKeyToNameUnit(15),
              16: labKeyToNameUnit(16),
              17: labKeyToNameUnit(17),
              18: labKeyToNameUnit(18),
              19: labKeyToNameUnit(19),
              20: labKeyToNameUnit(20),
              21: labKeyToNameUnit(21),
              22: labKeyToNameUnit(22),
              23: labKeyToNameUnit(23),
            },
          },
          //todo: type: 'numeric' without layout problems
          { title: "Wert", field: "value" },
          //todo: unit is dependent on the layKey -> should be updated accordingly
          // { title: "Einheit", field: "unit", editable: "never" },
        ],
        data: [
          {
            labKey: 1,
            value: "9",
            unit: "test",
          },
        ],
      },
      contactMessage: "",
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
  updateComp = () => {
    this.TableFetch("bloodValueTable", true);
  };

  bloodEvaluation = () => {
    var returnText = "";
    this.state.bloodValueTable.data.forEach((element) => {
      var value = element.value;
      var labKey = element.labKey;
      var minValue = limits[labKey][0];
      var maxValue = limits[labKey][1];
      if (value < minValue) {
        returnText +=
          "Der Wert für " + labKeyToNameMapping[labKey] + " ist vermindert. ";
      } else if (value > maxValue) {
        returnText +=
          "Der Wert für " + labKeyToNameMapping[labKey] + " ist erhöht. ";
      } else {
        // Nothing
      }
    });
    if (returnText == "")
      returnText +=
        "Alle Werte sind in Ordnung. Es liegen keine zugrundeliegende Erkrankungen vor. ";

    return returnText;
  };

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  submitContactForm = () => {
    if (!this.checkLoginAndDisplay()) {
      return;
    }

    var requestData = {
      message: this.state.contactMessage,
      files: this.state.uploadFiles,
    };

    writeRequest(requestData, "question").then(() => {
      this.setState({
        contactMessage: "",
      });
      this.setState({
        uploadFiles: [],
      });
      this.displayPopUp("Anfrage erfolgreich versendet");
    });
  };

  uploadImageAction = (event, param = false) => {
    event.preventDefault();
    if (!this.checkLoginAndDisplay()) {
      return;
    }

    // Create new medRecord here and overwrite all (also list of files)
    var files = this.state.uploadFiles;

    Array.from(event.target.files).forEach(async (fileToUpload) => {
      var filesize = (fileToUpload.size / 1024 / 1024).toFixed(4); // MB

      if (filesize > 20) {
        this.displayPopUp("Datei zu groß", "danger");
        return;
      }

      var isImage = fileToUpload.type.includes("image");
      //todo: cleaner error catching
      await uploadFile(fileToUpload).then((fileLink) => {
        files.push({
          link: fileLink,
          isImage: isImage,
          name: fileToUpload.name,
        });
      });

      this.setState({ uploadFiles: files });
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
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Blutwert Analyse</h4>
                <p className={classes.cardCategoryWhite}>
                  Gehe deinen Blutwerten auf den Grund
                </p>
              </CardHeader>
              <CardBody>
                <PlainTable tableOptions={this.state.bloodValueTable} />
                <br />
                <Typography variant="h4">Auswertung</Typography>
                <br />
                <Typography variant="body1">
                  {this.bloodEvaluation()}
                </Typography>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Frag den Arzt</h4>

                <p className={classes.cardCategoryWhite}>
                  Deine Daten werden anonym übermittelt und vertraulich
                  behandelt.
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
                      defaultValue="Default Value"
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

SmartDoc.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SmartDoc);
