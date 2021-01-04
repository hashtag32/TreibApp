import { auth, firebase, firestore } from "components/Internal/Firebase.js";
import { checkUser, getUserEmail } from "components/Internal/Checks.js";
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import Accessibility from "@material-ui/icons/Accessibility";
import Assignment from "@material-ui/icons/Assignment";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CommonComps from "components/Internal/CommonComps.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import DateRange from "@material-ui/icons/DateRange";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Icon from "@material-ui/core/Icon";
import LocalOffer from "@material-ui/icons/LocalOffer";
import React from "react";
import SmartDocIcon from "@material-ui/icons/TabletMac";
import Store from "@material-ui/icons/Store";
import Table from "components/Table/Table.js";

import LoginFirst from "views/LoginFirst/LoginFirst.js";

import TestComp from "components/VisuComps/TestComp.js";
import Typography from "@material-ui/core/Typography";
import Update from "@material-ui/icons/Update";
import VisuComp from "components/Internal/VisuComp.js";
import Weather from "views/Dashboard/Weather";
import {
  getStringDate,
  getCurrentDate,
} from "components/Internal/VisuElements.js";
import Warning from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { withStyles } from "@material-ui/core/styles";

import ReactWeather, { useOpenWeather } from "react-open-weather";

const useStyles = makeStyles(styles);
class Dashboard extends VisuComp {
  constructor(props) {
    super(props);

    console.log(props);
    this.state = {
      // List of additional rendered components (several concurrently)
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
      PM10: 0,
      PM25: 0,
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.updateComp();

    setInterval(this.updateComp, 120000); // runs every 2 minutes

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
    this.fetchData();
    // var fetchArray = [
    //   "UserProfile",
    //   "Vaccination",
    //   "EmergencyPredisposition",
    //   "EmergencyMedication",
    //   "EmergencyContacts",
    //   "OrganDonation",
    //   "Share",
    //   "MedRecords",
    //   "Appointments",
    // ];
    // fetchArray.forEach(async (fetchElement) => {
    //   this.fetchTable(fetchElement);
    // });
    // this.calculateProperties();
  };

  // Required from CommonProps
  calculateProperties = async () => {
    await this.timeout(750); // todo: remove hotfix, waiting for fetching data, no callback possible
    // EmergencyDataCount
    var emergencyCount = this.count([
      this.state.EmergencyPredisposition,
      this.state.EmergencyMedication,
      this.state.EmergencyContacts,
    ]);
    this.setState({
      emergencyDataCount: emergencyCount,
    });

    // Sharing
    var SharingActive = 0;
    if (this.state.Share != null) {
      if (this.state.Share.Emergency.active == true) SharingActive += 1;
      if (this.state.Share.MedRecords.active == true) SharingActive += 1;
      if (this.state.Share.Vaccination.active == true) SharingActive += 1;
    }
    this.setState({
      sharingDataCount: SharingActive,
    });
  };

  count = (arrayElements) => {
    var count = 0;
    arrayElements.forEach((arrayElement) => {
      if (arrayElement != null) {
        count += arrayElement.length;
      }
    });
    return count;
  };

  getAppointments = () => {
    var lastAppointmentsArray = [];

    if (this.state.Appointments == undefined) {
      return [["Blutabnahme", "12. Dez 2020", "Dr. Fischer"]];
    }

    // Last 5 Appointments
    var lastAppointments = this.state.Appointments.slice(
      Math.max(this.state.Appointments.length - 5, 1)
    );

    lastAppointments.forEach((appointment) => {
      var stringDate = getStringDate(new Date(appointment.startDate));
      lastAppointmentsArray.push([
        appointment.title,
        stringDate,
        appointment.location,
      ]);
    });

    return lastAppointmentsArray;
  };

  fetchData = () => {
    this.getJSON("Eppelborn");
  };

  getJSON = (location) => {
    var sensor_id;
    if (location == "Eppelborn") sensor_id = 34986;
    if (location == "Stuttgart") sensor_id = 39838;

    const link =
      "https://data.sensor.community/airrohr/v1/sensor/" + sensor_id + "/";
    console.log(link);
    fetch(link)
      .then((response) => response.json())
      .then((jsonData) => {
        var PM10 = jsonData[0]["sensordatavalues"][0]["value"];
        var PM25 = jsonData[0]["sensordatavalues"][1]["value"];

        this.setState({ PM25: PM25 });
        this.setState({ PM10: PM10 });
      })
      .catch((error) => {
        // handle your errors here
        console.error(error);
      });
  };

  testfunc = () => {
    this.getJSON();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Feinstaub</h4>
                <p className={classes.cardCategoryWhite}>Eppelborn</p>
              </CardHeader>
              <CardBody>
                <Typography variant="h5">
                  <br />
                  PM10: {this.state.PM10}
                  <br />
                  PM25: {this.state.PM25}
                  <br />
                </Typography>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Weather />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
