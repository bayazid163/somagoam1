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

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with Bayazid's actual endpoint (e.g., /api/products/)
        const response = await axios.get('http://localhost:8000/api/products/');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching heritage products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category for each section
  const fashionProducts = products.filter(p => p.category === 'fashion' || p.category === 'clothing');
  const foodProducts = products.filter(p => p.category === 'food' || p.category === 'sweets');
  const craftsProducts = products.filter(p => p.category === 'crafts' || p.category === 'handicraft');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf8f7]">
        <div className="text-[#A33B26] font-serif animate-pulse">Loading Somagom Heritage...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Highlights items={products.slice(0, 3)} /> {/* Pass top 3 for highlights */}
      
      {/* Pass the filtered data to the respective sections */}
      <Fashion products={fashionProducts} />
      <Food products={foodProducts} />
      <Crafts products={craftsProducts} />
      
      <Stats />
      <About />
    </div>
  );
}