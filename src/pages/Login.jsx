import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Import your assets
import logo from '../assets/logo.png';
import mapBg from '../assets/map.png';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State for credentials
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  // Django Login Integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/dj-rest-auth/login/', {
        // IMPORTANT: Because Bayazid set USERNAME_FIELD = 'email', 
        // Django expects the email value inside the 'username' key.
        username: credentials.email, 
        password: credentials.password
      });

      if (response.status === 200) {
        // Save the token (handles 'key' for TokenAuth or 'access' for JWT)
        const token = response.data.key || response.data.access;
        localStorage.setItem('token', token);
        
        // Optional: Save user details if returned
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        navigate('/dashboard'); 
      }
    } catch (err) {
      const serverError = err.response?.data;
      // Provide specific feedback if the backend sends it, otherwise default
      if (serverError?.non_field_errors) {
        setError(serverError.non_field_errors[0]);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fcf8f7] relative px-5">
      {/* Background Map Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.15] z-0"
        style={{ backgroundImage: `url(${mapBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>

      <div className="bg-white w-full max-w-[450px] p-10 md:p-12 rounded-[24px] shadow-lg border border-[#A33B26]/10 z-10">
        {/* Brand Logo */}
        <div className="flex items-center justify-center gap-1 mb-2">
          <img src={logo} alt="Logo" className="w-[50px] h-auto" />
          <h1 className="font-['Great_Vibes'] text-[#A33B26] text-4xl leading-none">Somagom</h1>
        </div>

        <h2 className="font-['Great_Vibes'] text-3xl text-[#333] text-center mb-1">Welcome</h2>
        <p className="text-center text-[#888] text-[11px] tracking-widest uppercase mb-8">Secure Login</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-[11px] font-bold uppercase">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="relative mb-6">
            <label className="absolute -top-[9px] left-[15px] bg-white px-2 text-[11px] font-semibold text-[#A33B26] uppercase tracking-wider z-10">
              Email Address
            </label>
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#A33B26]">
              <i className="fa-regular fa-envelope"></i>
            </span>
            <input 
              type="email" 
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="w-full py-4 pl-12 pr-4 border border-[#e0c8c4] rounded-xl outline-none focus:border-[#A33B26] focus:ring-4 focus:ring-[#A33B26]/5 transition-all"
              required 
            />
          </div>

          {/* Password Field */}
          <div className="relative mb-6">
            <label className="absolute -top-[9px] left-[15px] bg-white px-2 text-[11px] font-semibold text-[#A33B26] uppercase tracking-wider z-10">
              Password
            </label>
            <span className="absolute left-[18px] top-1/2 -translate-y-1/2 text-[#A33B26]">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input 
              type="password" 
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              className="w-full py-4 pl-12 pr-4 border border-[#e0c8c4] rounded-xl outline-none focus:border-[#A33B26] focus:ring-4 focus:ring-[#A33B26]/5 transition-all"
              required 
            />
          </div>

          <div className="flex justify-end mb-6">
             <button type="button" className="text-[12px] text-stone-400 hover:text-[#A33B26] transition-colors">
               Forgot password?
             </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 bg-[#A33B26] text-white rounded-xl font-bold tracking-widest transition-transform active:scale-95 shadow-md ${loading ? 'opacity-50' : 'hover:bg-[#802e1e]'}`}
          >
            {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-1 border-b border-stone-100"></div>
          <span className="px-3 text-[10px] text-stone-400 font-bold uppercase tracking-widest">Or continue with</span>
          <div className="flex-1 border-b border-stone-100"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex gap-4 mb-8">
          <button type="button" className="flex-1 h-12 border border-stone-100 rounded-xl flex items-center justify-center hover:bg-stone-50 transition-colors gap-2">
            <i className="fab fa-google text-[#DB4437]"></i>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">Google</span>
          </button>
          <button type="button" className="flex-1 h-12 border border-stone-100 rounded-xl flex items-center justify-center hover:bg-stone-50 transition-colors gap-2">
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