import React, { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./App.css";
import { sampleData } from "./sampleData";

const App = () => {
  const [rowData] = useState(sampleData);
  const [columnDefs] = useState([
    { headerName: "ID", field: "id", sortable: true, filter: true, width: 90 },
    { headerName: "Name", field: "name", sortable: true, filter: true, flex: 1 },
    { headerName: "Role", field: "role", sortable: true, filter: true, flex: 1 },
    { headerName: "Department", field: "department", sortable: true, filter: true, flex: 1 },
    { headerName: "Age", field: "age", sortable: true, filter: true, width: 100 },
  ]);

  const [quickFilterText, setQuickFilterText] = useState("");

  const onFilterTextChange = useCallback((e) => {
    setQuickFilterText(e.target.value);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Team Dashboard</h1>
        <p>Overview of employees and departments</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          onChange={onFilterTextChange}
          placeholder="Search..."
          className="search-input"
        />
      </div>

      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          quickFilterText={quickFilterText}
        />
      </div>
    </div>
  );
};

export default App;