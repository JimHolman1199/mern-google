import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

import { tableColumns, tableIcons } from './tableSettings';

const Table = ({ itemsArr, itemsArr:{items} }) => {

  const [loading, setLoading] = useState(true)
  const [fields, setFields] = useState([]);

  useEffect(()=>{
    if(items){
      setLoading(false)
      setFields(items)
    }
  },[itemsArr])

  return (
    <MaterialTable
      title="Data Studio"
      columns={tableColumns}
      data={fields}
      options = {{
        exportButton: true
      }}
      isLoading={loading}
      icons={tableIcons}
    />
  );
}

export default Table;
