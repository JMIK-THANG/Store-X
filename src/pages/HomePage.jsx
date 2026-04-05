import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { id: 1, name: "Clothing" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Books" },
  ];

  const products = [
    {
      id: 1,
      name: "Classic Essential Tee",
      description: "Soft cotton everyday shirt.",
      price: 39.99,
      category_id: 1,
      category_name: "Clothing",
      image_url: "https://via.placeholder.com/300x220",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      description: "Clean sound and modern design.",
      price: 89.99,
      category_id: 2,
      category_name: "Electronics",
      image_url: "https://via.placeholder.com/300x220",
    },
    {
      id: 3,
      name: "Minimal Desk Lamp",
      description: "Warm light for your workspace.",
      price: 29.99,
      category_id: 2,
      category_name: "Electronics",
      image_url: "https://via.placeholder.com/300x220",
    },
    {
      id: 4,
      name: "The Design Book",
      description: "A beautiful book about design.",
      price: 24.99,
      category_id: 3,
      category_name: "Books",
      image_url: "https://via.placeholder.com/300x220",
    },
  ];

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
        <CategorySection categories={categories} />
        <ProductGrid products={filteredProducts} />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;