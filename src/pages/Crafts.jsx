import React from 'react';

// Import images (Ensure these are in src/assets)
import shataranji from '../assets/shataranji.png';
import nakshiKatha from '../assets/nakshi_katha.jpg';
import shitalPati from '../assets/shital_pati.jpg';
import pottery from '../assets/pottery.jpg';
import bamboo from '../assets/bamboo_craft.jpeg';
import metal from '../assets/metal_craft.png';
import wood from '../assets/wood_craving.jpg';
import jute from '../assets/jute_craft.jpg';
import jewelry from '../assets/trival_jewallary.jpg';
import craftStory from '../assets/craft_story.jpg';

export default function Crafts() {
  const crafts = [
    { name: "Jessore Shotoronji", region: "Jessore", img: shataranji, status: "GI Status", type: "Textile Craft", price: "৳ 3,500 – 35,000", desc: "Traditional hand-woven floor mats featuring rhythmic patterns and organic dyes." },
    { name: "Nakshi Kantha", region: "Mymensingh", img: nakshiKatha, status: "GI Status", type: "Textile Craft", price: "৳ 3,000 – 50,000+", desc: "Hand-embroidered quilts telling stories of rural life through every stitch." },
    { name: "Shital Pati", region: "Sylhet", img: shitalPati, status: "GI Status", type: "Cane Craft", price: "৳ 2,500 – 20,000", desc: "Cool-feeling mats hand-woven from Murta cane, recognized by UNESCO." },
    { name: "Heritage Pottery", region: "Dhamrai", img: pottery, status: "Local Heritage", type: "Clay Craft", price: "৳ 300 – 5,000", desc: "Terracotta and glazed clay work crafted using ancient wood-fired kilns." },
    { name: "Bamboo & Cane", region: "Sylhet", img: bamboo, status: "Local Heritage", type: "Utility Craft", price: "৳ 500 – 25,000", desc: "Sustainable utility items, from baskets to sophisticated home decor." },
    { name: "Brass & Bell Metal", region: "Dhamrai", img: metal, status: "Local Heritage", type: "Metal Craft", price: "৳ 2,000 – 40,000", desc: "Lost-wax casting method used to create royal tableware and statues." },
    { name: "Wood Carving", region: "Dinajpur", img: wood, status: "Local Heritage", type: "Wood Craft", price: "৳ 1,500 – 60,000", desc: "Intricate relief carving on seasoned wood for traditional doors." },
    { name: "Jute Handicrafts", region: "Faridpur", img: jute, status: "Local Heritage", type: "Eco Craft", price: "৳ 300 – 8,000", desc: "Biodegradable fashion bags and home textiles from the 'Golden Fiber'." },
    { name: "Tribal Handicrafts", region: "Hill Tracts", img: jewelry, status: "Local Heritage", type: "Ethnic Craft", price: "৳ 800 – 20,000", desc: "Traditional jewelry reflecting the diverse ethnic groups of CHT." },
  ];

  return (
    <div className="bg-[#F9F7F2]">
      {/* Header */}
      <header className="px-10 py-20 text-center">
        <span className="brand-color text-xs uppercase tracking-[0.4em] mb-4 block">Handmade in Bangladesh</span>
        <h1 className="text-5xl md:text-7xl serif mb-6">Artisanal <span className="italic font-light">Crafts</span></h1>
        <p className="max-w-2xl mx-auto text-stone-500 text-sm leading-relaxed italic">
          "Preserving the soul of rural artistry through authentic, Geographical Indication (GI) certified handiwork."
        </p>
      </header>

      {/* Main Grid */}
      <main className="px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {crafts.map((item, index) => (
            <div key={index} className="bg-white border border-stone-100 hover:border-[#A33B26] transition-all duration-500 transform hover:-translate-y-2 flex flex-col group">
              <div className="relative h-72 overflow-hidden">
                <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">{item.region}</div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[8px] font-extrabold px-2 py-1 rounded uppercase tracking-wider ${item.status === 'GI Status' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {item.status}
                  </span>
                  <span className="brand-color font-bold italic serif text-[11px]">{item.type}</span>
                </div>
                <h3 className="text-2xl serif mb-3">{item.name}</h3>
                <p className="text-stone-500 text-xs leading-relaxed flex-grow">{item.desc}</p>
                <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
                  <span className="text-lg font-light">{item.price}</span>
                  <button className="brand-color text-[10px] font-bold uppercase tracking-widest hover:underline">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Artisan Spotlight */}
      <section className="mx-10 my-20 bg-stone-100 p-12 flex flex-col md:flex-row items-center gap-12 border border-stone-200">
        <div className="md:w-1/3">
          <img src={craftStory} className="w-full grayscale rounded-sm shadow-xl" alt="Artisan hands" />
        </div>
        <div className="md:w-2/3">
          <span className="brand-color text-xs uppercase tracking-[0.3em] font-bold">Artisan Spotlight</span>
          <h2 className="text-4xl serif mt-2 mb-6">The Hands Behind the Craft</h2>
          <p className="text-stone-600 leading-relaxed mb-6 italic">
            From Jessore’s Shotoronji looms to Sylhet’s Shital Pati mats, every craft is shaped by skilled hands and inherited knowledge.
          </p>
          <button className="brand-bg text-white px-8 py-3 text-[10px] uppercase font-bold tracking-widest transition hover:opacity-90">
            Read Their Stories
          </button>
        </div>
      </section>
    </div>
  );
}