import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-[#F9F7F2] p-10 flex flex-col space-y-8 text-2xl serif transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <button onClick={toggleMenu} className="absolute top-8 right-10 text-stone-500 text-4xl">
          <X size={40} />
        </button>
        <a href="/" className="brand-color" onClick={toggleMenu}>Home</a>
        <a href="/fashion" onClick={toggleMenu}>Fashion</a>
        <a href="/food" onClick={toggleMenu}>GI Food</a>
        <a href="/crafts" onClick={toggleMenu}>Crafts</a>
        <a href="/about" onClick={toggleMenu}>Our Story</a>
        <hr className="border-stone-200" />
        <a href="/login" className="text-sm uppercase tracking-widest font-bold">Login / Account</a>
      </div>

      {/* Main Navigation */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-6 sticky top-0 z-50 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-stone-200">
        <div className="logo-box brand-color">
          <div className="text-xl serif tracking-tighter">SOMAGOM</div>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-[11px] uppercase tracking-widest font-bold text-stone-500">
          <a href="/" className="brand-color">Home</a>
          <a href="/fashion" className="hover:brand-color transition">Fashion</a>
          <a href="/food" className="hover:brand-color transition">GI Food</a>
          <a href="/crafts" className="hover:brand-color transition">Crafts</a>
          <a href="/about" className="hover:brand-color transition">Our Story</a>
        </div>

        <div className="flex items-center space-x-4">
          <a href="/login" className="hidden md:block brand-bg px-6 py-2 text-xs uppercase font-bold text-white hover:opacity-90 transition">
            Login
          </a>
          {/* Mobile Toggle Button */}
          <button onClick={toggleMenu} className="md:hidden text-stone-800 p-2">
            <Menu size={32} />
          </button>
        </div>
      </nav>
    </>
  );
}