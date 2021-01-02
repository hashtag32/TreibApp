import { loginRedux, logoutRedux } from "components/Internal/Redux.js";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import Badge from "@material-ui/core/Badge";
import Button from "components/CustomButtons/Button.js";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CommonComps from "components/Internal/CommonComps.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import VisuComp from "components/Internal/VisuComp.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Dashboard from "@material-ui/icons/Dashboard";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import NotificationData from "components/NotificationData/NotificationData.js";
import NotificationIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";

import Paper from "@material-ui/core/Paper";
import Person from "@material-ui/icons/Person";
import Popper from "@material-ui/core/Popper";
import ProfileButton from "components/Navbars/ProfileButton.js";
import PropTypes from "prop-types";
import React from "react";
import Search from "@material-ui/icons/Search";
import classNames from "classnames";
import { connect } from "react-redux";
import grey from "@material-ui/core/colors/grey";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import HomeIcon from "@material-ui/icons/Home";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { RiVipCrown2Fill } from "react-icons/ri";

const styles = (theme) => ({
  root: {
    margin: "20px",
    backgroundColor: "inherit",
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

class AdminNavbarLinks extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      openNotification: null,
      Notifications: [],
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };

    this.handleClickNotification = this.handleClickNotification.bind(this);
  }

  componentDidMount() {
    this.updateComp();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    }
    this.updateComp();
  }

  // Required from CommonProps
  updateComp = () => {
    this.TableFetch("Notifications", false, []);
  };

  handleClickNotification = (event) => {
    if (
      this.state.openNotification &&
      this.state.openNotification.contains(event.target)
    ) {
      this.setOpenNotification(null);
    } else {
      this.setOpenNotification(event.currentTarget);
    }
  };

  setOpenNotification = (value) => {
    this.setState({
      openNotification: value,
    });
  };

  handleCloseNotification = () => {
    this.setOpenNotification(null);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />
        <Hidden smDown implementation="css">
          <div>
            <BottomNavigation
              value={this.state.value}
              onChange={(event, newValue) => {
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
                    invisible={this.state.Notifications.length == 0}
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
          </div>
        </Hidden>
      </div>
    );
  }
}

AdminNavbarLinks.propTypes = {
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

const AdminNavbarLinksWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminNavbarLinks);

export default withStyles(styles)(AdminNavbarLinksWithRedux);
