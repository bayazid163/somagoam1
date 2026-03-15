export default function Food() {
  const foods = [
    { name: "Cumilla Roshmalai", img: "/Images/cumilla_roshmalai.png", desc: "Pure milk-based heritage dessert" },
    { name: "Tangail Chomchom", img: "/Images/tangail_chomchom.jpg", desc: "The King of Sweets from Porabari" },
    { name: "Patisapta Pitha", img: "/Images/Patishapta.png", desc: "Thin rice-flour crepes with Kheer filling" }
  ];

  return (
    <section id="food" className="px-10 py-16 bg-stone-100/50">
      <h2 className="text-3xl serif mb-10 border-b border-stone-200 pb-4">Traditional <span className="brand-color">GI Food</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {foods.map((food, i) => (
          <div key={i} className="traditional-card group">
            <div className="h-48 overflow-hidden">
              <img src={food.img} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <div className="p-6 text-center">
              <h3 className="serif text-xl">{food.name}</h3>
              <p className="text-sm text-stone-600 mt-2 italic">{food.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}