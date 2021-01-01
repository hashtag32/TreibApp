import { bugs, server, website } from "variables/general.js";
import { dailySalesChart, emailsSubscriptionChart } from "variables/charts.js";

import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import { checkUser, getUserEmail } from "components/Internal/Checks.js";
import {
  loginRedux,
  logoutRedux,
  setAccessToken,
} from "components/Internal/Redux.js";
import { loginUser, logoutUser } from "components/Internal/LoginFunctions.js";

import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Assignment from "@material-ui/icons/Assignment";
import BugReport from "@material-ui/icons/BugReport";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import ChartistGraph from "react-chartist";
import Cloud from "@material-ui/icons/Cloud";
import Code from "@material-ui/icons/Code";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import DateRange from "@material-ui/icons/DateRange";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Icon from "@material-ui/core/Icon";
import LocalOffer from "@material-ui/icons/LocalOffer";
import React from "react";
import Store from "@material-ui/icons/Store";
import Success from "components/Typography/Success.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import Update from "@material-ui/icons/Update";
import Warning from "@material-ui/icons/Warning";
import CommonComps from "components/Internal/CommonComps.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Button from "components/CustomButtons/Button.js";

import { connect } from "react-redux";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import {
  getDataPerWeek,
  loadHealthData,
  getAllHealthDataPerWeek,
} from "components/Internal/GoogleFitFunc.js";

import { getChart } from "components/Internal/GoogleFitCharts.js";
import VisuComp from "components/Internal/VisuComp.js";
var Chartist = require("chartist");

const useStyles = makeStyles(styles);

class GoogleFit extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      healthData: [],
      testArray: [],
      // Default data
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
      healthDataperWeek: {
        ["Steps"]: [10, 10, 10, 10, 10, 10, 10],
        ["Calories"]: [10, 10, 10, 10, 10, 10, 10],
        ["Heart"]: [10, 10, 10, 10, 10, 10, 10],
      },
      // Default data
    };
  }

  // Will trigger update from e.g. Emergency->linkAccess that will be triggered after componentdidmount
  componentDidUpdate(prevProps) {
    console.log("update");
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.updateComp();
    }
  }

  componentDidMount() {
    if (checkUser()) {
      this.updateComp();
    }
  }

  // Required from CommonProps
  updateComp = () => {
    this.fetchData();
  };

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    return readDBData(this.state.name).then((doc_data) => {
      if (doc_data == null) return;
      // Cannot get data -> set default data from parent class
      // this.setState({ data: this.props.tableOptions.data });
      else this.setState({ checked: doc_data });
    });
  };

  // Is called when table is changed
  uploadTable = async () => {
    return await writeDBData(this.state.name, this.state.checked);
  };

  fetchData = () => {
    // Load Google Fit data
    this.loadGoogleData();

    // Load User Firebase data (maybe)
  };

  loadGoogleData = async () => {
    if (this.props.access_token) {
      var access_token = this.props.access_token;
      // await this.timeout(3000); // todo: remove hotfix

      // read data through api
      loadHealthData(access_token).then(async (healthData_array) => {
        console.log(healthData_array);
        // await this.setState({ healthDataArray: healthData_array });
        await this.timeout(750); // todo: remove hotfix

        var HealthDataPerWeek = await getAllHealthDataPerWeek(healthData_array);
        await this.setState({ healthDataArray: healthData_array });
        await this.setState({ healthDataperWeek: HealthDataPerWeek });
      });
    }
  };

  enableGoogleFit = () => {
    if (!this.checkLoginAndDisplay()) {
      return;
    }

    loginUser(true)
      .then((result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        this.props.loginRedux({ user_id: user.uid });
        this.props.setAccessToken(token);
        this.displayPopUp("Google Fit enabled");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log("error: " + errorCode + ":" + errorMessage);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.access_token == null ? (
          <Button color="primary" onClick={this.enableGoogleFit}>
            Google Fit aktivieren
          </Button>
        ) : null}

        <CommonComps commonProps={this.state.commonProps} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={getChart(this.state.healthDataperWeek["Calories"]).data}
                  type="Line"
                  options={
                    getChart(this.state.healthDataperWeek["Calories"]).options
                  }
                  listener={
                    getChart(this.state.healthDataperWeek["Calories"]).animation
                  }
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Verbrannte Kalorien</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  Steigerung in dieser Woche.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Verlauf innerhalb 1 Woche
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={getChart(this.state.healthDataperWeek["Steps"]).data}
                  type="Line"
                  options={
                    getChart(this.state.healthDataperWeek["Steps"]).options
                  }
                  listener={
                    getChart(this.state.healthDataperWeek["Steps"]).animation
                  }
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Schritte</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  Mehr als andere Teilnehmer in deinem Alter.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Verlauf innerhalb 1 Woche
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={getChart(this.state.healthDataperWeek["Heart"]).data}
                  type="Line"
                  options={
                    getChart(this.state.healthDataperWeek["Heart"]).options
                  }
                  listener={
                    getChart(this.state.healthDataperWeek["Heart"]).animation
                  }
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Herz Aktivität</h4>
                <p className={classes.cardCategory}>
                  Abhängig von der Bewegung
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Verlauf innerhalb 1 Woche
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.loginState,
  access_token: state.access_token,
});

const mapDispatchToProps = {
  loginRedux,
  logoutRedux,
  setAccessToken,
};

const GoogleFitWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleFit);

export default withStyles(styles)(GoogleFitWithRedux);
