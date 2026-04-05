const CategorySection = ({ categories }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Curated Categories</h3>
        <button className="text-sm text-gray-500 hover:text-black">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-2xl bg-white border p-6 min-h-[140px] flex items-end shadow-sm"
          >
            <div>
              <p className="text-xs uppercase text-gray-400 mb-1">Category</p>
              <h4 className="text-lg font-semibold">{category.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;