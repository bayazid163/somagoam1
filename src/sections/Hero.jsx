export default function Hero() {
  return (
    <section className="hero-section px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-8xl serif leading-tight mb-6 text-white">
          HERITAGE <br /> 
          <span className="italic font-light opacity-90 text-[#C5A059]">AND TRADITION</span>
        </h1>
        <p className="max-w-xl mx-auto text-stone-200 text-sm md:text-base mb-10 uppercase tracking-[0.2em]">
          ঐতিহ্য এখন আপনার ঘরের দুয়ারে <br />
          Empowering the roots of Bangladesh through authentic commerce.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <button className="brand-bg text-white px-10 py-4 text-xs uppercase font-bold tracking-widest">
            Explore Collection
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 text-xs uppercase font-bold tracking-widest">
            Our Legacy
          </button>
        </div>
      </div>
    </section>
  );
}