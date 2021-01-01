import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import Hidden from "@material-ui/core/Hidden";

import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";

import CssBaseline from "@material-ui/core/CssBaseline";

import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "components/CustomButtons/Button.js";

import { withStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";


function HideOnScroll(props) {
  // NOT working: https://material-ui.com/components/app-bar/
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  makeBrand = () => {
    var name;
    this.props.routes.map((prop) => {
      if (window.location.href.indexOf(prop.path) !== -1) {
        name = this.props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name;
  };
  auth = true;

  handleChange = (event) => {
    // setAuth(event.target.checked);
  };

  handleMenu = (event) => {
    // setAnchorEl(event.currentTarget);
  };

  handleClose = () => {
    // setAnchorEl(null);
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar color="white" >
        <Toolbar color="transparent"  >
          <div className={classes.flex}>
            {/* Here we create navbar brand, based on route name */}
            <Button color="transparent" href="/" className={classes.title}>
            <Typography variant="h5" color="primary">
              SpexDoc
              </Typography>
            </Button>
          </div>
          <Hidden smDown implementation="css">
            {this.props.rtlActive ? (
              <RTLNavbarLinks />
            ) : (
              <div></div>
            )}
          </Hidden>

          <Hidden mdUp implementation="css">
            {/* Button for opening the menu (only in mobile mode) */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles)(Navbar);
