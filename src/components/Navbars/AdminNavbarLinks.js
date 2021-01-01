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
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { withStyles } from "@material-ui/core/styles";

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
            {/* <div className={classes.searchWrapper}>
            <CustomInput
              formControlProps={{
                className: classes.margin + " " + classes.search,
              }}
              inputProps={{
                placeholder: "Search",
                inputProps: {
                  "aria-label": "Search",
                },
              }}
            />
            <Button color="white" aria-label="edit" justIcon round>
              <Search />
            </Button>
          </div> */}
            <div className={classes.manager}>
              <Link className={classes.LinkNotification} to="/premium">
                <IconButton color="inherit">Premium</IconButton>
              </Link>
            </div>

            <div className={classes.manager}>
              <Link className={classes.LinkNotification} to="/dashboard">
                <IconButton color="inherit">
                  <Dashboard fontSize="large" />
                </IconButton>
              </Link>
            </div>

            <div className={classes.manager}>
              <Link className={classes.LinkNotification} to="/notifications">
                <IconButton color="inherit">
                  <Badge
                    badgeContent={this.state.Notifications.length}
                    color="secondary"
                  >
                    <NotificationIcon fontSize="large" />
                  </Badge>
                </IconButton>
              </Link>
            </div>

            <Popper
              open={Boolean(this.state.openNotification)}
              anchorEl={this.state.openNotification}
              transition
              disablePortal
              className={
                classNames({
                  [classes.popperClose]: !this.state.openNotification,
                }) +
                " " +
                classes.popperNav
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="notification-menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener
                      onClickAway={this.handleCloseNotification}
                    >
                      <Link
                        style={{ textDecoration: "none" }}
                        to="/notifications"
                      >
                        <MenuList role="menu">
                          {this.state.Notifications.map((notificationItem) => (
                            <Link
                              style={{ textDecoration: "none" }}
                              to="/notifications"
                            >
                              <MenuItem
                                //todo add link
                                className={classes.dropdownItem}
                              >
                                {notificationItem}
                              </MenuItem>
                            </Link>
                          ))}
                        </MenuList>
                      </Link>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            <div className={classes.manager}>
              <Link className={classes.LinkNotification} to="/user">
                <IconButton color="inherit">
                  <ProfileButton />
                </IconButton>
              </Link>
            </div>
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
