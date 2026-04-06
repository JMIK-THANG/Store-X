import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm p-8">
        <p className="text-sm text-gray-500 mb-2">Store-X</p>
        <h1 className="text-3xl font-semibold text-[#1f2937] mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 mb-6">
          Log in to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6f8f7b]"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6f8f7b]"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6f8f7b] text-white py-3 rounded-full font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-[#6f8f7b] font-medium">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;