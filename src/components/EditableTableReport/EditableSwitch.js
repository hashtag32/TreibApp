import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "components/CustomButtons/Button.js";
import CommonComps from "components/Internal/CommonComps.js";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import React from "react";
import Switch from "@material-ui/core/Switch";
import { connect } from "react-redux";
import { getPublicKey } from "components/Internal/Extraction.js";
import { withStyles } from "@material-ui/core/styles";

class EditableSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Default data
      name: "Switch" + this.props.switchOptions.name,
      checked: this.props.switchOptions.checked,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // Will trigger update from e.g. Emergency->linkAccess that will be triggered after componentdidmount
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.fetchTable();
    }
  }

  componentDidMount() {
    this.fetchTable();
  }

  // Fetch the table from Firebase (Original data)
  // Is called when table is changed
  fetchTable = () => {
    return readDBData(this.state.name, false).then((doc_data) => {
      if (doc_data == null) return;
      // Cannot get data -> set default data from parent class
      // this.setState({ data: this.props.tableOptions.data });
      else this.setState({ checked: doc_data });
    });
  };

  // Is called when table is changed
  uploadTable = async () => {
    this.props.switchOptions.checked = this.state.checked;
    return await writeDBData(this.state.name, this.state.checked);
  };

  handleChange = (event) => {
    console.log(this.state);
    this.setState({ checked: event.target.checked }, () => {
      this.uploadTable();
    });
    if (this.props.switchOptions.updateComp != null) {
      this.props.switchOptions.updateComp();
    }
  };

  render() {
    return (
      <div>
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

const EditableSwitchWithRedux = connect(mapStateToProps)(EditableSwitch);

export default EditableSwitchWithRedux;
