import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import { tableColumns, tableIcons } from "./tableSettings";

const Table = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const abortController = new AbortController();

    if(data){
      setFields(data);
      setLoading(false);
    }
    
    return function cleanup() {
      abortController.abort();
    };
  }, [ data ]);

  const handleClick = (evt, selectedRow) => {
    setSelectedRow(selectedRow.tableData.id);
  };

  const anchorOrigin = {
    vertical: "bottom",
    horizontal: "center",
  };

  const handleCopyAction = (event, rowData) => {
    navigator.clipboard.writeText(rowData.webViewLink).then(
      function () {
        enqueueSnackbar("Copied to the clipboard", {
          variant: "success",
          anchorOrigin
        });
      },
      function (err) {
        enqueueSnackbar(`Something went wrong, ${err}`, {
          variant: "error",
          anchorOrigin
        });
      }
    );
  };

  const handleOpenInNewTab = (event, rowData) => {
    window.open(rowData.webViewLink, "_blank");
  };

  return (
    <MaterialTable
      title="Data Studio Links"
      columns={tableColumns}
      data={fields}
      options={{
        exportButton: true,
        rowStyle: (rowData) => ({
          backgroundColor:
            selectedRow === rowData.tableData.id
              ? "rgba(14, 79, 72, 1)"
              : "#FFF0",
        }),
        paging: false,
        maxBodyHeight: "75vh",
        headerStyle: { position: "sticky", top: 0 },
      }}
      isLoading={loading}
      icons={tableIcons}
      onRowClick={handleClick}
      actions={[
        {
          icon: FileCopyIcon,
          tooltip: "Copy URL",
          onClick: handleCopyAction,
        },
        {
          icon: OpenInNewIcon,
          tooltip: "Open in New Tab",
          onClick: handleOpenInNewTab,
        },
      ]}
    />
  );
};

export default Table;
