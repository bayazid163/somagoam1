import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Import images
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
  const { addToCart } = useCart();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Data array with rating and reviewCount added
  const crafts = [
    { name: "Jessore Shotoronji", region: "Jessore", img: shataranji, status: "GI Status", type: "Textile Craft", price: "৳ 3,500", basePrice: 3500, rating: 5, reviewCount: 42, desc: "Traditional hand-woven floor mats featuring rhythmic patterns and organic dyes." },
    { name: "Nakshi Kantha", region: "Mymensingh", img: nakshiKatha, status: "GI Status", type: "Textile Craft", price: "৳ 3,000", basePrice: 3000, rating: 5, reviewCount: 156, desc: "Hand-embroidered quilts telling stories of rural life through every stitch." },
    { name: "Shital Pati", region: "Sylhet", img: shitalPati, status: "GI Status", type: "Cane Craft", price: "৳ 2,500", basePrice: 2500, rating: 4, reviewCount: 88, desc: "Cool-feeling mats hand-woven from Murta cane, recognized by UNESCO." },
    { name: "Heritage Pottery", region: "Dhamrai", img: pottery, status: "Local Heritage", type: "Clay Craft", price: "৳ 300", basePrice: 300, rating: 4, reviewCount: 215, desc: "Terracotta and glazed clay work crafted using ancient wood-fired kilns." },
    { name: "Bamboo & Cane", region: "Sylhet", img: bamboo, status: "Local Heritage", type: "Utility Craft", price: "৳ 500", basePrice: 500, rating: 5, reviewCount: 67, desc: "Sustainable utility items, from baskets to sophisticated home decor." },
    { name: "Brass & Bell Metal", region: "Dhamrai", img: metal, status: "Local Heritage", type: "Metal Craft", price: "৳ 2,000", basePrice: 2000, rating: 5, reviewCount: 34, desc: "Lost-wax casting method used to create royal tableware and statues." },
    { name: "Wood Carving", region: "Dinajpur", img: wood, status: "Local Heritage", type: "Wood Craft", price: "৳ 1,500", basePrice: 1500, rating: 4, reviewCount: 29, desc: "Intricate relief carving on seasoned wood for traditional doors." },
    { name: "Jute Handicrafts", region: "Faridpur", img: jute, status: "Local Heritage", type: "Eco Craft", price: "৳ 300", basePrice: 300, rating: 5, reviewCount: 312, desc: "Biodegradable fashion bags and home textiles from the 'Golden Fiber'." },
    { name: "Tribal Handicrafts", region: "Hill Tracts", img: jewelry, status: "Local Heritage", type: "Ethnic Craft", price: "৳ 800", basePrice: 800, rating: 5, reviewCount: 51, desc: "Traditional jewelry reflecting the diverse ethnic groups of CHT." },
  ];

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCrafts = crafts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(crafts.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F9F7F2]">
      {/* Header */}
      <header className="px-10 py-20 text-center">
        <span className="brand-color text-xs uppercase tracking-[0.4em] mb-4 block font-bold">Handmade in Bangladesh</span>
        <h1 className="text-5xl md:text-7xl serif mb-6">Artisanal <span className="italic font-light">Crafts</span></h1>
        <p className="max-w-2xl mx-auto text-stone-500 text-sm leading-relaxed italic">
          "Preserving the soul of rural artistry through authentic, Geographical Indication (GI) certified handiwork."
        </p>
      </header>

      {/* Main Grid */}
      <main className="px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {currentCrafts.map((item, index) => {
            const productSlug = item.name.toLowerCase().replace(/\s+/g, '-');

            return (
              <div key={index} className="bg-white border border-stone-100 hover:border-[#A33B26] transition-all duration-500 transform hover:-translate-y-2 flex flex-col group">
                
                {/* Image Section */}
                <Link to={`/product/${productSlug}`} className="relative h-72 overflow-hidden block">
                  <img 
                    src={item.img} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={item.name} 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                    {item.region}
                  </div>
                </Link>

                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-[8px] font-extrabold px-2 py-1 rounded uppercase tracking-wider ${item.status === 'GI Status' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {item.status}
                    </span>
                    <span className="brand-color font-bold italic serif text-[11px]">{item.type}</span>
                  </div>
                  
                  <Link to={`/product/${productSlug}`}>
                    <h3 className="text-2xl serif mb-1 hover:text-[#A33B26] transition-colors">{item.name}</h3>
                  </Link>

                  {/* Rating Display with Review Count */}
                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex text-[#A33B26]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < item.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-bold">
                      ({item.rating}.0) <span className="ml-1 font-normal italic">by {item.reviewCount} collectors</span>
                    </span>
                  </div>
                  
                  <p className="text-stone-500 text-xs leading-relaxed flex-grow">{item.desc}</p>
                  
                  {/* Action Section */}
                  <div className="pt-6 border-t border-stone-100 flex justify-between items-center mt-4">
                    <span className="text-lg font-light">{item.price}</span>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => addToCart({ ...item, price: item.basePrice })}
                        className="brand-bg text-white px-4 py-2 text-[10px] uppercase font-bold tracking-widest hover:opacity-90 transition-opacity"
                      >
                        Add to Bag
                      </button>
                      <Link 
                        to={`/product/${productSlug}`} 
                        className="brand-color text-[10px] font-bold uppercase tracking-widest hover:underline"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="mt-20 flex justify-center items-center gap-4">
          <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-3 border border-stone-200 rounded-full disabled:opacity-30 hover:bg-stone-100 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 text-[11px] font-bold rounded-full transition-all ${
                  currentPage === i + 1 
                  ? 'brand-bg text-white shadow-lg' 
                  : 'border border-stone-200 text-stone-400 hover:border-[#A33B26]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-3 border border-stone-200 rounded-full disabled:opacity-30 hover:bg-stone-100 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
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