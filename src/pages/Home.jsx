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
    // Use an AbortController to prevent memory leaks if the user navigates away
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        // Integration Point: Connects to the Django Rest Framework backend
        const response = await axios.get('http://localhost:8000/api/products/', {
          signal: controller.signal
        });
        setProducts(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled");
        } else {
          console.error("Error fetching heritage products:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  // Filter products by category for each section
  // Note: Ensure these strings match the 'category' field in Bayazid's Database
  const fashionProducts = products.filter(p => p.category === 'fashion' || p.category === 'clothing');
  const foodProducts = products.filter(p => p.category === 'food' || p.category === 'sweets');
  const craftsProducts = products.filter(p => p.category === 'crafts' || p.category === 'handicraft');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcf8f7]">
        <div className="text-[#A33B26] font-serif animate-pulse text-xl tracking-widest">
          Loading Somagom Heritage...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      
      {/* Passing top 3 products for the highlights banner */}
      <Highlights items={products.slice(0, 3)} /> 
      
      {/* IMPORTANT: Ensure that inside Fashion.jsx, Food.jsx, and Crafts.jsx, 
          you change the function definition to accept { products } as a prop.
      */}
      <Fashion products={fashionProducts} />
      <Food products={foodProducts} />
      <Crafts products={craftsProducts} />
      
      <Stats />
      <About />
    </div>
  );
}