const Navbar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
}) => {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl font-semibold">Store-X</h1>

        <nav className="flex gap-4 text-sm text-gray-600">
          <button className="hover:text-black">Home</button>
          <button className="hover:text-black">Clothing</button>
          <button className="hover:text-black">Electronics</button>
          <button className="hover:text-black">Books</button>
        </nav>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <select
            className="border rounded-full px-4 py-2 text-sm bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search products"
            className="border rounded-full px-4 py-2 text-sm w-full md:w-56"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;