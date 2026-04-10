import React, { useState } from 'react';
import { Package, Heart, Settings, LogOut, MapPin, Star, X, Camera, ShieldCheck } from 'lucide-react';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const user = {
    name: "Marufa",
    memberSince: "Nov 2025",
    avatar: null
  };

  const orders = [
    { id: "SOMA-9921", date: "April 02, 2026", status: "In Transit", total: "৳ 25,620", item: "Premium Dhakai Jamdani" },
    { id: "SOMA-8812", date: "March 15, 2026", status: "Delivered", total: "৳ 1,420", item: "Traditional Roshmalai (2kg)" }
  ];

  const handleOpenReview = (order) => {
    setSelectedOrder(order);
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Logic for Axios POST request would go here
    console.log(`Review submitted for ${selectedOrder.id}: ${rating} Stars`);
    setIsReviewModalOpen(false);
    setRating(0);
    alert("Thank you! Your verified heritage review has been submitted.");
  };

  return (
    <div className="bg-[#F9F7F2] min-h-screen relative">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-stone-200 px-6 py-10 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center text-2xl serif text-stone-400 uppercase">
              {user.name[0]}
            </div>
            <div>
              <h1 className="text-3xl serif">Welcome back, {user.name}</h1>
              <p className="text-xs uppercase tracking-widest text-stone-400 mt-1">Heritage Collector since {user.memberSince}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-700 hover:opacity-70 transition">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:px-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2">
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${activeTab === 'orders' ? 'brand-bg text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>
            <Package size={18} /> My Orders
          </button>
          <button onClick={() => setActiveTab('wishlist')} className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${activeTab === 'wishlist' ? 'brand-bg text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>
            <Heart size={18} /> Wishlist
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${activeTab === 'settings' ? 'brand-bg text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}>
            <Settings size={18} /> Account Settings
          </button>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="serif text-2xl mb-6">Recent Orders</h3>
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-stone-200 p-6 rounded-sm shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm mb-2 inline-block ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-[#A33B26]/5 text-[#A33B26]'}`}>
                      {order.status}
                    </span>
                    <h4 className="font-bold text-lg">{order.item}</h4>
                    <p className="text-xs text-stone-400">Order ID: {order.id} | Date: {order.date}</p>
                    
                    {/* TRIGGER RATING BUTTON */}
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
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white border border-stone-200 p-8">
              <h3 className="serif text-2xl mb-8">Account Details</h3>
              <form className="space-y-6 max-w-md">
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">Display Name</label>
                  <input className="w-full p-3 border border-stone-200 focus:border-[#A33B26] outline-none bg-stone-50" defaultValue={user.name} />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">Default Shipping Address</label>
                  <div className="flex items-start gap-3 p-4 bg-stone-50 border border-stone-200 text-sm italic">
                    <MapPin size={18} className="text-[#A33B26]" />
                    Savar, Dhaka Division, Bangladesh (Update for faster delivery)
                  </div>
                </div>
                <button className="brand-bg text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* --- PREMIUM REVIEW MODAL --- */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setIsReviewModalOpen(false)} />
          <div className="relative bg-white w-full max-w-lg p-8 rounded-sm shadow-2xl animate-in zoom-in duration-300">
            <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900">
              <X size={24} />
            </button>
            
            <div className="text-center mb-8">
              <span className="text-[#A33B26] text-[10px] font-bold uppercase tracking-widest">Post-Purchase Review</span>
              <h2 className="serif text-3xl mt-2">Rate Your {selectedOrder?.item}</h2>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Star Rating Selection */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] uppercase font-bold text-stone-400">Your Rating</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="transition-transform hover:scale-125"
                    >
                      <Star
                        size={32}
                        className={star <= (hover || rating) ? "text-[#A33B26]" : "text-stone-200"}
                        fill={star <= (hover || rating) ? "currentColor" : "none"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">Share your experience</label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Tell us about the weave, the texture, or the taste..."
                  className="w-full p-4 border border-stone-200 bg-stone-50 focus:border-[#A33B26] outline-none text-sm resize-none italic"
                />
              </div>

              <div className="p-4 bg-green-50 border border-green-100 rounded flex gap-3 items-center">
                <ShieldCheck size={20} className="text-green-700" />
                <p className="text-[10px] text-green-800 leading-tight uppercase font-bold">
                  As a verified buyer, your review will receive the "GI Authentic" badge on our public page.
                </p>
              </div>

              <button type="submit" className="w-full brand-bg text-white py-5 text-xs font-bold uppercase tracking-widest hover:opacity-95 transition shadow-lg">
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}