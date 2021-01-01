import Button from "components/CustomButtons/Button.js";
import React from "react";
import {writeDBData} from "components/Internal/DBFunctions.js";

// Contains only data to visualize the
class NotificationData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationList: props.notificationList,
    };
  }

  readDBNotificationData = () => {
    this.setOpenProfile(null);
  };

  writeDBNotificationData = () => {
    writeDBData("testTable", "testdata")
    // this.setOpenProfile(null);
  };

  appendList=(item) => {
    this.setState({ notificationList: [...this.state.notificationList, item] });
  }

  // Listens to own and assigned parent state
  componentDidUpdate(prevProps) {
    // Is called when the corresponding state is changed in parent class (indirect trigger)
    // Is also called a 2nd time when setState{open:true} is called inside this function
    // if (this.props.notifications.openNotification == true) {
    //   this.showgenericNotification();
    //   // Open Dialog
    //   this.setState({
    //     open: true,
    //   });
    //   // Reset it in parent class
    //   this.props.notifications.openNotification = false;
    // }
  }

  changeChange = () => {
    var childList = ["childitem1", "childitem2"];
    this.props.onNotificationDataChange(childList);
    this.writeDBNotificationData();
  };

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default NotificationData;
