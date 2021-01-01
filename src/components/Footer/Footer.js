/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Hidden from "@material-ui/core/Hidden";

import { NavLink } from "react-router-dom";

// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

function footerContent(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <List className={classes.list}>
          {props.routes.map((prop, key) => {
            return (
              <NavLink
                to={prop.path}
                className={classes.inlineBlock}
                activeClassName="active"
                key={key}
                onClick={props.closeSidebar}
              >
                <ListItem button className={classes.block}>
                  {prop.name}
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </div>
      <p className={classes.right}>
        <span>
          &copy; {1900 + new Date().getYear()}{" "}
          <a href="https://spexdoc.net" target="_blank" className={classes.a}>
            SpexDoc
          </a>
        </span>
      </p>
    </div>
  );
}

export default function Footer(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Hidden mdUp>
        {/* Mobile version */}
        <footer className={classes.mobilefooter}>{footerContent(props)}</footer>
      </Hidden>

      <Hidden smDown implementation="css">
        {/* Desktop version */}
        <footer className={classes.footer}>{footerContent(props)}</footer>
      </Hidden>
    </React.Fragment>
  );
}
