import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star } from 'lucide-react'; // Added Star icon import

// Import images
import dhakaJamdani from '../assets/dhaka_jamdani.jpg';
import tangailSaree from '../assets/tangail_sareee.jpg';
import rajshahiSilk from '../assets/rajshahi_silk_saree.png';
import khadiPanjabi from '../assets/khadi_panjabi.png';
import monipuri from '../assets/monipuri.jpg';
import halfSilk from '../assets/sirajgonj_half_silk.jpg';
import chakmaDress from '../assets/Chakma_dress.jpeg';
import sareeStory from '../assets/saree_story.jpg';

export default function Fashion() {
  const { addToCart } = useCart();

  // Data array updated with basePrice and added rating field
  const products = [
    { name: "Dhakai Jamdani", region: "Dhaka", img: dhakaJamdani, type: "Saree", cert: "GI Certified", price: "৳ 10,000", basePrice: 10000, shelfLife: "stable", desc: "Exquisite hand-loomed muslin with intricate motifs.", rating: 5 },
    { name: "Tangail Tant Saree", region: "Tangail", img: tangailSaree, type: "Saree", cert: "GI Certified", price: "৳ 2,500", basePrice: 2500, shelfLife: "stable", desc: "Traditional cotton weaves known for refined borders.", rating: 4 },
    { name: "Rajshahi Silk Saree", region: "Rajshahi", img: rajshahiSilk, type: "Saree", cert: "GI Certified", price: "৳ 15,000", basePrice: 15000, shelfLife: "stable", desc: "Pure Mulberry silk, famous for luxurious texture.", rating: 5 },
    { name: "Khadi Garments", region: "Cumilla", img: khadiPanjabi, type: "Wearable", cert: "Local Heritage", price: "৳ 1,200", basePrice: 1200, shelfLife: "stable", desc: "Hand-spun, hand-woven fabric that breathes.", rating: 4 },
    { name: "Monipuri Dress", region: "Sylhet", img: monipuri, type: "Wearable", cert: "Local Heritage", price: "৳ 2,500", basePrice: 2500, shelfLife: "stable", desc: "Distinctive geometric patterns from the community.", rating: 5 },
    { name: "Handloom Cotton", region: "Pabna", img: halfSilk, type: "Saree", cert: "Local Heritage", price: "৳ 2,000", basePrice: 2000, shelfLife: "stable", desc: "Soft daily wear sarees from weaver colonies.", rating: 4 },
    { name: "Ethnic Wear", region: "Hill Tracts", img: chakmaDress, type: "Wearable", cert: "Local Heritage", price: "৳ 1,500", basePrice: 1500, shelfLife: "stable", desc: "Back-strap loom fabrics reflecting tribal culture.", rating: 5 },
  ];

  return (
    <div className="bg-[#F9F7F2]">
      {/* Header */}
      <header className="px-10 py-16 text-center border-b border-stone-200">
        <span className="brand-color text-xs uppercase tracking-[0.4em] mb-4 block font-bold">Threads of History</span>
        <h1 className="text-5xl md:text-7xl serif mb-6">Heritage <span className="italic font-light">Fashion</span></h1>
        <p className="max-w-2xl mx-auto text-stone-500 text-sm leading-relaxed italic">
          "Certified authentic weaves directly from the looms of master artisans."
        </p>
      </header>

      {/* Product Grid */}
      <main className="px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item, index) => {
            const productSlug = item.name.toLowerCase().replace(/\s+/g, '-');

            return (
              <div key={index} className="product-card flex flex-col bg-white border border-stone-100 hover:border-[#A33B26] transition-all duration-300 group">
                
                {/* Clickable Image Area */}
                <Link to={`/product/${productSlug}`} className="relative h-80 overflow-hidden block">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                    {item.region}
                  </div>
                </Link>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-[8px] font-extrabold px-2 py-1 rounded uppercase tracking-wider ${item.cert === 'GI Certified' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {item.cert}
                    </span>
                    <span className="brand-color font-bold italic serif text-[10px]">{item.type}</span>
                  </div>
                  
                  {/* Clickable Title */}
                  <Link to={`/product/${productSlug}`}>
                    <h3 className="serif text-xl mb-1 hover:text-[#A33B26] transition-colors">{item.name}</h3>
                  </Link>

                  {/* Rating Option Section */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-[#A33B26]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill={i < item.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-400 font-bold">({item.rating}.0)</span>
                  </div>
                  
                  <p className="text-stone-500 text-xs flex-grow mb-4">{item.desc}</p>
                  
                  <div className="pt-4 mt-auto border-t border-stone-100 flex justify-between items-center">
                    <span className="font-bold text-sm">{item.price}</span>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => addToCart({ ...item, price: item.basePrice })}
                        className="brand-bg text-white px-3 py-2 text-[9px] uppercase font-bold tracking-widest hover:opacity-90 transition-opacity"
                      >
                        Add to Bag
                      </button>
                      <Link 
                        to={`/product/${productSlug}`} 
                        className="brand-color text-[9px] font-bold uppercase tracking-widest hover:underline"
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
      </main>

      {/* Artisan Spotlight */}
      <section className="mx-10 my-20 bg-stone-100 p-12 flex flex-col md:flex-row items-center gap-12 border border-stone-200">
        <div className="md:w-1/3">
          <img src={sareeStory} className="w-full grayscale rounded-sm shadow-xl" alt="Artisan" />
        </div>
        <div className="md:w-2/3">
          <span className="brand-color text-xs uppercase tracking-[0.3em] font-bold">Artisan Spotlight</span>
          <h2 className="text-4xl serif mt-2 mb-6">The Hands Behind the Loom</h2>
          <p className="text-stone-600 leading-relaxed mb-6 italic">
            Each thread is hand-spun and every motif is manually woven by master weavers who have kept this heritage alive for over 400 years.
          </p>
          <button className="brand-bg text-white px-8 py-3 text-[10px] uppercase font-bold tracking-widest transition hover:opacity-90">
            Read Their Stories
          </button>
        </div>
      </section>
    </div>
  );
}