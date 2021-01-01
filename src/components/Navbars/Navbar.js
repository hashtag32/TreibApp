import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

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

  render() {
    const { classes } = this.props;

    return (
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.container}>
          <div className={classes.flex}>
            {/* Here we create navbar brand, based on route name */}
            <Button color="transparent" href="#" className={classes.title}>
              {this.makeBrand()}
            </Button>
          </div>
            {this.props.rtlActive ? (
              <RTLNavbarLinks />
            ) : (
              <AdminNavbarLinks/>
            )}
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
