import React from "react";
import "./dashboard.css";
import Navbar from "../../components/NavBar/NavBar";
import Sidebar from "../../components/SideBar/SideBar";
import Content from "../../components/Content/Content";
import { CssBaseline, Toolbar } from "@mui/material";

function Dashboard() {
  return (
    <div className="dashboard">
      <CssBaseline />
      <Navbar />
      <div className="dashboard__content">
        <Sidebar />
        <main className="dashboard__main">
          <Toolbar />
          <Content />
        </main>
      </div>
    </div>
  );
}
export default Dashboard;