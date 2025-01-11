import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header/Header"; // Header Component
import Sidebar from "./Sidebar/Sidebar"; // Sidebar Component
import AppRouter from "./Router"; // Router Logic
import "./App.css";
const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div className="app">
        <Header onToggleSidebar={() => setCollapsed(!collapsed)} />
        <div className="app-content">
          <Sidebar onToggleSidebar={() => setCollapsed(!collapsed)} collapsed={collapsed} />
          <div
            className={`main-content mt-0`}
            style={{
              width: `calc(100% - ${collapsed ? "50px" : "200px"})`,
            }}
          >
            <AppRouter />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
