const Navbar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  search,
  setsearch,
}) => {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">&#x1F6D2; Store X</h1>

        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <select
            className="border rounded-lg px-3 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            {categories.map((categ) => (
              <option key={categ} value={categ}>
                {categ}
              </option>
            ))}
          </select>

          <input
            className="border rounded-lg px-3 py-2 w-full md:w-64"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;