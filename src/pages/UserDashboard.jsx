import React, { useState } from 'react';
import { Package, Heart, Settings, LogOut, MapPin, ShieldCheck } from 'lucide-react';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  // Mock Data for Marufa's Dashboard
  const user = {
    name: "Marufa",
    memberSince: "Nov 2025",
    avatar: null // Placeholder for profile pic
  };

  const orders = [
    { id: "SOMA-9921", date: "April 02, 2026", status: "In Transit", total: "৳ 25,620", item: "Premium Dhakai Jamdani" },
    { id: "SOMA-8812", date: "March 15, 2026", status: "Delivered", total: "৳ 1,420", item: "Traditional Roshmalai (2kg)" }
  ];

  return (
    <div className="bg-[#F9F7F2] min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-stone-200 px-6 py-10 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center text-2xl serif text-stone-400">
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
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${activeTab === 'orders' ? 'brand-bg text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}
          >
            <Package size={18} /> My Orders
          </button>
          <button 
            onClick={() => setActiveTab('wishlist')}
            className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${activeTab === 'wishlist' ? 'brand-bg text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}
          >
            <Heart size={18} /> Wishlist
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-widest transition ${activeTab === 'settings' ? 'brand-bg text-white' : 'bg-white text-stone-500 hover:bg-stone-50'}`}
          >
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
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A33B26] bg-[#A33B26]/5 px-2 py-1 rounded-sm mb-2 inline-block">
                      {order.status}
                    </span>
                    <h4 className="font-bold text-lg">{order.item}</h4>
                    <p className="text-xs text-stone-400">Order ID: {order.id} | Date: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold mb-2">{order.total}</p>
                    <button className="text-[10px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-[#A33B26] hover:border-[#A33B26] transition">
                      View Details
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
                  <input className="w-full p-3 border border-stone-200 focus:border-[#A33B26] outline-none" defaultValue={user.name} />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">Default Shipping Address</label>
                  <div className="flex items-start gap-3 p-4 bg-stone-50 border border-stone-200 text-sm italic">
                    <MapPin size={18} className="text-[#A33B26]" />
                    Update your shipping details for faster GI product delivery.
                  </div>
                </div>
                <button className="brand-bg text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90">
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}