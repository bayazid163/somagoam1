// 1. Remove the Navbar and Footer imports from here
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import Highlights from "../sections/Highlights";
import Fashion from "../sections/Fashion";
import Food from "../sections/Food";
import Crafts from "../sections/Crafts";
import Stats from "../sections/Stats";
import About from "../sections/About";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 2. Remove <Navbar /> and <Footer /> from this list */}
      <Hero />
      <Features />
      <Highlights />
      <Fashion />
      <Food />
      <Crafts />
      <Stats />
      <About />
    </div>
  );
}