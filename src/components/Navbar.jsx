import { Link } from "react-router-dom";

const Navbar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
}) => {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* LEFT: Logo */}
        <h1 className="text-xl font-semibold">Store-X</h1>

        {/* CENTER: Category + Search */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center">

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-full px-4 py-2 text-sm bg-white"
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-full px-4 py-2 text-sm w-full md:w-64"
          />
        </div>

        {/* RIGHT: Auth Buttons */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded-full bg-[#6f8f7b] text-white text-sm hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;