import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleDemoLogin = () => {
    const demoUser = {
      id: 1,
      name: "Hello, Demo User",
      email: "demo@test.com",
    };

    localStorage.setItem("user", JSON.stringify(demoUser));
    setUser(demoUser);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 lg:px-16">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer text-lg font-bold text-gray-900 md:text-2xl"
        >
          Store X
        </h1>

        {!user ? (
          <button
            onClick={handleDemoLogin}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-2 md:gap-3">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-lg text-gray-700">
              🛒
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-green-900 px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hide username on mobile */}
            <span className="text-sm font-medium text-gray-800">
              {/* Mobile */}
              <span className="md:hidden">👋 Hi</span>

              {/* Desktop */}
              <span className="hidden md:inline">{user.name}</span>
            </span>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1.5 rounded-full border border-gray-300 hover:border-black transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
