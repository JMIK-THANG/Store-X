const Navbar = () => {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">&#x1F6D2; Store X</h1>
        </div>

        <nav className="flex flex-wrap items-center gap-3 md:gap-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-black transition">
            Home
          </a>
          <a href="#" className="hover:text-black transition">
            Shop
          </a>
          <a href="#" className="hover:text-black transition">
            About
          </a>
          <a href="#" className="hover:text-black transition">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 hover:border-black hover:text-black transition">
            Log In
          </button>
          <button className="px-4 py-2 text-sm font-medium rounded-full bg-black text-white hover:opacity-90 transition">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;