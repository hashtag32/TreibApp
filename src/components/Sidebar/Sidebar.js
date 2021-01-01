/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";
import { isAdmin } from "components/Internal/LayoutFunctions.js";
import { withStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

// verifies if routeName is the one active (in browser input)
function activeRoute(routeName) {
  return window.location.href.indexOf(routeName) > -1 ? true : false;
}
class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdminValue: false,
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
    var isAdminValue = await isAdmin();

    this.setState({ isAdminValue: isAdminValue });
  };

  render() {
    const { classes, color, logo, image, logoText, routes } = this.props;

    var links = (
      <List className={classes.list}>
        {routes.map((prop, key) => {
          if (prop.layout === "/sidebar" || (prop.layout === "/supervisor" && this.state.isAdminValue)) {
            console.log(prop.path);
            console.log(prop.layout);
            console.log(prop.layout === "/sidebar");
            console.log(this.state.isAdminValue);
            var activePro = " ";
            var listItemClasses;
            if (prop.path === "/upgrade-to-pro") {
              activePro = classes.activePro + " ";
              listItemClasses = classNames({
                [" " + classes[color]]: true,
              });
            } else {
              listItemClasses = classNames({
                [" " + classes[color]]: activeRoute(prop.path),
              });
            }
            const whiteFontClasses = classNames({
              [" " + classes.whiteFont]: activeRoute(prop.path),
            });
            return (
              <NavLink
                to={prop.path}
                className={activePro + classes.item}
                activeClassName="active"
                key={key}
                onClick={this.props.closeSidebar}
              >
                <ListItem button className={classes.itemLink + listItemClasses}>
                  {typeof prop.icon === "string" ? (
                    <Icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses,
                        {
                          [classes.itemIconRTL]: this.props.rtlActive,
                        }
                      )}
                    >
                      {prop.icon}
                    </Icon>
                  ) : (
                    <prop.icon
                      className={classNames(
                        classes.itemIcon,
                        whiteFontClasses,
                        {
                          [classes.itemIconRTL]: this.props.rtlActive,
                        }
                      )}
                    />
                  )}
                  <ListItemText
                    primary={this.props.rtlActive ? prop.rtlName : prop.name}
                    className={classNames(classes.itemText, whiteFontClasses, {
                      [classes.itemTextRTL]: this.props.rtlActive,
                    })}
                    disableTypography={true}
                  />
                </ListItem>
              </NavLink>
            );
          }
        })}
      </List>
    );
    var brand = (
      <div className={classes.logo}>
        <a
          href="https://spexdoc.net"
          className={classNames(classes.logoLink, {
            [classes.logoLinkRTL]: this.props.rtlActive,
          })}
          target="_blank"
        >
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </a>
      </div>
    );

    return (
      <div>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={this.props.rtlActive ? "left" : "right"}
            open={this.props.open}
            classes={{
              paper: classNames(classes.drawerPaper, {
                [classes.drawerPaperRTL]: this.props.rtlActive,
              }),
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>
              {this.props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
              {links}
            </div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            anchor={this.props.rtlActive ? "right" : "left"}
            variant="permanent"
            open
            classes={{
              paper: classNames(classes.drawerPaper, {
                [classes.drawerPaperRTL]: this.props.rtlActive,
              }),
            }}
          >
            {brand}
            <div className={classes.sidebarWrapper}>{links}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};

export default withStyles(styles)(Sidebar);
