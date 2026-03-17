import React from 'react';
import { Link } from 'react-router-dom';

// Import images (Ensure these paths match your src/assets folder)
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
  const sections = [
    {
      title: "Short Shelf-Life",
      subtitle: "(3–5 Days)",
      warning: "Requires Refrigerated Storage & Quick Delivery",
      items: [
        { name: "Traditional Roshmalai", region: "Cumilla", img: roshmalai, badge: "LAB VERIFIED", price: "650", unit: "/ kg", desc: "Ancient 'khira' reduction method. 100% pure cow milk." },
        { name: "Bogura Mishti Doi", region: "Bogura", img: bograrDahi, badge: "PURITY TESTED", price: "350", unit: "/ Pot", desc: "Fermented in traditional clay pots for unique aroma." },
        { name: "Porabari Chomchom", region: "Tangail", img: chomchom, badge: "AUTHENTIC", price: "700", unit: "/ kg", desc: "Famous 'King of Sweets' made with Dhaleshwari river water." },
        { name: "Premium Cow Ghee", region: "Pabna", img: ghee, badge: "100% PURE", price: "1750", unit: "/ kg", desc: "Hand-churned ghee with rich granular texture." },
      ]
    }, 
    {
      title: "Ultra-Perishable",
      subtitle: "(Within 24 Hours)",
      warning: "Same-Day Delivery Only",
      items: [
        { name: "Fresh Bhapa Pitha", region: "Sylhet", img: bhapa, badge: "FRESH MADE", price: "50", unit: "", desc: "Steamed rice cakes with liquid jaggery and coconut." },
        { name: "Patisapta Pitha", region: "Dhaka", img: patishapta, badge: "NO PRESERVATIVES", price: "150", unit: "", desc: "Thin rice-flour crepes with luscious Kheer filling." },
        { name: "Traditional Payesh", region: "Munshiganj", img: payesh, badge: "PURE MILK", price: "200", unit: "", desc: "Slow-cooked rice pudding using Gobindobhog rice." },
        { name: "Chitoi Pitha", region: "Chattogram", img: chitoi, badge: "AUTHENTIC", price: "100", unit: "", desc: "Fluffy steamed cakes served with spicy bhortas." },
      ]
    }, 
    {
        title: "Fresh Produce",
        subtitle: "(GI Fruits & Fish)",
        warning: "Cold-Chain Required",
        items: [
          { name: "Padma Ilish", region: "Padma River", img: ilish, badge: "GI CERTIFIED", price: "1200", unit: "/ kg", desc: "The iconic Hilsa fish with unique flavor from Padma." },
          { name: "Himsagar Pitha", region: "Rajshahi", img: himsagar, badge: "TRADITIONAL RECIPE", price: "80", unit: "", desc: "Dense, sweet pitha soaked in thickened milk." },
          { name: "Sylhet Shatkora Pickle", region: "Sylhet", img: shatkora, badge: "HANDMADE", price: "250", unit: "/ jar", desc: "Tangy citrus pickle made with local shatkora fruit." }
        ]
    }, 
    {
        title: "Long Shelf-Life",
        subtitle: "(7–30 Days)",
        warning: "Suitable for International Shipping",
        items: [
            { name: "Khejur Gur", region: "Khulna", img: gur, badge: "100% NATURAL", price: "300", unit: "/ kg", desc: "Unrefined jaggery made from date palm sap." },
            { name: "Mixed Achar", region: "Chattogram", img: achar, badge: "GI CERTIFIED", price: "150", unit: "/ jar", desc: "Spicy mixed vegetable pickle with traditional spices." },
            { name: "Shutki", region: "Chattogram", img: shutki, badge: "AUTHENTIC", price: "500", unit: "/ kg", desc: "Sun-dried fish with intense flavor, a regional delicacy." },
            { name: "Mustard Oil", region: "Rangpur", img: mustardOil, badge: "GI CERTIFIED", price: "400", unit: "/ liter", desc: "Cold-pressed mustard oil with strong aroma and flavor." },
        ]
    } 
  ];

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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {section.items.map((item, iIdx) => {
              const productSlug = item.name.toLowerCase().replace(/\s+/g, '-');
              
              return (
                <div key={iIdx} className="food-card bg-white border border-stone-100 hover:border-[#A33B26] transition-all duration-300 group flex flex-col">
                  
                  {/* Clickable Image Section */}
                  <Link to={`/product/${productSlug}`} className="relative h-60 overflow-hidden block">
                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">{item.region}</div>
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-green-50 text-green-700 text-[9px] font-extrabold px-2 py-1 rounded">{item.badge}</span>
                      <span className="brand-color font-bold italic serif text-[10px]">GI Status</span>
                    </div>

                    {/* Clickable Title */}
                    <Link to={`/product/${productSlug}`}>
                      <h3 className="serif text-xl mb-2 hover:text-[#A33B26] transition-colors">{item.name}</h3>
                    </Link>

                    <p className="text-stone-500 text-xs flex-grow">{item.desc}</p>
                    
                    <div className="pt-4 mt-4 border-t border-stone-100 flex justify-between items-center">
                      <span className="font-bold font-sans text-sm">৳ {item.price}{item.unit}</span>
                      <Link 
                        to={`/product/${productSlug}`} 
                        className="brand-color text-[10px] font-bold uppercase tracking-widest hover:underline"
                      >
                        Order
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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