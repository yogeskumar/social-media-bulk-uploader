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
      <Sidebar />
      <main>
        <Toolbar />
        <Content />
      </main>
    </div>
    );
}
export default Dashboard;