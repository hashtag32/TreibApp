/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import VisuComp from "components/Internal/VisuComp.js";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { withStyles } from "@material-ui/core/styles";
// import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { openWindow } from "components/Internal/VisuElements.js";
import GridItem from "components/Grid/GridItem.js";

const filter = createFilterOptions();

const styles = (theme) => ({
  mediaroot: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

class DisplayFiles extends VisuComp {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        {this.props.files.map((file) => (
          <GridItem xs={12} sm={6} md={4}>
            <Card className={classes.mediaroot}>
              <CardActionArea onClick={(e) => openWindow(file.link, e)}>
                {file.isImage ? (
                  <CardMedia className={classes.media} image={file.link} />
                ) : (
                  <CardMedia
                    className={classes.media}
                    image="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {file.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    );
  }
}
export default withStyles(styles)(DisplayFiles);
