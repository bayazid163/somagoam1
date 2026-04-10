import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Use NavLink for active states
import { Menu, X, ShoppingBag } from 'lucide-react';
import Cart from './Cart';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Helper function for active styles to keep code clean
  const getNavLinkClass = ({ isActive }) => 
    `transition-colors duration-300 ${
      isActive 
        ? 'brand-color' // Color when active
        : 'text-stone-500 hover:brand-color' // Color when inactive
    }`;

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-[#F9F7F2] p-10 flex flex-col space-y-8 text-2xl serif transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <button onClick={toggleMenu} className="absolute top-8 right-10 text-stone-500">
          <X size={40} />
        </button>
        
        {/* Mobile NavLinks */}
        <NavLink to="/" end className={getNavLinkClass} onClick={toggleMenu}>Home</NavLink>
        <NavLink to="/fashion" className={getNavLinkClass} onClick={toggleMenu}>Fashion</NavLink>
        <NavLink to="/food" className={getNavLinkClass} onClick={toggleMenu}>GI Food</NavLink>
        <NavLink to="/crafts" className={getNavLinkClass} onClick={toggleMenu}>Crafts</NavLink>
        <NavLink to="/about" className={getNavLinkClass} onClick={toggleMenu}>Our Story</NavLink>
        
        <hr className="border-stone-200" />
        <NavLink to="/login" className="text-sm uppercase tracking-widest font-bold" onClick={toggleMenu}>Login / Account</NavLink>
      </div>

      {/* Main Navigation */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-6 sticky top-0 z-50 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-stone-200">
        <div className="logo-box brand-color cursor-pointer" onClick={() => navigate('/')}>
          <div className="text-xl serif tracking-tighter uppercase font-bold">SOMAGOM</div>
        </div>
        
        {/* Desktop Links - Using NavLink for Active State detection */}
        <div className="hidden md:flex space-x-8 text-[11px] uppercase tracking-widest font-bold">
          <NavLink to="/" end className={getNavLinkClass}>Home</NavLink>
          <NavLink to="/fashion" className={getNavLinkClass}>Fashion</NavLink>
          <NavLink to="/food" className={getNavLinkClass}>GI Food</NavLink>
          <NavLink to="/crafts" className={getNavLinkClass}>Crafts</NavLink>
          <NavLink to="/about" className={getNavLinkClass}>Our Story</NavLink>
        </div>

        <div className="flex items-center space-x-4">
          {/* CART ICON BUTTON */}
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="p-2 text-stone-800 hover:brand-color transition relative"
          >
            <ShoppingBag size={24} strokeWidth={1.5} />
            <span className="absolute top-0 right-0 bg-[#A33B26] text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </button>

          <NavLink to="/login" className="hidden md:block brand-bg px-6 py-2 text-xs uppercase font-bold text-white hover:opacity-90 transition">
            Login
          </NavLink>

          {/* Mobile Toggle Button */}
          <button onClick={toggleMenu} className="md:hidden text-stone-800 p-2">
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* THE CART SIDEBAR COMPONENT */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}