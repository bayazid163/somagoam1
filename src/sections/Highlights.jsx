export default function Highlights() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-0 border-b border-stone-200 bg-white">
      <div className="p-10 border-r border-stone-100 flex flex-col items-center text-center">
        <h3 className="serif text-lg mb-2">GI Verified</h3>
        <p className="text-[10px] text-stone-500 uppercase tracking-wider">Certified Authenticity</p>
      </div>
      <div className="p-10 border-r border-stone-100 flex flex-col items-center text-center">
        <h3 className="serif text-lg mb-2">Direct Source</h3>
        <p className="text-[10px] text-stone-500 uppercase tracking-wider">Village to Doorstep</p>
      </div>
      <div className="p-10 border-r border-stone-100 flex flex-col items-center text-center">
        <h3 className="serif text-lg mb-2">Fast Shipping</h3>
        <p className="text-[10px] text-stone-500 uppercase tracking-wider">Global Logistics</p>
      </div>
      <div className="p-10 flex flex-col items-center text-center">
        <h3 className="serif text-lg mb-2">Artisan First</h3>
        <p className="text-[10px] text-stone-500 uppercase tracking-wider">Supporting 100+ Families</p>
      </div>
    </section>
  );
}