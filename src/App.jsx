import { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./App.css";
import { data } from "./sampleData";

const App = () => {
  const [rowData] = useState(data[0].employees);

  const [columnDefs] = useState([
    { headerName: "ID", field: "id", width: 60 },
    { headerName: "First Name", field: "firstName", width: 120 },
    { headerName: "Last Name", field: "lastName", width: 120 },
    { headerName: "Email", field: "email", width: 250 },
    { headerName: "Department", field: "department", width: 150 },
    { headerName: "Position", field: "position", width: 210 },
    {
      headerName: "Salary",
      field: "salary",
      valueFormatter: (p) => `$${p.value.toLocaleString()}`,
      width: 120,
    },
    { headerName: "Hire Date", field: "hireDate", width: 130 },
    { headerName: "Age", field: "age", width: 80 },
    { headerName: "Location", field: "location", width: 150 },
    { headerName: "Performance", field: "performanceRating", width: 130 },
    { headerName: "Projects", field: "projectsCompleted", width: 110 },
    {
      headerName: "Active",
      field: "isActive",
      width: 100,
      cellRenderer: (p) => (p.value ? "✅ Yes" : "❌ No"),
    },
    { headerName: "Manager", field: "manager", width: 160 },
    {
      headerName: "Skills",
      field: "skills",
      valueFormatter: (p) => p.value?.join(", "),
      flex: 2,
      minWidth: 400,
    },
  ]);

  const [defaultColDef] = useState({
    resizable: true,
    sortable: true,
    filter: true,
  });

  const [quickFilterText, setQuickFilterText] = useState("");
  const onFilterTextChange = useCallback((e) => {
    setQuickFilterText(e.target.value);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Employee Dashboard</h1>
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
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default App;