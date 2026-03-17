import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Fashion from "./pages/Fashion";
import Food from "./pages/Food";
import Crafts from "./pages/Crafts";

function App() {
  return (
    <div className="min-h-screen">

      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/food" element={<Food />} />
        <Route path="/crafts" element={<Crafts />} />
      </Routes>

      
      <Footer />
    </div>
  );
}

export default App;