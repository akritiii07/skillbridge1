import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>

      {/* Navbar for ALL pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </Router>
  );
}

export default App;