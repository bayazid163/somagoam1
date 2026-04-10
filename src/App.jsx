import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Fashion from "./pages/Fashion";
import Food from "./pages/Food";
import Crafts from "./pages/Crafts";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Checkout from './pages/Checkout';
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import UserDashboard from "./pages/UserDashboard";
import Reviews from "./pages/Reviews";

function App() {
  const location = useLocation();

  // 1. Unified logic for hiding Layout (Navbar/Footer)
  // Note: Changed '/payment/fail' to '/payment/cancel' to match your PaymentCancel page logic if needed, 
  // or keep it as /fail but ensure it matches your Route path below.
  const hideLayout = 
  location.pathname === '/login' || 
  location.pathname === '/register' ||
  location.pathname === '/payment/success' || 
  location.pathname === '/payment/fail' || 
  location.pathname === '/payment/cancel';

  return (
    <div className="min-h-screen flex flex-col">
      {/* 2. Uses hideLayout to toggle Navbar */}
      {!hideLayout && <Navbar />}
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/food" element={<Food />} />
          <Route path="/crafts" element={<Crafts />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          {/* 3. Ensure path matches your hideLayout check exactly */}
          <Route path="/payment/fail" element={<PaymentCancel />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </div>

      {/* 4. FIXED: Changed 'isAuthPage' to 'hideLayout' */}
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;