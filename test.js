const CategorySection = ({
  categoires,
  selectedCategory,
  setSelectedtedCategory,
  search,
  setSearch,
}) => {
  return (
    <section className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">Shop by Category</h2>
          <p className="text-sm text-gray-500 mt-1">
            Browse by category or search for a product.
          </p>
        </div>
        <input
          className="border border-gray-300 rounded-xl px-4 py-3 bg-white w-full md:w-[32p;px] focus:outline-none focus:ring-2 focus:ring-black/10"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        {categoires.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              onClick={() => setSelectedtedCategory(category)}
              className={`px-4 py2 rounded-full border text-sm fontmedium transition${
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
