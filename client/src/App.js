import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Reset from "./pages/reset/Reset";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalContentProvider } from "./HandlingContext/ContentContext";
function App() {
  return (
    <div className="app">
      <GlobalContentProvider>
        <Router>
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/" element={<Login />} />
          </Routes>
        </Router>
      </GlobalContentProvider>
    </div>
  );
}
export default App;
