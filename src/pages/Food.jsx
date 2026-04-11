import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
import roshmalai from '../assets/cumilla_roshmalai.png';
import bograrDahi from '../assets/Bograr_dahi.jpg';
import chomchom from '../assets/tangail_chomchom.jpg';
import ghee from '../assets/ghee.png';
import bhapa from '../assets/bhapa_pitha.png';
import patishapta from '../assets/Patishapta.png';
import payesh from '../assets/payesh.png';
import chitoi from '../assets/chitoi_pitha.jpg';
import ilish from '../assets/padma_ilish.jpg';
import himsagar from '../assets/himsagar.jpg';
import shatkora from '../assets/sylhet_shatkora.jpg';
import gur from '../assets/khejur_gur.jpg';
import achar from '../assets/achar.jpg';
import shutki from '../assets/shutki.png';
import mustardOil from '../assets/mustard-oil.jpg';

export default function Food() {
  const { addToCart } = useCart();

  const sections = [
    {
      title: "Short Shelf-Life",
      subtitle: "(3–5 Days)",
      warning: "Requires Refrigerated Storage & Quick Delivery",
      items: [
        { name: "Traditional Roshmalai", region: "Cumilla", img: roshmalai, badge: "LAB VERIFIED", price: "650", basePrice: 650, shelfLife: "perishable", unit: "/ kg", desc: "Ancient 'khira' reduction method. 100% pure cow milk.", rating: 5, reviewCount: 342 },
        { name: "Bogura Mishti Doi", region: "Bogura", img: bograrDahi, badge: "PURITY TESTED", price: "350", basePrice: 350, shelfLife: "perishable", unit: "/ Pot", desc: "Fermented in traditional clay pots for unique aroma.", rating: 5, reviewCount: 521 },
        { name: "Porabari Chomchom", region: "Tangail", img: chomchom, badge: "AUTHENTIC", price: "700", basePrice: 700, shelfLife: "perishable", unit: "/ kg", desc: "Famous 'King of Sweets' made with Dhaleshwari river water.", rating: 4, reviewCount: 128 },
        { name: "Premium Cow Ghee", region: "Pabna", img: ghee, badge: "100% PURE", price: "1750", basePrice: 1750, shelfLife: "stable", unit: "/ kg", desc: "Hand-churned ghee with rich granular texture.", rating: 5, reviewCount: 89 },
      ]
    }, 
    {
      title: "Ultra-Perishable",
      subtitle: "(Within 24 Hours)",
      warning: "Same-Day Delivery Only",
      items: [
        { name: "Fresh Bhapa Pitha", region: "Sylhet", img: bhapa, badge: "FRESH MADE", price: "50", basePrice: 50, shelfLife: "ultra-perishable", unit: "", desc: "Steamed rice cakes with liquid jaggery and coconut.", rating: 5, reviewCount: 960 },
        { name: "Patisapta Pitha", region: "Dhaka", img: patishapta, badge: "NO PRESERVATIVES", price: "150", basePrice: 150, shelfLife: "ultra-perishable", unit: "", desc: "Thin rice-flour crepes with luscious Kheer filling.", rating: 4, reviewCount: 74 },
        { name: "Traditional Payesh", region: "Munshiganj", img: payesh, badge: "PURE MILK", price: "200", basePrice: 200, shelfLife: "ultra-perishable", unit: "", desc: "Slow-cooked rice pudding using Gobindobhog rice.", rating: 5, reviewCount: 112 },
        { name: "Chitoi Pitha", region: "Chattogram", img: chitoi, badge: "AUTHENTIC", price: "100", basePrice: 100, shelfLife: "ultra-perishable", unit: "", desc: "Fluffy steamed cakes served with spicy bhortas.", rating: 4, reviewCount: 203 },
      ]
    }, 
    {
        title: "Fresh Produce",
        subtitle: "(GI Fruits & Fish)",
        warning: "Cold-Chain Required",
        items: [
          { name: "Padma Ilish", region: "Padma River", img: ilish, badge: "GI CERTIFIED", price: "1200", basePrice: 1200, shelfLife: "perishable", unit: "/ kg", desc: "The iconic Hilsa fish with unique flavor from Padma.", rating: 5, reviewCount: 1500 },
          { name: "Himsagar Pitha", region: "Rajshahi", img: himsagar, badge: "TRADITIONAL RECIPE", price: "80", basePrice: 80, shelfLife: "perishable", unit: "", desc: "Dense, sweet pitha soaked in thickened milk.", rating: 4, reviewCount: 32 },
          { name: "Sylhet Shatkora Pickle", region: "Sylhet", img: shatkora, badge: "HANDMADE", price: "250", basePrice: 250, shelfLife: "stable", unit: "/ jar", desc: "Tangy citrus pickle made with local shatkora fruit.", rating: 5, reviewCount: 86 }
        ]
    }, 
    {
        title: "Long Shelf-Life",
        subtitle: "(7–30 Days)",
        warning: "Suitable for International Shipping",
        items: [
            { name: "Khejur Gur", region: "Khulna", img: gur, badge: "100% NATURAL", price: "300", basePrice: 300, shelfLife: "stable", unit: "/ kg", desc: "Unrefined jaggery made from date palm sap.", rating: 5, reviewCount: 412 },
            { name: "Mixed Achar", region: "Chattogram", img: achar, badge: "GI CERTIFIED", price: "150", basePrice: 150, shelfLife: "stable", unit: "/ jar", desc: "Spicy mixed vegetable pickle with traditional spices.", rating: 4, reviewCount: 156 },
            { name: "Shutki", region: "Chattogram", img: shutki, badge: "AUTHENTIC", price: "500", basePrice: 500, shelfLife: "stable", unit: "/ kg", desc: "Sun-dried fish with intense flavor, a regional delicacy.", rating: 5, reviewCount: 94 },
            { name: "Mustard Oil", region: "Rangpur", img: mustardOil, badge: "GI CERTIFIED", price: "400", basePrice: 400, shelfLife: "stable", unit: "/ liter", desc: "Cold-pressed mustard oil with strong aroma and flavor.", rating: 5, reviewCount: 278 },
        ]
    } 
  ];

  // Component to handle pagination logic per section
  const PaginatedFoodGrid = ({ sectionItems }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sectionItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sectionItems.length / itemsPerPage);

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {currentItems.map((item, iIdx) => {
            const productSlug = item.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <div key={iIdx} className="food-card bg-white border border-stone-100 hover:border-[#A33B26] transition-all duration-300 group flex flex-col">
                <Link to={`/product/${productSlug}`} className="relative h-60 overflow-hidden block">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">{item.region}</div>
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-green-50 text-green-700 text-[9px] font-extrabold px-2 py-1 rounded">{item.badge}</span>
                    <span className="brand-color font-bold italic serif text-[10px]">GI Status</span>
                  </div>

                  <Link to={`/product/${productSlug}`}>
                    <h3 className="serif text-xl mb-2 hover:text-[#A33B26] transition-colors">{item.name}</h3>
                  </Link>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-[#A33B26]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < item.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-bold">
                      ({item.rating}.0) <span className="ml-1 font-normal italic">from {item.reviewCount} patrons</span>
                    </span>
                  </div>

                  <p className="text-stone-500 text-xs flex-grow mb-4">{item.desc}</p>
                  
                  <div className="pt-4 mt-auto border-t border-stone-100 flex justify-between items-center">
                    <span className="font-bold font-sans text-sm">৳ {item.price}{item.unit}</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => addToCart({ ...item, price: item.basePrice })}
                        className="brand-bg text-white px-3 py-2 text-[9px] uppercase font-bold tracking-widest hover:opacity-90 transition-opacity"
                      >
                        Order
                      </button>
                      <Link to={`/product/${productSlug}`} className="brand-color text-[9px] font-bold uppercase tracking-widest hover:underline">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Local Section Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-3">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 border border-stone-200 rounded-full disabled:opacity-20 hover:bg-stone-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
              Page {currentPage} / {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 border border-stone-200 rounded-full disabled:opacity-20 hover:bg-stone-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-[#F9F7F2]">
      {/* Header */}
      <header className="px-10 py-20 text-center">
        <span className="brand-color text-xs uppercase tracking-[0.4em] mb-4 block font-bold">The Taste of Tradition</span>
        <h1 className="text-5xl md:text-7xl serif mb-6">GI <span className="italic font-light">Food</span></h1>
        <p className="max-w-2xl mx-auto text-stone-500 text-sm leading-relaxed italic">
          "Authentic flavors from the specific regions of Bangladesh, verified for purity."
        </p>
      </header>

      {/* Dynamic Sections */}
      {sections.map((section, sIdx) => (
        <main key={sIdx} className="px-10 py-6">
          <div className="cat-header border-l-4 border-[#A33B26] pl-6 mb-8 mt-12">
            <h2 className="text-3xl serif">{section.title} <span className="text-sm font-sans font-light text-stone-400 ml-2">{section.subtitle}</span></h2>
            <p className={`text-xs uppercase tracking-widest font-semibold ${section.title === 'Ultra-Perishable' ? 'text-red-600' : 'text-stone-500'}`}>
              {section.warning}
            </p>
          </div>

          <PaginatedFoodGrid sectionItems={section.items} />
        </main>
      ))}

      {/* Safety Section */}
      <section className="mx-10 my-20 bg-stone-200/30 p-12 border border-stone-200 text-center">
        <h2 className="text-3xl serif mb-6">Your Safety is Our <span className="brand-color">Heritage</span></h2>
        <p className="text-stone-600 text-sm leading-loose max-w-2xl mx-auto mb-8">
          We eliminate fake products by connecting you directly to the original sweetsmiths (Moyras) and artisans.
        </p>
        <div className="flex flex-wrap justify-center gap-10">
          {['🔬 Lab Verified', '📦 Vacuum Sealed', '🌍 Global Express'].map((trait, tIdx) => (
            <div key={tIdx} className="flex items-center space-x-3">
              <span className="text-[10px] font-bold uppercase tracking-widest">{trait}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}