export default function Crafts() {
  return (
    <section id="craft" className="px-10 py-16">
      <h2 className="text-3xl serif mb-10 border-b border-stone-200 pb-4">Exquisite <span className="brand-color">Crafts</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="traditional-card flex flex-col md:flex-row items-center">
          <img src="/Images/shataranji.png" className="w-full md:w-48 h-48 object-cover" alt="Sotoronji" />
          <div className="p-6">
            <h3 className="serif text-2xl">Jessore Sotoronji</h3>
            <p className="text-sm text-stone-600 mt-2">Authentic hand-tufted floor mats and rugs from the heart of Jessore.</p>
          </div>
        </div>
        <div className="traditional-card flex flex-col md:flex-row items-center">
          <img src="/Images/nakshi_katha.jpg" className="w-full md:w-48 h-48 object-cover" alt="Nakshi Kantha" />
          <div className="p-6">
            <h3 className="serif text-2xl">Nakshi Kantha</h3>
            <p className="text-sm text-stone-600 mt-2">Intricate hand-stitched embroidery depicting the folklore of rural Bengal.</p>
          </div>
        </div>
      </div>
    </section>
  );
}