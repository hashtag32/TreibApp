/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import VisuComp from "components/Internal/VisuComp.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Typography from "@material-ui/core/Typography";

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: "this.props.bgColor",
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: "50%",
  },
  circleStyle: {
    backgroundColor: "#00af50",
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
});

class AQIElement extends React.Component {
  constructor(props) {
    super(props);
  }

  getInfoText(value) {
    if ( value < 50) return "Saubere Luft";
    else if (value > 50 && value < 100) return "Beeinträchtigte Luft";
    else if (value > 100 && value < 150) return "Belastete Luft";
    else if (value > 150 && value < 200) return "Ungesunde Luft";
    else if (value > 200 && value < 300) return "Extrem ungesunde Luft";
    else if (value > 300 && value < 400) return "Gefährliche Luft";
    else if (value > 400) return "Extrem Gefährliche Luft";
  }

  getColor(value) {
    if ( value < 50) return "#00af50"; //green
    else if (value > 50 && value < 100) return "#ffff00"; //yellow
    else if (value > 100 && value < 150) return "#ffc000"; //orange
    else if (value > 150 && value < 200) return "#fe0000"; //red
    else if (value > 200 && value < 300) return "#7030a0"; // lila
    else if (value > 300 && value < 400) return "#450d70"; //darkpurple
    else if (value > 400) return "#140222"; //almost black
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>{this.props.name}</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={6} sm={6} md={4}>
                <Typography variant="h5" component="h2">
                  {this.props.value}
                </Typography>
              </GridItem>

              <GridItem xs={6} sm={6} md={4}>
                <div className={classes.circleStyle} style={{backgroundColor:this.getColor(this.props.value)}} />
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                {this.getInfoText(this.props.value)}
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(AQIElement);
