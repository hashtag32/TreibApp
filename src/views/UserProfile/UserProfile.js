import { checkUser, getUserEmail } from "components/Internal/Checks.js";
import { getUser, getUserID } from "components/Internal/Checks.js";
import {
  loginRedux,
  logoutRedux,
  setAccessToken,
} from "components/Internal/Redux.js";
import { loginUser, logoutUser } from "components/Internal/LoginFunctions.js";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import CommonComps from "components/Internal/CommonComps.js";
import {
  CommonCompsData,
  DefaultUserProfile,
} from "components/Internal/DefaultData.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import EditableSwitch from "components/EditableTableReport/EditableSwitch";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import GridContainer from "components/Grid/GridContainer.js";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import Switch from "@material-ui/core/Switch";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import Typography from "@material-ui/core/Typography";
import VisuComp from "components/Internal/VisuComp.js";
import avatar from "assets/img/faces/profile_white.png";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { grey, red } from "@material-ui/core/colors";

import {
  writeRequest,
  readGlobalDoc,
  writeGlobalDoc,
} from "components/Internal/DBFunctions";
import {
  isAdmin,
  isSupervisor,
  getUserInfo,
} from "components/Internal/LayoutFunctions";

const styles = (theme) => ({
  logoutButton: {
    backgroundColor: red[500],
  },
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  cardAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
});

class UserProfile extends VisuComp {
  constructor(props) {
    super(props);
    this.state = {
      dbNameUserProfile: "UserProfile",
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
      UserProfile: {
        ...DefaultUserProfile,
      },
      UserInfo: "Patient",
      UserSwitches: {
        legal: {
          checked: false,
        },
        DSGVO: {
          checked: false,
        },
        acceptConditions: {
          checked: false,
        },
      },
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
  updateComp = async () => {
    this.TableFetch(this.state.dbNameUserProfile);

    this.preloadInfo();
  };

  preloadInfo = async () => {
    this.setState({
      UserProfile: { ...this.state.UserProfile, email: getUserEmail() },
    });

    var userInfo = await getUserInfo();

    this.setState({ UserInfo: userInfo });
  };

  // Nice function: Sets states automatically
  profileChange = (property, event) => {
    var changedValue = event.target.value;
    this.setState(
      {
        UserProfile: { ...this.state.UserProfile, [property]: changedValue },
      },
      () => {
        writeDBData(this.state.dbNameUserProfile, this.state.UserProfile);
      }
    );
  };

  handleLoginProfile = () => {
    console.log("login process");
    loginUser()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var accessToken = result.credential.accessToken;
        var user = result.user;
        console.log("User successfully logged in ");
        this.props.loginRedux({ user_id: user.uid });

        //todo: readglobaldoc
        readGlobalDoc("UserInfo").then(async (doc_data) => {
          if (doc_data != null) {
            if (!(user.uid in doc_data)) {
              var data = { ...doc_data, [user.uid]: "patient" };
              writeGlobalDoc("UserInfo", data);
            }
          }
        });


        // Get the token from the window because index is not avaiable here
        var deviceToken = window.localStorage.getItem("sentToServer");

        if (deviceToken != "false" && deviceToken != null) {
          // First read the data and then append list
          //todo: common function
          readDBData("UserData").then((doc_data) => {
            var deviceTokenList = [];
            if (doc_data != null) {
              deviceTokenList = doc_data.deviceTokenList;
            }
            if (!deviceTokenList.includes(deviceToken)) {
              deviceTokenList.push(deviceToken);
            }

            console.log("accessToken", accessToken);
            console.log("deviceToken", deviceToken);

            var userData = {
              deviceTokenList: deviceTokenList,
              accessToken: accessToken,
            };

            writeDBData("UserData", userData);
          });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("error: " + errorCode + ":" + errorMessage);
        // ...
      });
  };

  handleLogoutProfile = () => {
    logoutUser()
      .then(() => {
        window.user = null;
        console.log("User successfully logged out");
        // todo: PopUp
        // Sign-out successful.
        this.props.logoutRedux();
        this.displayPopUp("Logout");
      })
      .catch((error) => {
        console.log("error while logging out");
        // An error happened.
      });
  };

  handleSwitchChange = async (property, event) => {
    var checked = event.target.checked;

    this.setState({
      UserSwitches: {
        ...this.state.UserSwitches,
        [property]: {
          ...this.state.property,
          checked: checked,
        },
      },
    });
  };

  submitSupervisorRequest = () => {
    var message = "Ich bin ein Arzt";
    writeRequest(message, "WannaBeSupervisor").then(() => {
      this.displayPopUp("Anfrage erfolgreich versendet");
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Profil</h4>
                <p className={classes.cardCategoryWhite}></p>
              </CardHeader>
              {this.props.loginState == null ? (
                <CardBody>
                  <FormControl>
                    <FormLabel component="h2"></FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.UserSwitches.legal.checked}
                            onChange={(ev) =>
                              this.handleSwitchChange("legal", ev)
                            }
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        }
                        label={
                          <Typography variant="body1">
                            Ich habe die{" "}
                            <a target="_blank" href="https://spexdoc.net/agb">
                              Nutzungsbedingungen
                            </a>{" "}
                            gelesen und akzeptiere sie.
                          </Typography>
                        }
                      />
                      <br />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={this.state.UserSwitches.DSGVO.checked}
                            onChange={(ev) =>
                              this.handleSwitchChange("DSGVO", ev)
                            }
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        }
                        label={
                          <Typography variant="body1">
                            Ich habe die{" "}
                            <a
                              target="_blank"
                              href="https://spexdoc.net/datenschutzerklarung"
                            >
                              Datenschutzerklärung
                            </a>{" "}
                            gelesen.
                          </Typography>
                        }
                      />
                      <br />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              this.state.UserSwitches.acceptConditions.checked
                            }
                            onChange={(ev) =>
                              this.handleSwitchChange("acceptConditions", ev)
                            }
                            inputProps={{ "aria-label": "secondary checkbox" }}
                          />
                        }
                        label={
                          <Typography variant="body1">
                            Ich bin damit einverstanden, dass SpexDoc die von
                            mir zur Verfügung gestellten persönlichen
                            Gesundheitsdaten verarbeitet, um ein Konto zu
                            erstellen.
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </FormControl>
                  <br />

                  <div className={classes.centerChild}>
                    <Button
                      disabled={
                        !(
                          this.state.UserSwitches.legal.checked &&
                          this.state.UserSwitches.acceptConditions.checked &&
                          this.state.UserSwitches.DSGVO.checked
                        )
                      }
                      onClick={this.handleLoginProfile}
                      color="primary"
                    >
                      Login
                    </Button>
                  </div>
                </CardBody>
              ) : (
                <div>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Email"
                          id="email"
                          inputProps={{
                            value: this.state.UserProfile.email,
                            onChange: (e) => this.profileChange("email", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Vorname"
                          id="firstName"
                          inputProps={{
                            value: this.state.UserProfile.firstName,
                            onChange: (e) => this.profileChange("firstName", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Nachname"
                          id="lastName"
                          inputProps={{
                            value: this.state.UserProfile.lastName,
                            onChange: (e) => this.profileChange("lastName", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Postleitzahl"
                          id="plz"
                          inputProps={{
                            value: this.state.UserProfile.plz,
                            onChange: (e) => this.profileChange("plz", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Wohnort"
                          id="city"
                          inputProps={{
                            value: this.state.UserProfile.city,
                            onChange: (e) => this.profileChange("city", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Straße"
                          id="street"
                          inputProps={{
                            value: this.state.UserProfile.street,
                            onChange: (e) => this.profileChange("street", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Geburtstag"
                          id="birthDate"
                          inputProps={{
                            value: this.state.UserProfile.birthDate,
                            onChange: (e) => this.profileChange("birthDate", e),
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Krankenkasse"
                          id="insurance"
                          inputProps={{
                            value: this.state.UserProfile.insurance,
                            onChange: (e) => this.profileChange("insurance", e),
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
                          labelText="Über mich"
                          id="aboutMe"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            value: this.state.UserProfile.aboutMe,
                            onChange: (e) => this.profileChange("aboutMe", e),
                            multiline: true,
                            rows: 5,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Link className={classes.Home} to="/dashboard">
                      <Button color="primary">Ok</Button>
                    </Link>
                  </CardFooter>
                </div>
              )}
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            {this.props.loginState != null && (
              <React.Fragment>
                <Card profile>
                  <CardAvatar profile>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img src={avatar} alt="..." />
                    </a>
                  </CardAvatar>
                  <CardBody profile>
                    <h6 className={classes.cardCategory}>
                      {this.state.UserInfo}
                    </h6>
                    {this.state.UserInfo == "Patient" && (
                      <Button
                        color="primary"
                        onClick={this.submitSupervisorRequest}
                      >
                        <SyncAltIcon />
                        Ich bin Arzt
                      </Button>
                    )}
                    <h4 className={classes.cardTitle}>
                      {this.state.UserProfile.firstName}{" "}
                      {this.state.UserProfile.lastName}
                    </h4>
                    <h4 className={classes.cardTitle}>
                      {this.state.UserProfile.city}
                    </h4>
                    <p className={classes.description}>
                      {this.state.UserProfile.aboutMe}
                    </p>
                    {/* <Button color="primary" onClick={this.shareProfile} round>
                  Share
                </Button> */}
                  </CardBody>
                </Card>

                <div className={classes.centerChild}>
                  <Button
                    color="primary"
                    className={classes.logoutButton}
                    onClick={this.handleLogoutProfile}
                  >
                    Logout
                  </Button>
                </div>
              </React.Fragment>
            )}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  loginState: state.loginState,
  access_token: state.access_token,
});

const mapDispatchToProps = {
  loginRedux,
  logoutRedux,
};

const UserProfileWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);

export default withStyles(styles)(UserProfileWithRedux);
