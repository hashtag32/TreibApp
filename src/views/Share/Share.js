import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CommonComps from "components/Internal/CommonComps.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PropTypes from "prop-types";
import QRCodeCard from "components/VisuComps/QRCodeCard.js";
import React from "react";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import { getShortLink } from "components/Internal/Checks";
import { getUserID } from "components/Internal/Checks";
import { withStyles } from "@material-ui/core/styles";
import VisuComp from "components/Internal/VisuComp";

import WarningIcon from "@material-ui/icons/Warning";

const styles = {
  centerChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

const defaultData = {
  Emergency: {
    active: false,
    shortLink: "",
  },
  MedRecords: {
    active: false,
    shortLink: "",
  },
  Vaccination: {
    active: false,
    shortLink: "",
  },
};

// Display Login Screen here -> Login from Profile NavBar should also point here
class Share extends VisuComp {
  constructor(props) {
    super(props);
    this.state = {
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
      data: defaultData,
    };
  }

  // For redux and others
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.updateComp();
    }
  }

  componentDidMount() {
    this.updateComp();
  }

  // Required from CommonProps
  updateComp = async () => {
    this.TableFetch("Share", true, defaultData);
  };

  handleSwitchChange = async (property, event) => {
    if (!this.checkLoginAndDisplay()) {
      return;
    }

    var checked = event.target.checked;

    var shortLink = await getShortLink(property);

    this.setState({
      data: {
        ...this.state.data,
        [property]: {
          shortLink: shortLink,
          active: checked,
        },
      },
    });

    this.TableChanged("Share", this.state.data);
  };

  render() {
    const { classes } = this.props;

    return (
      <Card>
        <CommonComps commonProps={this.state.commonProps} />
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Freigaben</h4>
          <p className={classes.cardCategoryWhite}>
            Verwalte und teile deine Freigaben
          </p>
        </CardHeader>
        <CardBody>
          Jeder kann in eine Notsituation kommen. Zeigen Sie ihm einfach den
          folgenden QR Code und der Notfallsanitärer bekommt Zugriff auf Ihre
          Notfalldaten. Drucken Sie am besten den Code aus.
          <GridContainer>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>Notfalldaten</h4>
                </CardHeader>
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Switch
                      checked={this.state.data.Emergency.active}
                      onChange={(ev) =>
                        this.handleSwitchChange("Emergency", ev)
                      }
                      color="primary"
                      name="Emergency_switch"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  {/* todo: Layout without br and maybe one component */}
                  {this.state.data.Emergency.active ? (
                    <QRCodeCard link={this.state.data.Emergency.shortLink} />
                  ) : null}
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>Befunde</h4>
                </CardHeader>
                <CardBody>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Switch
                      checked={this.state.data.MedRecords.active}
                      onChange={(ev) =>
                        this.handleSwitchChange("MedRecords", ev)
                      }
                      color="primary"
                      name="MedRecords_switch"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  {this.state.data.MedRecords.active ? (
                    <div>
                      <QRCodeCard link={this.state.data.MedRecords.shortLink} />
                    </div>
                  ) : null}
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>Impfpass</h4>
                </CardHeader>
                <CardBody>
                  <div className={classes.centerChild}>
                    <Switch
                      checked={this.state.data.Vaccination.active}
                      onChange={(ev) =>
                        this.handleSwitchChange("Vaccination", ev)
                      }
                      color="primary"
                      name="Vaccination_switch"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  {/* todo: Layout without br and maybe one component */}
                  {this.state.data.Vaccination.active ? (
                    <QRCodeCard link={this.state.data.Vaccination.shortLink} />
                  ) : null}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    );
  }
}

Share.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Required for each component that relies on the loginState
const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const ShareWithRedux = connect(mapStateToProps)(Share);

export default withStyles(styles)(ShareWithRedux);
