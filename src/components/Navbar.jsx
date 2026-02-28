export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-10 py-6 sticky top-0 z-50 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-stone-200">
      
      <div className="logo-box brand-color">
        <div className="text-xl serif tracking-tighter">SOMAGOM</div>
      </div>

      <div className="hidden md:flex space-x-8 text-[11px] uppercase tracking-widest font-bold text-stone-500">
        <a href="#" className="brand-color">Home</a>
        <a href="fashion.html">Fashion</a>
        <a href="food.html">GI Food</a>
        <a href="craft.html">Crafts</a>
        <a href="about.html">Our Story</a>
      </div>

      <div className="flex items-center space-x-4">
        <a href="login.html" className="hidden md:block brand-bg px-6 py-2 text-xs uppercase font-bold text-white">
          Login
        </a>

        <button id="open-menu" className="md:hidden text-stone-800 p-2">
          ☰
        </button>
      </div>

    </nav>
  );
}