export default function Hero() {
  return (
    <section className="hero-section px-6">
      <div className="max-w-4xl text-center text-white">

        <h1 className="text-5xl md:text-8xl serif leading-tight mb-6">
          HERITAGE
          <br />
          <span className="italic font-light opacity-90 text-[#C5A059]">
            AND TRADITION
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-sm md:text-base mb-10 uppercase tracking-[0.2em]">
          ঐতিহ্য এখন আপনার ঘরের দুয়ারে
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button className="brand-bg text-white px-10 py-4 text-xs uppercase">
            Explore Collection
          </button>

          <button className="border border-white px-10 py-4 text-xs uppercase">
            Our Legacy
          </button>
        </div>

      </div>
    </section>
  );
}