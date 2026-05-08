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
      <div className="flex flex-col gap-2">
        <h2 className="text-xl md:text-3xl font-semibold text-gray-900">
          Shop Products
        </h2>

        <input
          className="border border-gray-300 rounded-full px-4 py-2 md:px-5 md:py-3 bg-white w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-900/10"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2">
  {categories.map((category) => {
    const isActive = selectedCategory === category;

    return (
      <button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition md:px-4 md:py-2 md:text-sm ${
          isActive
            ? "bg-green-900 text-white border-green-900"
            : "bg-white text-gray-700 border-gray-200 hover:border-green-900 hover:text-green-900"
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
