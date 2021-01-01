import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MedRecordsContent from "views/MedRecords/MedRecordsContent.js";
import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core/styles";

class MedRecords extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return <MedRecordsContent />;
  }
}

MedRecords.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles()(MedRecords);
