import { checkUser, getUserEmail } from "components/Internal/Checks.js";
import {
  loginRedux,
  logoutRedux,
  removeAccessToken,
  setAccessToken,
} from "components/Internal/Redux.js";
import {
  loginUser,
  loginUserWithFit,
  logoutUser,
} from "components/Internal/LoginFunctions.js";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CommonComps from "components/Internal/CommonComps.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import NotificationData from "components/NotificationData/NotificationData.js";
import NotificationIcon from "@material-ui/icons/Notifications";
import ProfileButton from "components/Navbars/ProfileButton.js";
import PropTypes from "prop-types";
import React from "react";
import RestoreIcon from "@material-ui/icons/Restore";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { grayColor } from "assets/jss/material-dashboard-react.js";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import { RiVipCrown2Fill } from "react-icons/ri";

const styles = (theme) => ({
  root: {},
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: grayColor[10], //todo: maybe black?
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "fixed",
    width: "100%",
    color: grayColor[7],
    minHeight: "50px",
    display: "block",
  },
  grow: {
    flex: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  Home: {
    color: "inherit",
  },
  LinkNotification: {
    color: "inherit",
  },
  Profile: {
    color: "inherit",
  },
});

class BottomAppBarMobile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // List of additional rendered components (several concurrently)
      notificationList: [],
      value: "",
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.fetchTable();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.fetchTable();
    }
  }

  fetchTable = () => {
    readDBData("Notifications").then((doc_data) => {
      if (doc_data == null) {
        console.log(doc_data);
        this.setState({ notificationList: [] });
      } else {
        this.setState({ notificationList: doc_data });
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <BottomNavigation
            value={this.state.value}
            onChange={(event, newValue) => {
              //   setValue(newValue);
              this.setState({ value: newValue });
            }}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction
              component={Link}
              to="/dashboard"
              label="Dashboard"
              icon={<HomeIcon />}
            />

            <BottomNavigationAction
              component={Link}
              to="/premium"
              label="Premium"
              icon={<RiVipCrown2Fill style={{ width: 25, height: 25 }} />}
            />

            <BottomNavigationAction
              component={Link}
              to="/notifications"
              label="Nachrichten"
              icon={
                <Badge
                  variant="dot"
                  invisible={this.state.notificationList.length == 0}
                  color="secondary"
                >
                  <NotificationIcon />
                </Badge>
              }
            />

            <BottomNavigationAction
              component={Link}
              to="/user"
              label="Profil"
              icon={<ProfileButton />}
            />
          </BottomNavigation>
        </AppBar>
      </React.Fragment>
    );
  }
}

BottomAppBarMobile.propTypes = {
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

const BottomAppBarMobileWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomAppBarMobile);

export default withStyles(styles)(BottomAppBarMobileWithRedux);
