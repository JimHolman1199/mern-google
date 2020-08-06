import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { tableColumns, tableIcons } from './tableSettings';

const Table = ({ itemsArr, itemsArr:{items} }) => {

  const [loading, setLoading] = useState(true)
  const [fields, setFields] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(()=>{
    if(items){
      setLoading(false)
      setFields(items)
    }
  },[itemsArr])

  const handleClick = (evt, selectedRow) => {
    setSelectedRow(selectedRow.tableData.id)
  }

  const handleCopyAction = (event, rowData) => {
    navigator.clipboard.writeText(rowData.webViewLink).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  const handleOpenInNewTab = (event, rowData) => {
    window.open(rowData.webViewLink,'_blank')
  }

  return (
      <MaterialTable
        title="Data Studio Links"
        columns={tableColumns}
        data={fields}
        options = {{
          exportButton: true,
          rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? 'rgba(14, 79, 72, 1)' : '#FFF0'
          }),
          paging: false,
          maxBodyHeight: '75vh',
          headerStyle: { position: 'sticky', top: 0 },
        }}
        isLoading={loading}
        icons={tableIcons}
        onRowClick={handleClick}
        actions={[
          {
            icon: FileCopyIcon,
            tooltip: 'Copy URL',
            onClick: handleCopyAction
          },{
            icon: OpenInNewIcon,
            tooltip: 'Open in New Tab',
            onClick: handleOpenInNewTab
          }
        ]}
      />
  );
}

export default Table;
