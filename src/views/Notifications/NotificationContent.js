import { grey, red } from "@material-ui/core/colors";
// @material-ui/core components
import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import { shareLink } from "components/Internal/Sharing.js";
import { defaultURL} from "components/Internal/DefaultData.js";

import Avatar from "@material-ui/core/Avatar";
// @material-ui/icons
import Card from "components/Card/Card.js";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardHeader from "components/Card/CardHeader.js";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import IconButton from "@material-ui/core/IconButton";
// nodejs library to set properties for components
import PropTypes from "prop-types";
/*eslint-disable*/
import React from "react";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  avatar: {
    backgroundColor: red[500],
  },
  notificationCard: {
    maxWidth: 345,
  },
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
  favorite: {
    marginLeft: "auto",
  },
  avatar: {
    backgroundColor: red[500],
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    // transition: theme.transitions.create("transform", {
    //   duration: theme.transitions.duration.shortest,
    // }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dbName: "Notifications",
      data: [
        {
          favoriteActive: false,
          message: "Dermatologie möchte Termin vereinbaren",
          sender: "Dr. Wilder",
          date: "20.20.2020",
          title: "Neuer Befund",
        },
        {
          favoriteActive: false,
          message: "2 möchte einen Termin vereinbaren",
          sender: "Dr. Wilder",
          date: "20.20.2020",
          title: "Terminvereinbarung",
        },
      ],
    };

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  componentDidMount() {
    this.fetchTable();
  }

  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    }
    // this.fetchTable();
  }

  // DB functions
  fetchTable = () => {
    return readDBData(this.state.dbName).then((doc_data) => {
      if (doc_data == null) return;
      // Cannot get data -> set default data from parent class
      // this.setState({ data: this.props.tableOptions.data });
      else this.setState({ data: doc_data });
    });
  };

  // Is called when table is changed
  uploadTable = async() => {
    return await writeDBData(this.state.dbName, this.state.data);
  };

  // Data Table changes
  changeNotification(notification, key, value) {
    var newData = { ...notification, [key]: value };

    this.setState(
      (prevState) => {
        const data = [...prevState.data];
        data[data.indexOf(notification)] = newData;
        return { ...prevState, data };
      },
      () => {
        this.uploadTable();
      }
    );
  }

  removeNotification = (NotificationToRemove) => {
    this.setState(
      (prevState) => {
        const data = [...prevState.data];
        data.splice(data.indexOf(NotificationToRemove), 1);
        return { ...prevState, data };
      },
      () => {
        this.uploadTable();
      }
    );
  };

  // UI functions
  handleFavoriteClick = (notification) => {
    this.changeNotification(
      notification,
      "favoriteActive",
      !notification.favoriteActive
    );
  };

  handleShareClick = (notification) => {
    var message="Hallo, ich habe die folgende Nachricht erhalten: \n";
    message+=notification.title + "\n";
    message+=notification.message + "\n";
    message+=notification.sender+ ", " + notification.date;
    console.log(message);
    return shareLink(message, defaultURL);

  };

  

  handleCloseClick = (notification) => {
    this.removeNotification(notification);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          {this.state.data.map((notification) => (
            <GridItem xs={12} sm={6} md={4}>
              {/* Previously ShowFile */}
              <Card className={classes.notificationCard}>
                {/* NotificationCard */}
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {notification.sender.charAt(0)}
                    </Avatar>
                  }
                  action={
                    <IconButton
                      onClick={() => this.handleCloseClick(notification)}
                      aria-label="settings"
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                  title={notification.title}
                  subheader={notification.date}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {notification.message}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton 
                  onClick={() => this.handleShareClick(notification)} 
                  aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    className={classes.favorite}
                    onClick={() => this.handleFavoriteClick(notification)}
                    aria-label="show more"
                  >
                    <FavoriteIcon
                      style={{
                        color: notification.favoriteActive
                          ? red[500]
                          : grey[600],
                      }}
                    />
                  </IconButton>
                </CardActions>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifications);
