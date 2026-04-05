import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";
import NewsletterSection from "../components/NewsLetterSection";
import Footer from "../components/Footer";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const productsRes = await fetch("http://localhost:5000/products");
        const productsData = await productsRes.json();

        const categoriesRes = await fetch("http://localhost:5000/categories");
        const categoriesData = await categoriesRes.json();

        setProducts(productsData.data || []);
        setCategories(categoriesData.data || []);
      } catch (err) {
        console.log(err);
        setError("Something went wrong. Try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const result = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category_id === Number(selectedCategory);

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(result);
  }, [products, search, selectedCategory]);

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

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
        <CategorySection categories={categories} />
        <ProductGrid products={filteredProducts} />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
