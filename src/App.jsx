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
    { headerName: "ID", field: "id", width: 45 },
    { headerName: "First Name", field: "firstName", width: 100 },
    { headerName: "Last Name", field: "lastName", width: 100 },
    { headerName: "Email", field: "email", width: 250 },
    { headerName: "Department", field: "department", width: 150 },
    { headerName: "Position", field: "position", width: 200 },
    { headerName: "Salary", field: "salary", valueFormatter: p => `$${p.value}`, width: 100 },
    { headerName: "Hire Date", field: "hireDate", width: 130 },
    { headerName: "Age", field: "age", width: 75 },
    { headerName: "Location", field: "location", width: 150 },
    { headerName: "Performance", field: "performanceRating", width: 120 },
    { headerName: "Projects", field: "projectsCompleted", width: 100 },
    { headerName: "Active", field: "isActive", width: 100 },
    { headerName: "Manager", field: "manager", width: 150 },
    { headerName: "Skills", field: "skills", valueFormatter: p => p.value?.join(", "), width: 'auto' }
  ]);

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
        />
      </div>
    </div>
  );
};

export default App;