import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Reset from "./pages/reset/Reset";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalContentProvider } from "./HandlingContext/ContentContext";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from './firebase';
import { useEffect } from "react";
import { GlobalUrlToScheduleProvider } from "./HandlingContext/UrlToSchedule";
import { GoogleOAuthProvider } from '@react-oauth/google';
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import SocialAuthentication from "./pages/SocialAuthentication/SocialAuthentication";
function App() {
  const [user] = useAuthState(auth);
  useEffect(()=>{
    if(!user && (window.location.href !== process.env.REACT_APP_domain)){
      window.location.href = process.env.REACT_APP_domain;
    }
  },[user]);

  return (
    <div className="app">
      <GlobalContentProvider>
        <GlobalUrlToScheduleProvider>
        <Router>
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/socialauthentication" element={<SocialAuthentication />} />
            <Route exact path="/" element={<Login />} />
            {/* <Route exact path="/*" element={<NotFoundPage />} /> */}
          </Routes>
        </Router>
        </GlobalUrlToScheduleProvider>
      </GlobalContentProvider>
    </div>
  );
}
export default App;
