import { makeStyles, useTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomButton from "components/CustomButtons/Button.js";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Grid } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import PeopleIcon from "@material-ui/icons/People";
import React from "react";
import SecurityIcon from "@material-ui/icons/Security";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import { autoPlay } from "react-swipeable-views-utils";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 20,
  },
  loginButton:{
    marginTop: 20,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    fontSize:20,
    paddingLeft:50,
    paddingRight:50,
  }
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Card>
        <CardBody>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {tutorialSteps.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
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
            activeStep={activeStep}
            className={classes.root}
            style={{ background: "#ffffff" }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === 2}
              ></Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              ></Button>
            }
          />

          <CustomButton
            size="large"
            color="primary"
            className={classes.loginButton}
          >
            Einloggen
          </CustomButton>
        </CardBody>
      </Card>
    </div>
  );
}

export default SwipeableTextMobileStepper;
