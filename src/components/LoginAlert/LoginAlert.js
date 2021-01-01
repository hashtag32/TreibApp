import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class LoginAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.loginState.openLoginRequired,
    };
  }

  // Listens to own and assigned parent state
  componentDidUpdate(prevProps) {
    // Is called when the corresponding state is changed in parent class (indirect trigger)
    // Is also called a 2nd time when setState{open:true} is called inside this function
    if (prevProps != this.props) {
      this.setState({
        open: this.props.loginState.openLoginRequired,
      });
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
    this.props.loginState.openLoginRequired = false;
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Bitte einloggen"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bitte logge dich ein um dieses Feature zu nutzen.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Verstanden
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LoginAlert;
