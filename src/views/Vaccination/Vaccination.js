import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import EditableTableReport from "components/EditableTableReport/EditableTableReport.js";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import Button from "@material-ui/core/Button";
import VisuComp from "components/Internal/VisuComp";
import PropTypes from "prop-types";
import React from "react";
import Table from "components/Table/Table.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const styles = {
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
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

class Vaccination extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      external: {
        tableOptions: {
          name: "Vaccination",
          columns: [
            { title: "Impfung", field: "vaccination" },
            { title: "Jahr", field: "year" },
            { title: "Arzt", field: "doctor" },
          ],
          data: [
            {
              vaccination: "Beispiel Impfung",
              year: "2010",
              doctor: "Dr. Wilder",
            },
            {
              vaccination: "Polio",
              year: "2012",
              doctor: "Dr. Müller",
            },
          ],
        },
      },
    };

  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Übersicht</h4>
              <p className={classes.cardCategoryWhite}>
                Alle Impfungen auf einen Blick
              </p>
            </CardHeader>
            <CardBody>
              <EditableTableReport
                tableOptions={this.state.external.tableOptions}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Intervalle</h4>
              <p className={classes.cardCategoryWhite}>
                Zeiträume für bestimmte Impfungen
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Impfung", "Zeitraum", "Impfempfehlung"]}
                tableData={[
                  ["Polio", "Alle 10 Jahre", "Dringend empfohlen"],
                  ["Tetanus", "Alle 5 Jahre", "Dringend empfohlen"],
                  ["FMSE", "Alle 15 Jahre", "Optional"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

Vaccination.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Vaccination);
