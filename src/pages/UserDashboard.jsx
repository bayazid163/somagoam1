import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Heart, Settings, LogOut, MapPin, Star, X, ShieldCheck, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // --- INTEGRATION STATE ---
  const [user, setUser] = useState({ 
    displayName: "Collector", 
    firstName: "", 
    lastName: "", 
    email: "",
    address: "Savar, Dhaka Division, Bangladesh",
    memberSince: "...", 
    avatar: null 
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // 1. Fetch User Profile from dj-rest-auth
        const userRes = await axios.get('http://localhost:8000/dj-rest-auth/user/', {
          headers: { Authorization: `Token ${token}` }
        });
        
        const { first_name, last_name, email, date_joined, username, address } = userRes.data;

        setUser({
          displayName: `${first_name} ${last_name}`.trim() || username,
          firstName: first_name || "",
          lastName: last_name || "",
          email: email,
          address: address || "Savar, Dhaka Division, Bangladesh",
          memberSince: new Date(date_joined || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          avatar: null
        });

        // 2. Fetch Orders (Mock data for now)
        setOrders([
          { id: "SOMA-9921", date: "April 02, 2026", status: "In Transit", total: "৳ 25,620", item: "Premium Dhakai Jamdani" },
          { id: "SOMA-8812", date: "March 15, 2026", status: "Delivered", total: "৳ 1,420", item: "Traditional Roshmalai (2kg)" }
        ]);

      } catch (err) {
        console.error("Dashboard Sync Error:", err);
        if (err.response?.status === 401) handleSignOut();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.patch('http://localhost:8000/dj-rest-auth/user/', {
        first_name: user.firstName,
        last_name: user.lastName,
      }, {
        headers: { Authorization: `Token ${token}` }
      });

      if (response.status === 200) {
        setUser(prev => ({
          ...prev,
          displayName: `${response.data.first_name} ${response.data.last_name}`.trim() || response.data.username
        }));
        alert("Profile updated successfully!");
      }
    } catch (err) {
      alert("Failed to update profile details.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenReview = (order) => {
    setSelectedOrder(order);
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    alert("Thank you! Your verified heritage review has been submitted.");
    setIsReviewModalOpen(false);
    setRating(0);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
      <div className="animate-pulse serif text-[#A33B26]">Synchronizing Somagom Profile...</div>
    </div>
  );

  return (
    <div className="bg-[#F9F7F2] min-h-screen relative">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-6 py-10 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#A33B26]/10 rounded-full flex items-center justify-center text-2xl serif text-[#A33B26] uppercase">
              {user.displayName[0]}
            </div>
            <div>
              <h1 className="text-3xl serif">Welcome back, {user.displayName}</h1>
              <p className="text-xs uppercase tracking-widest text-stone-400 mt-1">Heritage Collector since {user.memberSince}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-700 hover:opacity-70 transition"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:px-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${activeTab === 'orders' ? 'bg-[#A33B26] text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>
            <Package size={18} /> My Orders
          </button>
          <button onClick={() => setActiveTab('wishlist')} className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${activeTab === 'wishlist' ? 'bg-[#A33B26] text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>
            <Heart size={18} /> Wishlist
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${activeTab === 'settings' ? 'bg-[#A33B26] text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>
            <Settings size={18} /> Account Settings
          </button>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="serif text-2xl mb-6">Recent Orders</h3>
              {orders.length > 0 ? orders.map((order) => (
                <div key={order.id} className="bg-white border border-stone-200 p-6 rounded-sm shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm mb-2 inline-block ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-[#A33B26]/5 text-[#A33B26]'}`}>
                      {order.status}
                    </span>
                    <h4 className="font-bold text-lg">{order.item}</h4>
                    <p className="text-xs text-stone-400">Order ID: {order.id} | Date: {order.date}</p>
                    
                    {order.status === "Delivered" && (
                      <button 
                        onClick={() => handleOpenReview(order)}
                        className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#A33B26] border border-[#A33B26] px-4 py-2 hover:bg-[#A33B26] hover:text-white transition rounded-sm"
                      >
                        <Star size={12} fill="currentColor" /> Rate Heritage Product
                      </button>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold mb-2">{order.total}</p>
                    <button className="text-[10px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-[#A33B26] hover:border-[#A33B26] transition">
                      View Invoice
                    </button>
                  </div>
                </div>
              )) : (
                <div className="bg-white p-10 text-center border border-dashed border-stone-300">
                  <p className="text-stone-400 italic">No heritage orders found yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white border border-stone-200 p-8">
              <h3 className="serif text-2xl mb-8">Account Details</h3>
              <form className="space-y-6 max-w-md" onSubmit={handleUpdateProfile}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">First Name</label>
                    <input 
                      className="w-full p-3 border border-stone-200 focus:border-[#A33B26] outline-none bg-stone-50" 
                      value={user.firstName}
                      onChange={(e) => setUser({...user, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">Last Name</label>
                    <input 
                      className="w-full p-3 border border-stone-200 focus:border-[#A33B26] outline-none bg-stone-50" 
                      value={user.lastName}
                      onChange={(e) => setUser({...user, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">Email Address</label>
                  <input className="w-full p-3 border border-stone-200 bg-stone-100 text-stone-500 outline-none cursor-not-allowed" value={user.email} readOnly />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">Shipping Address</label>
                  <div className="flex items-start gap-3 p-4 bg-stone-50 border border-stone-200 text-sm italic">
                    <MapPin size={18} className="text-[#A33B26]" />
                    {user.address}
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="bg-[#A33B26] text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsReviewModalOpen(false)} />
          <div className="relative bg-white w-full max-w-lg p-8 rounded-sm shadow-2xl animate-in zoom-in duration-300">
            <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900">
              <X size={24} />
            </button>
            <div className="text-center mb-8">
              <span className="text-[#A33B26] text-[10px] font-bold uppercase tracking-widest">Verified Buyer</span>
              <h2 className="serif text-3xl mt-2">Review Your {selectedOrder?.item}</h2>
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="flex flex-col items-center gap-3">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}>
                      <Star size={32} className={star <= (hover || rating) ? "text-[#A33B26]" : "text-stone-200"} fill={star <= (hover || rating) ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>
              <textarea name="reviewText" required rows="4" placeholder="Share your experience..." className="w-full p-4 border border-stone-200 bg-stone-50 focus:border-[#A33B26] outline-none text-sm italic" />
              <div className="p-4 bg-green-50 border border-green-100 rounded flex gap-3 items-center">
                <ShieldCheck size={20} className="text-green-700" />
                <p className="text-[10px] text-green-800 uppercase font-bold">GI Authentic Badge Protected</p>
              </div>
              <button type="submit" className="w-full bg-[#A33B26] text-white py-5 text-xs font-bold uppercase tracking-widest hover:opacity-95 transition">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}