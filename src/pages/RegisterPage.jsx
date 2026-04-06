import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Account created successfully.");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
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
          Create Account
        </h1>
        <p className="text-gray-500 mb-6">
          Sign up to start shopping.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6f8f7b]"
            required
          />

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
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6f8f7b] text-white py-3 rounded-full font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#6f8f7b] font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;