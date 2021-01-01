import { makeStyles, useTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CommonComps from "components/Internal/CommonComps.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import CustomButton from "components/CustomButtons/Button.js";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Grid } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { Link } from "react-router-dom";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import PeopleIcon from "@material-ui/icons/People";
import PropTypes from "prop-types";
import React from "react";
import SecurityIcon from "@material-ui/icons/Security";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import VisuComp from "components/Internal/VisuComp";
import { autoPlay } from "react-swipeable-views-utils";
import { withStyles } from "@material-ui/core/styles";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    header: "Mit Herz",
    text: "Durch unsere Kundenorientierung können wir gemeinsam alles schaffen",
    icon: <FavoriteIcon color="secondary" style={{ fontSize: 150 }} />,
  },
  {
    header: "Sicherheit",
    text: "Unser Quellcode ist Open Source und wir ständig getestet",
    icon: <SecurityIcon color="primary" style={{ fontSize: 150 }} />,
  },
  {
    header: "Kompetenz",
    text: "Die Inhalte werden in Zusammenarbeit mit Ärzten erstellt",
    icon: <PeopleIcon color="primary" style={{ fontSize: 150 }} />,
  },
];



const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
  },
  loginButton: {
    marginTop: 20,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
});

class LoginFirst extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      // Default data
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
      maxSteps: tutorialSteps.length,
      activeStep: 0,
    };
  }

  componentDidMount() {
    this.updateComp();
  }
  
  updateComp = () => {
  };

  setActiveStep = (value) => {
    this.setState({ activeStep: value });
  };

  handleNext = () => {
    this.setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  handleBack = () => {
    this.setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  handleStepChange = (step) => {
    this.setActiveStep(step);
  };

  buttonClick = () => {
    // Direct not possible
    // Known bug: Can access all even clicked on login, but it is on purpose left that way
    this.props.setLoginClicked(true);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CommonComps commonProps={this.state.commonProps} />

        <Card>
          <CardBody>
            <AutoPlaySwipeableViews
              axis={"x"}
              index={this.state.activeStep}
              onChangeIndex={this.handleStepChange}
              enableMouseEvents
            >
              {tutorialSteps.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(this.state.activeStep - index) <= 2 ? (
                    <div>
                      <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        style={{
                          paddingTop: 30,
                          paddingBottom: 30,
                        }}
                      >
                        {step.icon}
                      </Typography>

                      <Typography
                        variant="h4"
                        gutterBottom
                        align="center"
                        style={{
                          paddingTop: 30,
                          paddingBottom: 30,
                        }}
                      >
                        {step.header}
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        align="center"
                        style={{
                          paddingTop: 30,
                          paddingBottom: 40,
                        }}
                      >
                        {step.text}
                      </Typography>
                    </div>
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              variant="dots"
              steps={3}
              position="static"
              activeStep={this.state.activeStep}
              className={classes.root}
              style={{ background: "#ffffff" }}
              nextButton={
                <Button
                  size="small"
                  onClick={this.handleNext}
                  disabled={this.state.activeStep === 2}
                ></Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={this.handleBack}
                  disabled={this.state.activeStep === 0}
                ></Button>
              }
            />

            <Link style={{ textDecoration: "none" }} to="/user">
              <CustomButton
                size="large"
                color="primary"
                className={classes.loginButton}
                onClick={this.buttonClick}
              >
                Einloggen
              </CustomButton>
            </Link>
          </CardBody>
        </Card>
      </div>
    );
  }
}

LoginFirst.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginFirst);
