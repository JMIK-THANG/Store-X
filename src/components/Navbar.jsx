import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleDemoLogin = () => {
    const demoUser = {
      id: 1,
      name: "Demo User",
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
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">🛒 Store X</h1>

        {!user ? (
          <button
            onClick={handleDemoLogin}
            className="px-4 py-2 text-sm font-medium rounded-full bg-black text-white hover:opacity-90 transition"
          >
            Demo Login
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm rounded-full border border-gray-300 hover:border-black hover:text-black transition"
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