import React, {useContext } from "react";
import { Drawer, List, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { ListItemButton } from '@mui/material';
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InsightsIcon from '@mui/icons-material/Insights';
import BackupIcon from '@mui/icons-material/Backup';
import RestoreIcon from '@mui/icons-material/Restore';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import './SideBar.css';
import { GlobalContentContext } from "../../HandlingContext/ContentContext";

const drawerWidth = 240;

const SidebarWrapper = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
}));

const Sidebar = () => {
  const {content, setContent} = useContext(GlobalContentContext)
  return (
    <SidebarWrapper variant="permanent" className="sidebar">
      <Toolbar />
      <List>
        <ListItemButton onClick={()=>setContent('analytics')}>
          <ListItemIcon>
            <InsightsIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItemButton>
        <ListItemButton onClick={()=>setContent('upload')}>
          <ListItemIcon>
            <BackupIcon />
          </ListItemIcon>
          <ListItemText primary="Upload" />
        </ListItemButton>
        <ListItemButton onClick={()=>setContent('schedule')}>
          <ListItemIcon>
            <RestoreIcon />
          </ListItemIcon>
          <ListItemText primary="Schedule" />
        </ListItemButton>
        <ListItemButton onClick={()=>setContent('scheduled')}>
          <ListItemIcon>
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText primary="Scheduled" />
        </ListItemButton>
        <ListItemButton onClick={()=>setContent('profile')}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton onClick={()=>setContent('settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton onClick={()=>setContent('help')}>
          <ListItemIcon>
            <ContactEmergencyIcon />
          </ListItemIcon>
          <ListItemText primary="Help/Support" />
        </ListItemButton>
        <ListItemButton onClick={()=>setContent('pricing')}>
          <ListItemIcon>
            <CurrencyRupeeIcon />
          </ListItemIcon>
          <ListItemText primary="Pricing" />
        </ListItemButton>
      </List>
    </SidebarWrapper>
  );
};

export default Sidebar;
