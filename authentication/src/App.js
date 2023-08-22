import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import YouTubeAuth from "./pages/YouTubeAuth";
import InstagramAuth from "./pages/InstagramAuth";
import TikTokAuth from "./pages/TikTokAuth";
import Home from "./pages/Home";
function App() {

  return (
    <div className="app">
        <Router>
          <Routes>
            <Route exact path="/youtubeauth" element={<YouTubeAuth />} />
            <Route exact path="/instagramauth" element={<InstagramAuth />} />
            <Route exact path="/tiktokauth" element={<TikTokAuth />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
    </div>
  );
}
export default App;
