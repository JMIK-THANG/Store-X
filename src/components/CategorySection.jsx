const CategorySection = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
}) => {
  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Shop Products
        </h2>

        <input
          className="border border-gray-300 rounded-full px-5 py-3 bg-white w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-900/10"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 px-4 py-2 rounded-full border text-sm font-medium transition ${
                isActive
                  ? "bg-green-900 text-white border-green-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-900 hover:text-green-900"
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