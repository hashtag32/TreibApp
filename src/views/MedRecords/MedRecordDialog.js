import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from "components/VisuComps/Dialog.js";
import {
  readDBData,
  uploadFile,
  writeDBData,
} from "components/Internal/DBFunctions.js";

import AddIcon from "@material-ui/icons/Add";
import AutoCompletionForm from "components/VisuComps/AutoCompletionForm.js";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardBody from "components/Card/CardBody.js";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "components/Card/CardHeader.js";
import CardMedia from "@material-ui/core/CardMedia";
import CustomButton from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { DefaultCategories } from "components/Internal/DefaultData.js";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";
import Dialog from "@material-ui/core/Dialog";
import GetAppIcon from "@material-ui/icons/GetApp";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import React from "react";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import UploadImage from "components/VisuComps/UploadImage.js";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {openWindow} from "components/Internal/VisuElements"

// import Card from "@material-ui/core/Card";

const styles = {
  dialogCard: {
    marginTop: 30,
    marginBottom: 30,
    display: "flex",
    position: "relative",
    flexDirection: "column",
  },
  cardHeader: {
    padding: 15,
    marginTop: -20,
  },
  mediaroot: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },

  dialogtitle: {
    margin: 25,
    // padding: theme.spacing(2),
  },
  downloadButton: {
    position: "relative",
    left: "50%",
    height: 150,
    width: 150,
    color: "grey",
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
    // marginRight: theme.spacing(2),
  },
  gridItem: {
    margin: 15,
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
};

class MedRecordDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        onClose={(e) => this.props.handleClose(this.props.medRecord, e)}
        aria-labelledby="customized-dialog-title"
        open={this.props.medRecord.open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={(e) => this.props.handleClose(this.props.medRecord, e)}
        >
          Befund
        </DialogTitle>
        <DialogContent dividers>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Befunddaten</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Datum"
                        id="date"
                        inputProps={{
                          value: this.props.medRecord.date,
                          onChange: (e) =>
                            this.props.tableChanges(
                              this.props.medRecord,
                              "date",
                              e
                            ),
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
                          value: this.props.medRecord.doctor,
                          onChange: (e) =>
                            this.props.tableChanges(
                              this.props.medRecord,
                              "doctor",
                              e
                            ),
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
                          value: this.props.medRecord.disease,
                          onChange: (e) =>
                            this.props.tableChanges(
                              this.props.medRecord,
                              "disease",
                              e
                            ),
                        }}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <AutoCompletionForm
                        addValueToOptionList={this.props.addValueToOptionList}
                        medRecord={this.props.medRecord}
                        value={this.props.medRecord.category}
                        changeMedRecord={this.props.changeMedRecord}
                        optionList={this.props.CategoryList}
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
                          value: this.props.medRecord.symptoms,
                          onChange: (e) =>
                            this.props.tableChanges(
                              this.props.medRecord,
                              "symptoms",
                              e
                            ),
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
                          value: this.props.medRecord.diagnosis,
                          onChange: (e) =>
                            this.props.tableChanges(
                              this.props.medRecord,
                              "diagnosis",
                              e
                            ),
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
                          value: this.props.medRecord.moreInfo,
                          onChange: (e) =>
                            this.props.tableChanges(
                              this.props.medRecord,
                              "moreInfo",
                              e
                            ),
                          multiline: true,
                          rows: 5,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
              {/* todo: Add QR Code to share */}
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Anhänge</h4>
                  <p className={classes.cardCategoryWhite}>
                    Alle Befunde digital
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    {this.props.medRecord.files.map((file) => (
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
                  <UploadImage uploadImageAction={this.props.uploadImageAction} param={this.props.medRecord} />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <CustomButton
            autoFocus
            onClick={(e) => this.props.handleClose(this.props.medRecord, e)}
            color="primary"
          >
            Schließen
          </CustomButton>
        </DialogActions>
      </Dialog>
    );
  }
}

MedRecordDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Required for each component that relies on the loginState
const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const MedRecordDialogWithRedux = connect(mapStateToProps)(MedRecordDialog);

export default withStyles(styles)(MedRecordDialogWithRedux);
