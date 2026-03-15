import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen">
      {/* Navbar stays at the top of every page */}
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        {/* You can add <Route path="/fashion" element={<Fashion />} /> here later */}
      </Routes>

      {/* Footer stays at the bottom of every page */}
      <Footer />
    </div>
  );
}

export default App;