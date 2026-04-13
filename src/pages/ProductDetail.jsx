import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, CreditCard, Star, MessageSquare, ShieldCheck, Camera, User } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch specific product by ID/Slug from Bayazid's API
        const response = await axios.get(`http://localhost:8000/api/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  // Handle Add to Bag
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity: quantity,
        price: parseFloat(product.price)
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
      <div className="text-[#A33B26] serif animate-pulse">Authenticating Heritage Data...</div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F7F2]">
      <div className="text-stone-400">Product not found in our heritage records.</div>
    </div>
  );

  return (
    <div className="bg-[#F9F7F2] min-h-screen pb-20">
      {/* Breadcrumb */}
      <nav className="px-6 md:px-10 py-6 text-[10px] uppercase tracking-widest text-stone-400">
        <span className="cursor-pointer hover:text-[#A33B26]" onClick={() => navigate('/')}>Home</span> / 
        <span className="mx-2">{product.category || 'Heritage'}</span> / 
        <span className="text-stone-900 ml-2 font-bold">{product.name}</span>
      </nav>

      <div className="px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/5] bg-stone-200 overflow-hidden rounded-sm">
            <img 
              src={product.image || `https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=687&auto=format&fit=crop`} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Support for multiple images if API provides them */}
          <div className="grid grid-cols-4 gap-4">
            {(product.gallery || [1, 2, 3, 4]).map((img, i) => (
              <div key={i} className="aspect-square bg-stone-300 cursor-pointer hover:opacity-80 overflow-hidden">
                {img.url && <img src={img.url} className="object-cover w-full h-full" alt="Gallery" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <span className="brand-color text-[10px] font-bold uppercase tracking-[0.3em]">
              {product.origin_district || product.region || 'Bangladesh'}
            </span>
            <h1 className="text-4xl md:text-5xl serif mt-2 mb-4">{product.name}</h1>
            <p className="text-2xl font-light mb-8">৳ {product.price}</p>
            
            <div className="space-y-6 text-stone-600 text-sm leading-relaxed mb-10">
              <p>{product.description || product.desc}</p>
              <ul className="grid grid-cols-2 gap-y-2 border-t border-stone-200 pt-6">
                {(product.specs || ["GI Certified", "Handmade"]).map((spec, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#A33B26] rounded-full"></span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-4">
                <div className="flex items-center border border-stone-300 px-4 py-2 bg-white">
                  <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="px-2 hover:text-[#A33B26]">-</button>
                  <span className="px-4 font-bold min-w-[40px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => q+1)} className="px-2 hover:text-[#A33B26]">+</button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-grow border border-stone-900 text-stone-900 font-bold uppercase tracking-widest text-xs py-4 hover:bg-stone-900 hover:text-white transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Bag
                </button>
              </div>

              <button 
                onClick={handleBuyNow}
                className="w-full brand-bg text-white font-bold uppercase tracking-widest text-xs py-5 hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg"
              >
                <CreditCard className="w-4 h-4" /> Buy Now & Support Heritage
              </button>
            </div>

            {/* Credibility Box */}
            <div className="bg-white border border-[#A33B26]/10 p-6 rounded-sm space-y-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="text-xl text-[#A33B26] pt-1">🔬</div>
                <div>
                  <h4 className="font-bold text-[11px] uppercase tracking-wider mb-1">GI Verification</h4>
                  <p className="text-[12px] text-stone-500">
                    {product.gi_status || "Certified (GI-01)"} - Authenticated by Somagom Protocol.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-xl text-[#A33B26] pt-1">👨‍🎨</div>
                <div>
                  <h4 className="font-bold text-[11px] uppercase tracking-wider mb-1">Meet the Artisan</h4>
                  <p className="text-[12px] text-stone-500">
                    {product.artisan_name || 'Master Artisan'}, from {product.origin_district || 'the heritage hub'}.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-xl text-[#A33B26] pt-1">🚚</div>
                <div>
                  <h4 className="font-bold text-[11px] uppercase tracking-wider mb-1">Shipping Estimate</h4>
                  <p className="text-[12px] text-stone-500">{product.shipping_time || '7-10 Days (Global Available)'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section - Kept Exactly as requested, can be integrated with a separate review API later */}
      <hr className="border-stone-200 mx-6 md:mx-10" />
      <div className="py-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl serif mb-4 text-stone-900">Heritage Voices</h2>
          <p className="text-[#A33B26] uppercase tracking-[0.2em] text-[10px] font-bold">Authentic Experiences</p>
        </div>
        {/* ... (Rest of your Review UI from previous code) ... */}
      </div>
    </div>
  );
}