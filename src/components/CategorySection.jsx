const CategorySection = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Shop by Category</h2>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-full border ${
            selectedCategory === "All"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(String(category.id))}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === String(category.id)
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
