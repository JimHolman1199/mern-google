import React, { createContext, useState, useEffect } from "react";

export const TableContext = createContext({
    tableData: null
});

const TableProvider = ({ children }) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/drive")
                const json = await response.json()
                setData(json.items)
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchData()
        
    }, []);

  return (
      <TableContext.Provider value={{ data }}>
          { children }
      </TableContext.Provider>
  );
};

export default TableProvider;
