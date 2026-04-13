import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHomeData() {
      try {
        setLoading(true);
        setError("");

        const fetchData = await fetch("https://fakestoreapi.com/products");
        const productData = await fetchData.json();

        setProducts(productData);

        const uniqueCategories = ["All", ...new Set(productData.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Something went wrong | Try again later");
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      ?.toLowerCase()
      .includes((search || "").toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#1f2937]">
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        search={search}
        setSearch={setSearch}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-10">
        <HeroSection />

        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <ProductGrid products={filteredProducts} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;