import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

const Sidebar = ({collapsed,onToggleSidebar} ) => {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`} >
      <ul className="nav flex-column">
        <li className="nav-item">
        <div onClick={onToggleSidebar}  className="Arrowbox">{collapsed?<IoIosArrowDropleft />:<IoIosArrowDropright />}

        </div>
          <Link to="/" className="nav-link">
            <i className="bi bi-speedometer2"></i>
            {!collapsed && <span> Dashboard</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add-item" className="nav-link">
            <i className="bi bi-plus-square"></i>
            {!collapsed && <span> Add Item</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/edit-item" className="nav-link">
            <i className="bi bi-pencil-square"></i>
            {!collapsed && <span> Edit Item</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/table" className="nav-link">
            <i className="bi bi-table"></i>
            {!collapsed && <span> Table</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
