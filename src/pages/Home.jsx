import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import Highlights from "../sections/Highlights";
import Fashion from "../sections/Fashion";
import Food from "../sections/Food";
import Crafts from "../sections/Crafts";
import Stats from "../sections/Stats";
import About from "../sections/About";
import NoProducts from "../components/NoProducts";
import LoadingScreen from "../components/LoadingScreen"; // 1. Import it here

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/', {
          signal: controller.signal
        });
        setProducts(response.data);
      } catch (error) {
        if (!axios.isCancel(error)) console.error("Error:", error);
      } finally {
        // Small delay to ensure the animation looks smooth and isn't a "flash"
        setTimeout(() => setLoading(false), 1200);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  // 2. Use the new transition UI
  if (loading) return <LoadingScreen />;

  const fashionProducts = products.filter(p => p.category === 'fashion' || p.category === 'clothing');
  const foodProducts = products.filter(p => p.category === 'food' || p.category === 'sweets');
  const craftsProducts = products.filter(p => p.category === 'crafts' || p.category === 'handicraft');

  return (
    <div className="min-h-screen bg-[#F9F7F2] animate-in fade-in duration-1000">
      <Hero />
      <Features />
      
      {products.length > 0 && <Highlights items={products.slice(0, 3)} />} 
      
      <section id="fashion-preview">
        {fashionProducts.length > 0 ? (
          <Fashion products={fashionProducts} />
        ) : (
          <div className="py-20">
            <NoProducts category="Heritage Fashion" />
          </div>
        )}
      </section>

      <section id="food-preview">
        {foodProducts.length > 0 ? (
          <Food products={foodProducts} />
        ) : (
          <div className="py-20">
            <NoProducts category="GI Food" />
          </div>
        )}
      </section>

      <section id="crafts-preview">
        {craftsProducts.length > 0 ? (
          <Crafts products={craftsProducts} />
        ) : (
          <div className="py-20">
            <NoProducts category="Artisanal Crafts" />
          </div>
        )}
      </section>
      
      <Stats />
      <About />
    </div>
  );
}