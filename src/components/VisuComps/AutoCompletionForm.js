/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import VisuComp from "components/Internal/VisuComp.js";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const filter = createFilterOptions();

class AutoCompletionForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Autocomplete
        value={this.props.value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              // wait - I don't know
            });
          } else if (newValue && newValue.inputValue) {
            // Called when new category is added
            // newValue: {inputValue: "NewCategory"}

            var newElement = { title: newValue.inputValue };
            this.props.addValueToOptionList(newElement);
            this.props.changeMedRecord(
              this.props.medRecord,
              "category",
              newValue.inputValue
            );
          } else {
            // Called when category is changed
            // newValue: {title: "NewCategory"}

            if (newValue != null) {
              if (
                this.props.optionList.some(
                  (option) => option.title === newValue.title
                )
              ) {
                this.props.changeMedRecord(
                  this.props.medRecord,
                  "category",
                  newValue.title
                );
              }
            }
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              title: `"${params.inputValue}" hinzufügen`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={this.props.optionList}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(option) => option.title}
        style={{
          marginTop: "27px",
        }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Kategorie" variant="standard" />
        )}
      />
    );
  }
}
export default withStyles(styles)(AutoCompletionForm);
