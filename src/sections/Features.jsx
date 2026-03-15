export default function Features() {
  const featureData = [
    { title: "Authenticity", desc: "Every product is verified with mandatory GI documentation and lab tests for food categories." },
    { title: "Direct Source", desc: "Eliminating the middleman. We connect you directly to the looms and workshops of Bangladesh." },
    { title: "Heritage", desc: "From Jamdani to Rajshahi Silk, we curate items that reflect the soul of our nation." },
    { title: "Global Reach", desc: "Bringing the heritage of Bengal to the 7.5 million expatriates living worldwide." }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 px-10 py-20">
      {featureData.map((f, i) => (
        <div key={i} className="glass-card p-8 group hover:border-[var(--heritage-red)] transition duration-500">
          <h3 className="text-xs tracking-widest text-gray-600 mb-4 uppercase">{f.title}</h3>
          <p className="text-sm text-gray-700 mb-6">{f.desc}</p>
          <span className="text-[10px] uppercase tracking-widest group-hover:text-[var(--heritage-red)]">
            Explore ↗
          </span>
        </div>
      ))}
    </section>
  );
}