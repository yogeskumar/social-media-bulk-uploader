// src/Content.js
import React, {useContext} from "react";
import { Typography, Container } from "@mui/material";
import VideoUploader from "../VideoUploader/VideoUploader";
import { GlobalContentContext } from "../../HandlingContext/ContentContext";
import Analytics from './Sections/Analytics/Analytics';
import Upload from './Sections/Upload/Upload';
import Schedule from './Sections/Schedule/Schedule';
import Scheduled from './Sections/Scheduled/Scheduled';
import Profile from './Sections/Profile/Profile';
import Settings from './Sections/Settings/Settings';
import Help from './Sections/Help/Help';
import Pricing from './Sections/Pricing/Pricing';
import './style.css'

const Content = () => {
  const {content} = useContext(GlobalContentContext)
  return (
    <Container>
      {/* <Typography variant="h4" gutterBottom className="welcome">
        Welcome to the Dashboard
      </Typography> */}
      {content === 'analytics' && <Analytics />}
      {content === 'upload' && <Upload />}
      {content === 'schedule' && <Schedule />}
      {content === 'scheduled' && <Scheduled />}
      {content === 'profile' && <Profile />}
      {content === 'settings' && <Settings />}
      {content === 'help' && <Help />}
      {content === 'pricing' && <Pricing />}
            {/* <VideoUploader/> */}
    </Container>
  );
};

export default Content;
