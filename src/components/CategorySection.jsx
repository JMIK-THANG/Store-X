const CategorySection = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
}) => {
  return (
    <section className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Shop by Category</h2>
          <p className="text-sm text-gray-500 mt-1">
            Browse products by category or search for something specific.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white min-w-[220px] focus:outline-none focus:ring-2 focus:ring-black/10"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            className="border border-gray-300 rounded-xl px-4 py-3 bg-white w-full sm:w-[280px] focus:outline-none focus:ring-2 focus:ring-black/10"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-black hover:text-black"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;