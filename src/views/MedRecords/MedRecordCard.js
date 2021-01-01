import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import MedRecordDialog from "views/MedRecords/MedRecordDialog.js";
import PropTypes from "prop-types";
import React from "react";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  card: {
    maxWidth: 345,
    marginBottom: 100,
    paddingBottom: theme.spacing(1),
  },
  media: {
    height: 140,
  },
  dialogtitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  downloadButton: {
    position: "relative",
    left: "50%",
    height: 150,
    width: 150,
    color: "grey",
  },
});

class MedRecordCard extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea onClick={(e) => this.props.openModal(this.props.medRecord, e)}>
          {this.props.medRecord.isImage ? (
            <CardMedia
              className={classes.media}
              component="img"
              image={this.props.medRecord.link}
              title="Befund"
            />
          ) : (
            <CardMedia
              className={classes.media}
              component="img"
              image="https://img.pngio.com/file-png-image-royalty-free-stock-png-images-for-your-design-file-png-256_256.png"
              title="Befund"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.medRecord.disease}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.medRecord.date}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.medRecord.doctor}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton
            onClick={(e) => this.props.removeMedRecord(this.props.medRecord, e)}
            aria-label="test"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton style={{ marginLeft: "auto" }} aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <MedRecordDialog {...this.props} />
      </Card>
    );
  }
}

MedRecordCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MedRecordCard);
