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

        const [categoriesRes, productsRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          // fetch("http://localhost:5000/products"),
        ]);

        if (!categoriesRes.ok || !productsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();
        console.log("products:", productsData);

        setCategories(categoriesData.data || []);
        setProducts(productsData.data || []);
      } catch (err) {
        console.log(err);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchHomeData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category_id === Number(selectedCategory);

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