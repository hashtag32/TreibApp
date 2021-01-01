import { readDBData, writeDBData } from "components/Internal/DBFunctions.js";

import Button from "components/CustomButtons/Button.js";
import CommonComps from "components/Internal/CommonComps.js";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { getPublicKey } from "components/Internal/Extraction.js";
import { CommonCompsData } from "components/Internal/DefaultData.js";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
class PlainTable extends React.Component {
  constructor(props) {
    super(props);

    // No state -> is only given through props and from parent
  }

  render() {
    return (
      <div>
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
          data={this.props.tableOptions.data}
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
          editable={this.props.tableOptions.editable}
        />
      </div>
    );
  }
}

export default PlainTable;
