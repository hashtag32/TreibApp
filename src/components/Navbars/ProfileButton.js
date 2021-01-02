import { useState, useEffect } from "react";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import Avatar from "@material-ui/core/Avatar";
import { checkUser, getUserEmail } from "components/Internal/Checks.js";

import {
  loginRedux,
  logoutRedux,
  setAccessToken,
  removeAccessToken,
} from "components/Internal/Redux.js";
import {
  loginUser,
  loginUserWithFit,
  logoutUser,
} from "components/Internal/LoginFunctions.js";
import { useDispatch, useSelector } from "react-redux";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "components/CustomButtons/Button.js";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Person from "@material-ui/icons/Person";
import Popper from "@material-ui/core/Popper";
import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { withStyles } from "@material-ui/core/styles";
import { grey, red } from "@material-ui/core/colors";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import CommonComps from "components/Internal/CommonComps.js";
import VisuComp from "components/Internal/VisuComp";

const styles = (theme) => ({
  avatar: {
    backgroundColor: red[500],
    height: 30,
    width: 30,
  },
  avatarMobile: {
    height: 30,
    width: 30,
    backgroundColor: red[500],
  },
});

class ProfileButton extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      // List of additional rendered components (several concurrently)
      anchorEl: null,
      mobileMoreAnchorEl: null,
      isMenuOpen: null,
      isMobileMenuOpen: null,
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };
  }

  componentDidMount() {
    console.log(this.props);
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
    this.TableFetch("UserProfile").then((result) => {
      if (result == false) this.setState({ UserProfile: null });
    });
  };

  // Currently all functions are silent because component is only navlink


  testfunc = () => {
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Hidden mdUp>
          {/* Mobile Version */}
          {this.state.UserProfile != null ? (
            <Avatar aria-label="recipe" className={classes.avatarMobile}>
              {this.state.UserProfile.firstName.charAt(0)}
            </Avatar>
          ) : (
            <AccountCircle />
          )}
        </Hidden>

        <Hidden smDown implementation="css">
          {/* Desktop Version */}

          {this.state.UserProfile != null ? (
            <Avatar className={classes.avatar}>
              {this.state.UserProfile.firstName.charAt(0)}
            </Avatar>
          ) : (
            <Person  />
          )}
        </Hidden>
      </React.Fragment>
    );
  }
}

ProfileButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => ({
//   loginState: state.loginState,
//   access_token: state.access_token,
// });

// const mapDispatchToProps = {
//   loginRedux,
//   logoutRedux,
// };

// const ProfileButtonWithRedux = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ProfileButton);

export default withStyles(styles)(ProfileButton);
