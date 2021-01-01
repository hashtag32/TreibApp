import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import Button from "components/CustomButtons/Button.js";
import CommonComps from "components/Internal/CommonComps.js";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { getPublicKey } from "components/Internal/Extraction.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import { checkUser } from "components/Internal/Checks.js";
import VisuComp from "components/Internal/VisuComp";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";

import { MTableToolbar } from "material-table";

const styles = () => ({});
class EditableTableReport extends VisuComp {
  constructor(props) {
    super(props);

    this.state = {
      // Default data
      data: this.props.tableOptions.data,
      commonProps: { ...CommonCompsData, updateComp: this.updateComp },
    };
    this.tableChanged = this.tableChanged.bind(this);
  }

  componentDidMount() {
    this.updateComp();
  }

  // Will trigger update from e.g. Emergency->linkAccess that will be triggered after componentdidmount
  componentDidUpdate(prevProps) {
    console.log("update");
    if (prevProps == this.props) {
      // No change from above (currently nothing else is needed)
      return;
    } else {
      this.updateComp();
    }
  }

  // Required from CommonProps
  updateComp = () => {
    this.TableFetch(this.props.tableOptions.name, true);
  };

  // Is called when table is changed
  tableChanged = () => {
    this.TableChanged(this.props.tableOptions.name, this.state.data);

    if (this.props.tableOptions.updateComp != null) {
      this.props.tableOptions.updateComp();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <CommonComps commonProps={this.state.commonProps} />
        <MaterialTable
          boxShadow={0}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
          }}
          icons={{
            Add: () => (
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            ),
          }}
          title=""
          columns={this.props.tableOptions.columns}
          options={{
            search: false,
            toolbarButtonAlignment: "right",
            paging: false,

            headerStyle: {
              color: "#9c27b0",
              padding: 15,
              paddingLeft: 5,
            },
            actionsColumnIndex: 10,
            cellStyle: {
              padding: 5,
              paddingLeft: 5,
            },
            rowStyle: {
              fontSize: 13,
              fontWeight: 300,
            },
          }}
          data={this.state.data}
          localization={{
            body: {
              emptyDataSourceMessage: "Keine Einträge",
              addTooltip: "Hinzufügen",
              deleteTooltip: "Löschen",
              editTooltip: "Bearbeiten",
              filterRow: {
                filterTooltip: "Filter",
              },
              editRow: {
                deleteText: "Diese Zeile wirklich löschen?",
                cancelTooltip: "Abbrechen",
                saveTooltip: "Speichern",
              },
            },
            grouping: {
              placeholder: "Spalten ziehen ...",
              groupedBy: "Gruppiert nach:",
            },
            header: {
              actions: "Aktionen",
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} von {count}",
              labelRowsSelect: "Zeilen",
              labelRowsPerPage: "Zeilen pro Seite:",
              firstAriaLabel: "Erste Seite",
              firstTooltip: "Erste Seite",
              previousAriaLabel: "Vorherige Seite",
              previousTooltip: "Vorherige Seite",
              nextAriaLabel: "Nächste Seite",
              nextTooltip: "Nächste Seite",
              lastAriaLabel: "Letzte Seite",
              lastTooltip: "Letzte Seite",
            },
            toolbar: {
              addRemoveColumns: "Spalten hinzufügen oder löschen",
              nRowsSelected: "{0} Zeile(n) ausgewählt",
              showColumnsTitle: "Zeige Spalten",
              showColumnsAriaLabel: "Zeige Spalten",
              exportTitle: "Export",
              exportAriaLabel: "Export",
              exportName: "Export als CSV",
              searchTooltip: "Suche",
              searchPlaceholder: "Suche",
            },
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                  this.tableChanged();
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                  this.tableChanged();
                }, 600);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  this.setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                  this.tableChanged();
                }, 600);
              }),
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(EditableTableReport);
