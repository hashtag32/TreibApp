import "perfect-scrollbar/css/perfect-scrollbar.css";

import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BottomAppBarMobile from "components/Navbars/BottomAppBarMobile.js";
import Button from "@material-ui/core/Button";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Footer from "components/Footer/Footer.js";
import Hidden from "@material-ui/core/Hidden";
import LoginFirst from "views/LoginFirst/LoginFirst.js";
import Navbar from "components/Navbars/Navbar.js";
import NavbarMobile from "components/Navbars/NavbarMobile.js";
import PerfectScrollbar from "perfect-scrollbar";
import React from "react";
import Sidebar from "components/Sidebar/Sidebar.js";
import bgImage from "assets/img/doctor_stock_1.jpg";
import { checkUser } from "components/Internal/Checks.js";
import logo from "assets/img/SpexDoc_logo_png.png";
import { makeStyles } from "@material-ui/core/styles";
import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import { publicKeyProvided } from "components/Internal/Extraction";

// creates a beautiful scrollbar

// @material-ui/core components

// core components

let ps;

const filteredRoutes = (filter) => {
  const routesList = [];
  routes.map((prop, key) => {
    if (prop.layout == filter) {
    routesList.push(prop);
    }
  });
  console.log(routesList);
  return routesList;
};

// const switchRoutes = (
//   <Switch>
//     {routes.map((prop, key) => {
//       if (prop.layout === "/admin") {

//       return <Route path={prop.path} component={prop.component} key={key} />;
//       }
//     })}
//     <Redirect from="/" to="/dashboard" />
//   </Switch>
// );

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  // If mobile open the sidebar
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loginClicked, setLoginClicked] = React.useState(false);
  // Needed because will trigger update
  const loginStateRedux = useSelector((state) => state.loginState);
  const dispatch = useDispatch();

  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const closeSidebar = () => {
    setMobileOpen(false);
  };
  const getRoute = () => {
    return window.location.pathname !== "/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"SpexDoc"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        closeSidebar={closeSidebar}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        {/* Navbar contains only Search, Dropdown, etc. */}
        {checkUser() || loginClicked || publicKeyProvided() ? (
          <div>
            <Hidden mdUp implementation="css">
              {/* Mobile Version */}
              <NavbarMobile
                routes={routes
                }
                handleDrawerToggle={handleDrawerToggle}
                //  Not used yet
                closeSidebar={closeSidebar}
                {...rest}
              />
              <BottomAppBarMobile />
            </Hidden>
            <Hidden smDown implementation="css">
              <Navbar
                routes={routes}
                handleDrawerToggle={handleDrawerToggle}
                //  Not used yet
                closeSidebar={closeSidebar}
                {...rest}
              />
            </Hidden>

            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
              <div className={classes.content}>
                <div className={classes.container}>
                  <Switch>
                    {routes.map((prop, key) => {
                      return (
                        <Route
                          path={prop.path}
                          key={key}
                          render={(props) => (
                            <prop.component
                              {...props}
                              loginClicked={loginClicked}
                              setLoginClicked={setLoginClicked}
                            />
                          )}
                        />
                      );
                    })}
                    <Redirect from="/" to="/dashboard" />
                  </Switch>
                </div>
              </div>
              <Footer routes={filteredRoutes("/footer")}/>
          </div>
        ) : (
          <LoginFirst setLoginClicked={setLoginClicked} />
        )}
      </div>
    </div>
  );
}
