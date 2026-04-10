import React, { useState } from 'react';
import { Star, MessageSquare, ShieldCheck, Camera, User } from 'lucide-react';

export default function Reviews() {
  // Using useState to hold our heritage review data
  const [reviews] = useState([
    {
      id: 1,
      user: "Anika T.",
      product: "Premium Dhakai Jamdani",
      rating: 5,
      date: "March 20, 2026",
      comment: "The weave is incredibly fine. You can really tell the difference with a GI-certified product. The packaging was also very elegant.",
      location: "Dhaka",
      verified: true
    },
    {
      id: 2,
      user: "Rahat M.",
      product: "Traditional Roshmalai",
      rating: 4,
      date: "April 02, 2026",
      comment: "Delivered chilled and fresh to my door in Sylhet. Tastes just like the ones I used to have in Cumilla during my childhood.",
      location: "Sylhet",
      verified: true
    }
  ]);

  return (
    <div className="bg-[#F9F7F2] min-h-screen py-16 px-6 md:px-20">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl serif mb-4 text-stone-900">Heritage Voices</h1>
        <p className="text-[#A33B26] uppercase tracking-[0.2em] text-[10px] font-bold">
          Authentic Experiences from our Global Community
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Summary Stats */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-stone-200 p-8 sticky top-28 shadow-sm rounded-sm">
            <h3 className="serif text-2xl mb-4">Overall Rating</h3>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-[#A33B26]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < 4 ? "currentColor" : "none"} className="text-[#A33B26]" />
                ))}
              </div>
              <span className="font-bold text-lg text-stone-800">4.9 / 5.0</span>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed mb-8">
              Based on 1,240 verified purchases. Every review is checked against our GI-Traceability protocol to ensure Somagom authenticity.
            </p>
            <button className="w-full brand-bg text-white py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition flex items-center justify-center gap-2">
              <MessageSquare size={16} /> Share Your Story
            </button>
          </div>
        </div>

        {/* Right Column: Review Feed */}
        <div className="lg:col-span-2 space-y-8">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white border border-stone-200 p-8 rounded-sm shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                    <User size={24} />
                  </div>
                  <div>
                    <div className="flex text-[#A33B26] mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <h4 className="font-bold text-stone-900">{rev.user}</h4>
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                      {rev.location} • {rev.date}
                    </p>
                  </div>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter text-green-700 bg-green-50 px-2 py-1 border border-green-100">
                    <ShieldCheck size={12} /> GI Verified Buyer
                  </div>
                )}
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase text-[#A33B26] bg-[#A33B26]/5 px-2 py-1 border border-[#A33B26]/10">
                  {rev.product}
                </span>
              </div>

              <p className="text-stone-600 leading-relaxed italic text-sm">
                "{rev.comment}"
              </p>
              
              <div className="mt-6 flex gap-4">
                 <div className="w-16 h-16 bg-stone-50 rounded-sm flex items-center justify-center border border-dashed border-stone-200">
                    <Camera size={18} className="text-stone-300" />
                 </div>
                 <div className="flex-grow flex items-center">
                    <p className="text-[10px] text-stone-400 font-medium italic">
                      User-uploaded image verified by Somagom IT Crew
                    </p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}