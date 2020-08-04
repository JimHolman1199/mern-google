import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import FileCopyIcon from '@material-ui/icons/FileCopy';

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

  return (
      <MaterialTable
        title="Data Studio Links"
        columns={tableColumns}
        data={fields}
        options = {{
          exportButton: true,
          rowStyle: rowData => ({
            backgroundColor: (selectedRow === rowData.tableData.id) ? 'rgba(14, 79, 72, 1)' : '#FFF0'
          })
        }}
        isLoading={loading}
        icons={tableIcons}
        onRowClick={handleClick}
        actions={[
          {
            icon: FileCopyIcon,
            tooltip: 'Copy URL',
            onClick: handleCopyAction
          }
        ]}
      />
  );
}

export default Table;
