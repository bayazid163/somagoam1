import React from 'react';
import { Link } from 'react-router-dom';
// Import your assets
import logo from '../assets/logo.png';
import mapBg from '../assets/map.png';

export default function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fcf8f7] relative px-5">
      {/* Background Map Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.15] z-0"
        style={{ 
          backgroundImage: `url(${mapBg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      ></div>

      <div className="bg-white w-full max-w-[450px] p-10 md:p-12 rounded-[24px] shadow-lg border border-[#A33B26]/10 z-10">
        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-1 mb-2">
          <img src={logo} alt="Logo" className="w-[50px] h-auto" />
          <h1 className="font-['Great_Vibes'] text-[#A33B26] text-4xl leading-none">Somagom</h1>
        </div>

        <h2 className="font-['Great_Vibes'] text-3xl text-[#333] text-center mb-1">Welcome</h2>
        <p className="text-center text-[#888] text-[11px] tracking-widest uppercase mb-8">Secure Login</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="relative mb-6">
            <label className="absolute -top-[9px] left-[15px] bg-white px-2 text-[11px] font-semibold text-[#A33B26] uppercase tracking-wider">
              Email Address
            </label>
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#A33B26]">
              <i className="fa-regular fa-envelope"></i>
            </span>
            <input 
              type="email" 
              placeholder="email@example.com"
              className="w-full py-4 pl-12 pr-4 border border-[#e0c8c4] rounded-xl outline-none focus:border-[#A33B26] focus:ring-4 focus:ring-[#A33B26]/5 transition-all"
              required 
            />
          </div>

          <div className="relative mb-6">
            <label className="absolute -top-[9px] left-[15px] bg-white px-2 text-[11px] font-semibold text-[#A33B26] uppercase tracking-wider">
              Password
            </label>
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#A33B26]">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input 
              type="password" 
              placeholder="••••••••••••"
              className="w-full py-4 pl-12 pr-4 border border-[#e0c8c4] rounded-xl outline-none focus:border-[#A33B26] focus:ring-4 focus:ring-[#A33B26]/5 transition-all"
              required 
            />
          </div>

          <div className="relative mb-4">
            <label className="absolute -top-[9px] left-[15px] bg-white px-2 text-[11px] font-semibold text-[#A33B26] uppercase tracking-wider">
              Role
            </label>
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#A33B26]">
              <i className="fa-solid fa-user-tag"></i>
            </span>
            <select className="w-full py-4 pl-12 pr-4 border border-[#e0c8c4] rounded-xl outline-none appearance-none bg-transparent">
              <option value="consumer">Consumer</option>
              <option value="producer">Producer</option>
            </select>
          </div>

          <a href="#" className="block text-right text-[12px] text-stone-400 mb-6 hover:text-[#A33B26]">Forgot password?</a>

          <button type="submit" className="w-full py-4 bg-[#A33B26] text-white rounded-xl font-bold tracking-widest hover:bg-[#802e1e] transition-transform active:scale-95 shadow-md">
            SIGN IN
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-1 border-b border-stone-100"></div>
          <span className="px-3 text-[10px] text-stone-400 font-bold uppercase tracking-widest">Or continue with</span>
          <div className="flex-1 border-b border-stone-100"></div>
        </div>

        {/* Updated Social Login: Apple Removed */}
        <div className="flex gap-4 mb-8">
          <button className="flex-1 h-12 border border-stone-100 rounded-xl flex items-center justify-center hover:bg-stone-50 transition-colors gap-2">
            <i className="fab fa-google text-[#DB4437]"></i>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">Google</span>
          </button>
          <button className="flex-1 h-12 border border-stone-100 rounded-xl flex items-center justify-center hover:bg-stone-50 transition-colors gap-2">
            <i className="fab fa-facebook-f text-[#4267B2]"></i>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">Facebook</span>
          </button>
        </div>

        <p className="text-center text-sm text-stone-500">
          New here? <Link to="/register" className="text-[#A33B26] font-bold">Create an Account</Link>
        </p>
      </div>
    </div>
  );
}