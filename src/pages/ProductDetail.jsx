import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // In a real app, you would fetch this data from an API based on the ID
  const product = {
    name: "Premium Dhakai Jamdani",
    price: "৳ 25,500",
    region: "Sonargaon, Narayanganj",
    category: "Textile",
    giStatus: "Certified (GI-01)",
    artisan: {
      name: "Master Weaver Abdul Jalil",
      experience: "45 Years",
      village: "South Noapara"
    },
    description: "This 200-count cotton Jamdani features the 'Panna Hajar' (thousand emeralds) motif. Hand-loomed over 3 months using the traditional 'Kandari' technique which has remained unchanged since the Mughal era.",
    specs: ["Material: 100% Fine Cotton", "Thread Count: 200", "Motif: Panna Hajar", "Weight: 450g"],
    shipping: "7-10 Days (Global Shipping Available)"
  };

  return (
    <div className="bg-[#F9F7F2] min-h-screen pb-20">
      {/* Breadcrumb */}
      <nav className="px-6 md:px-10 py-6 text-[10px] uppercase tracking-widest text-stone-400">
        <span className="cursor-pointer hover:text-[#A33B26]" onClick={() => navigate('/')}>Home</span> / 
        <span className="mx-2">{product.category}</span> / 
        <span className="text-stone-900 ml-2 font-bold">{product.name}</span>
      </nav>

      <div className="px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/5] bg-stone-200 overflow-hidden rounded-sm">
            <img 
              src={`https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-stone-300 cursor-pointer hover:opacity-80"></div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <span className="brand-color text-[10px] font-bold uppercase tracking-[0.3em]">{product.region}</span>
            <h1 className="text-4xl md:text-5xl serif mt-2 mb-4">{product.name}</h1>
            <p className="text-2xl font-light mb-8">{product.price}</p>
            
            <div className="space-y-6 text-stone-600 text-sm leading-relaxed mb-10">
              <p>{product.description}</p>
              <ul className="grid grid-cols-2 gap-y-2 border-t border-stone-200 pt-6">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#A33B26] rounded-full"></span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Selection & Action */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-stone-300 px-4 py-2">
                <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="px-2">-</button>
                <span className="px-4 font-bold">{quantity}</span>
                <button onClick={() => setQuantity(q => q+1)} className="px-2">+</button>
              </div>
              <button className="flex-grow brand-bg text-white font-bold uppercase tracking-widest text-xs py-4 hover:opacity-90 transition">
                Add to Collection
              </button>
            </div>

            {/* Heritage Sidebar (GI Info) */}
            <div className="bg-white border border-[#A33B26]/10 p-6 rounded-sm space-y-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="text-xl text-[#A33B26] pt-1">🔬</div>
                <div>
                  <h4 className="font-bold text-[11px] uppercase tracking-wider mb-1">GI Verification</h4>
                  <p className="text-[12px] text-stone-500">{product.giStatus} - Authenticated by Somagom Protocol.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-xl text-[#A33B26] pt-1">👨‍🎨</div>
                <div>
                  <h4 className="font-bold text-[11px] uppercase tracking-wider mb-1">Meet the Artisan</h4>
                  <p className="text-[12px] text-stone-500">{product.artisan.name}, a veteran from {product.artisan.village}.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-xl text-[#A33B26] pt-1">🚚</div>
                <div>
                  <h4 className="font-bold text-[11px] uppercase tracking-wider mb-1">Shipping Estimate</h4>
                  <p className="text-[12px] text-stone-500">{product.shipping}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}