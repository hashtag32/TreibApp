import React from "react";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { loginUser, logoutUser } from "components/Internal/LoginFunctions.js";
import { checkUser, getUserID } from "components/Internal/Checks.js";
import { connect } from "react-redux";
import { loginRedux, logoutRedux } from "components/Internal/Redux.js";
import PopUp from "components/PopUp/PopUp.js";
import VisuComp from "components/Internal/VisuComp.js";

import { openLoginAlert } from "components/Internal/VisuElements.js";
import LoginAlert from "components/LoginAlert/LoginAlert";
import CookieConsent, { Cookies } from "react-cookie-consent";
import Hidden from "@material-ui/core/Hidden";

import { auth } from "components/Internal/Firebase";

const styles = () => ({
  // This group of buttons will be aligned to the right
  rightToolbar: {
    position: "relative",
    minHeight: 100,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  fab: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
});

// How to integrate:
// 1) Add CommonComps to render of parent
// 2) Add commonProps: {LoginAlertProps: {openLoginRequired: false,FuncParams: "test",} to parent state
// 3) Check if Redux is required

// Component that extends each view component. Aka common component
// Should also be includable in each component (subcomponent like EditabletableReport)
class CommonComps extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      // List of additional rendered components (several concurrently)
      additionalComp: [],
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((userAuth) => {
      if (getUserID() != null) {
        this.props.loginRedux({ user_id: getUserID() });
      } else {
        this.props.logoutRedux();
      }
      this.props.commonProps.updateComp();
    });
  }

  // Listens to own and assigned parent state
  componentDidUpdate(prevProps) {
    // // Call function in parent
    this.props.commonProps.updateComp();
  }

  render() {
    return (
      <React.Fragment>
        <Hidden smDown implementation="css">
          <CookieConsent
            buttonStyle={{ backgroundColor: "#9c27b0", color: "white" }}
            buttonText="Akzeptieren"
          >
            Wir tauschen Daten mit Drittanbietern aus, um unser Webangebot für
            Sie zu verbessern, und zu refinanzieren. Hierfür werden von uns und
            Dritten Technologien wie Cookies verwendet. Für bestimmte Dienste
            benötigen wir Ihre Einwilligung. Indem Sie „Akzeptieren“ klicken,
            stimmen Sie (jederzeit widerruflich) dieser Datenverarbeitung zu.
            Unter "Dein Profil" können Sie Ihre Einstellungen ändern oder die
            Datenverarbeitung ablehnen.
          </CookieConsent>
        </Hidden>
        <LoginAlert loginState={this.props.commonProps.LoginAlertProps} />
        <PopUp popUp={this.props.commonProps.PopUpProps} />
      </React.Fragment>
    );
  }
}

CommonComps.propTypes = {
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

const CommonCompsWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonComps);

export default withStyles(styles)(CommonCompsWithRedux);
