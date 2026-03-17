import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Assets
import logo from '../assets/logo.png';
import mapBg from '../assets/map.png';

export default function Register() {
  const [role, setRole] = useState('customer');

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fcf8f7] relative px-5 py-10">
      {/* Background Map Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.15] z-0"
        style={{ 
          backgroundImage: `url(${mapBg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      ></div>

      <div className="bg-white w-full max-w-[500px] p-8 md:p-10 rounded-[24px] shadow-lg border border-[#A33B26]/10 z-10">
        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src={logo} alt="Logo" className="w-[45px] h-auto" />
          <h1 className="font-['Great_Vibes'] text-[#A33B26] text-4xl leading-none">Somagom</h1>
        </div>

        <h2 className="font-['Great_Vibes'] text-3xl text-[#333] text-center mb-1">Join Us</h2>
        <p className="text-center text-[#888] text-[11px] tracking-widest uppercase mb-8">Create your account</p>

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Full Name */}
          <div className="relative mb-6">
            <label className="absolute -top-[9px] left-[15px] bg-white px-2 text-[11px] font-semibold text-[#A33B26] uppercase tracking-wider z-10">
              Full Name
            </label>
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#A33B26]">
              <i className="fa-regular fa-user"></i>
            </span>
            <input 
              type="text" 
              placeholder="full name"
              className="w-full py-4 pl-12 pr-4 border border-[#e0c8c4] rounded-xl outline-none focus:border-[#A33B26] transition-all"
              required 
            />
          </div>

          {/* Email/Phone */}
          <div className="relative mb-6">
            <label className="absolute -top-[9px] left-[15px] bg-white px-2 text-[11px] font-semibold text-[#A33B26] uppercase tracking-wider z-10">
              Email or Phone
            </label>
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#A33B26]">
              <i className="fa-regular fa-envelope"></i>
            </span>
            <input 
              type="text" 
              placeholder="email@example.com / +880..."
              className="w-full py-4 pl-12 pr-4 border border-[#e0c8c4] rounded-xl outline-none focus:border-[#A33B26] transition-all"
              required 
            />
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <label className="absolute -top-[9px] left-[15px] bg-white px-2 text-[11px] font-semibold text-[#A33B26] uppercase tracking-wider z-10">
              Password
            </label>
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#A33B26]">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input 
              type="password" 
              placeholder="••••••••••••"
              className="w-full py-4 pl-12 pr-4 border border-[#e0c8c4] rounded-xl outline-none focus:border-[#A33B26] transition-all"
              required 
            />
          </div>

          {/* Role Selection */}
          <div className="relative mb-6">
            <label className="absolute -top-[9px] left-[15px] bg-white px-2 text-[11px] font-semibold text-[#A33B26] uppercase tracking-wider z-10">
              Register As
            </label>
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#A33B26]">
              <i className="fa-solid fa-user-tag"></i>
            </span>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full py-4 pl-12 pr-4 border border-[#e0c8c4] rounded-xl outline-none bg-transparent appearance-none"
              required
            >
              <option value="customer">Customer</option>
              <option value="producer">Producer</option>
            </select>
          </div>

          {/* Producer Specific Fields (Conditional Rendering) */}
          {role === 'producer' && (
            <div className="border-l-4 border-[#A33B26] pl-4 mb-6 animate-[fadeIn_0.4s_ease-in-out]">
              <div className="relative mb-4">
                <label className="absolute -top-[9px] left-[15px] bg-white px-2 text-[11px] font-semibold text-[#A33B26] uppercase tracking-wider z-10">
                  Business / Craft Name *
                </label>
                <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#A33B26]">
                  <i className="fa-solid fa-shop"></i>
                </span>
                <input 
                  type="text" 
                  placeholder="e.g. Jamdani Crafts"
                  className="w-full py-4 pl-12 pr-4 border border-[#e0c8c4] rounded-xl outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <span className="text-[11px] text-stone-500 font-bold uppercase block mb-1">Legal Document (Trade License)</span>
                <input type="file" className="text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#A33B26]/10 file:text-[#A33B26] hover:file:bg-[#A33B26]/20" />
              </div>
            </div>
          )}

          <button type="submit" className="w-full py-4 bg-[#A33B26] text-white rounded-xl font-bold tracking-widest hover:bg-[#802e1e] transition-all active:scale-95">
            CREATE ACCOUNT
          </button>
        </form>

        <p className="text-center text-sm text-stone-500 mt-6">
          Already have an account? <Link to="/login" className="text-[#A33B26] font-bold">Login Now</Link>
        </p>
      </div>
    </div>
  );
}