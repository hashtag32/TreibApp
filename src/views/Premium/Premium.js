import {
  labKeyToNameMapping,
  labKeyToNameUnit,
  limits,
} from "views/SmartDoc/SmartDoc_Data.js";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PlainTable from "components/EditableTableReport/PlainTable.js";
import PropTypes from "prop-types";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

import VisuComp from "components/Internal/VisuComp.js";
import { checkUser } from "components/Internal/Checks.js";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getAllUsers } from "components/Internal/UserFunctions.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import DisplayFiles from "components/VisuComps/DisplayFiles.js";
import CardActionArea from "@material-ui/core/CardActionArea";
import { openWindow } from "components/Internal/VisuElements.js";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import UploadImage from "components/VisuComps/UploadImage";

import {
  writeRequest,
  writeNotification,
  getRequests,
  changeRequest,
  writeDBDataWithUid,
  readDBDataWithUid,
} from "components/Internal/DBFunctions.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import CommonComps from "components/Internal/CommonComps.js";
import {
  DefaultUserProfile,
  DefaultMedRecord,
} from "components/Internal/DefaultData";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

import { RiVipCrown2Fill} from 'react-icons/ri';

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

const styles = (theme) => ({
  margin: {
    margin: "0",
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
  submitButton: {
    marginRight: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
});

class Premium extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      uploadFiles: [],
      selectedRequest: "",
      answerMessage: "",
      medRecord: {
        ...DefaultMedRecord,
      },
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };
  }

  componentDidMount() {
    this.updateComp();
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
  updateComp = () => {};

  subscribe = () => {
    if (!this.checkLoginAndDisplay()) {
      return;
    }

    this.displayPopUp(
      "Dieses Feature kommt in Kürze. Danke für das Verständnis."
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>
                  Genießen Sie Premium Features
                </h4>

              </CardHeader>
              <CardBody>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem>
                    <ListItemIcon>
                    <RiVipCrown2Fill style={{height:"25px", width:"25px"}}/>
                    </ListItemIcon>
                    <ListItemText primary="24/7 Support " />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                    <RiVipCrown2Fill style={{height:"25px", width:"25px"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Priorität Anfragenbearbeitung" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                    <RiVipCrown2Fill style={{height:"25px", width:"25px"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Teilen von einzelnen Befunden" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                    <RiVipCrown2Fill style={{height:"25px", width:"25px"}}/>
                    </ListItemIcon>
                    <ListItemText primary="Selbstzerstörungstimer der Freigabelinks" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                    <RiVipCrown2Fill style={{height:"25px", width:"25px"}}/>
                    </ListItemIcon>
                    <ListItemText primary="30 Tage Geld-Züruck-Garantie" />
                  </ListItem>


                  
                </List>
              </CardBody>
              <CardFooter>
                <Button
                  className={classes.submitButton}
                  color="primary"
                  onClick={this.subscribe}
                >
                  Jetzt aktivieren
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Premium.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Premium);
