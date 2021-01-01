import AddAlert from "@material-ui/icons/AddAlert";
import Card from "@material-ui/core/Card";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PropTypes from "prop-types";
import React from "react";
import Snackbar from "components/Snackbar/Snackbar.js";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

const styles = {};

// Class for displaying a PopUp
class PopUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.popUp.openPopUp,
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false,
      // Default actually not necessary see DefaultData
      duration: 2500, //ms
      message: "Test Message",
      type: "info", //info, success, warning, danger, primary
      position: "tc", // default position
    };

    this.checkAction = this.checkAction.bind(this);
    this.showgenericPopUp = this.showgenericPopUp.bind(this);
  }

  // Listens to own and assigned parent state
  componentDidUpdate(prevProps) {
    // Is called when the corresponding state is changed in parent class (indirect trigger)
    // Is also called a 2nd time when setState{open:true} is called inside this function
    if (prevProps != this.props) {
      this.state.type = this.props.popUp.type;
      this.state.message = this.props.popUp.message;
      this.state.open = this.props.popUp.openPopUp;
      this.checkAction();
    }
  }

  componentDidMount() {
    // Not on the beginning because this.state is not available yet
    this.checkAction();
  }

  // Open or close PopUp
  checkAction = () => {
    if (this.state.open) {
      this.showgenericPopUp();
    }
  };

  handleClose = (position) => {
    this.setState({ open: false });
    this.setState({ [position]: false });

    this.props.popUp.openPopUp = false;
  };

  showgenericPopUp = () => {
    this.showPopUp(this.state.position);
  };

  showPopUp = (position) => {
    if (!this.state.$place) {
      this.setState({ [position]: true });
      setTimeout(() => {
        this.handleClose(position);
      }, this.state.duration);
    }
  };

  render() {
    return (
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="tl"
                  color={this.state.type}
                  icon={AddAlert}
                  message={this.state.message}
                  open={this.state.tl}
                  closeNotification={() => this.handleClose("tl")}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="tc"
                  color={this.state.type}
                  icon={AddAlert}
                  message={this.props.popUp.message}
                  open={this.state.tc}
                  closeNotification={() => this.handleClose("tc")}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="tr"
                  color={this.state.type}
                  icon={AddAlert}
                  message={this.props.popUp.message}
                  open={this.state.tr}
                  closeNotification={() => this.handleClose("tr")}
                  close
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="bl"
                  color={this.state.type}
                  icon={AddAlert}
                  message={this.state.message}
                  open={this.state.bl}
                  closeNotification={() => this.handleClose("bl")}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="bc"
                  color={this.state.type}
                  icon={AddAlert}
                  message={this.state.message}
                  open={this.state.bc}
                  closeNotification={() => this.handleClose("bc")}
                  close
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Snackbar
                  place="br"
                  color={this.state.type}
                  icon={AddAlert}
                  message={this.state.message}
                  open={this.state.br}
                  closeNotification={() => this.handleClose("br")}
                  close
                />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

PopUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopUp);
