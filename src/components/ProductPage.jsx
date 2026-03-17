import { useState, useEffect, useMemo } from "react";
import ProductGrid from "../components/ProductGrid";
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("All");
  const [uniqueCategories, setUniqueCategories] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        let response = await fetch("https://fakestoreapi.com/products");
        let productsData = await response.json();

        setProducts(productsData);
        let uniqueCategories = Array.from(
          new Set(productsData.map((product) => product.category)),
        );
        setCategories(uniqueCategories);
      } catch (err) {
        console.log(err);
        setError("Something went wrong | Try again later. ");
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setLoading(false);
      setError("");
    }
    if (error) {
      setLoading(false);
    }
  }, [categories, error]);

  const filteredProducts = useMemo(() => {
    if (search) {
      return products.filter((p) => {
        p.title.toLowerCase().includes(search.toLowerCase());
      });
    } else {
      return selectedCategories === "All"
        ? products
        : products.filter((p) => p.category === selectedCategories);
    }
  }, [products, search, selectedCategories]);
  return (
    <>
      <h1>Store-X</h1>
      <label>Choose By Category</label>
      <select
        className="border mx-4"
        value={selectedCategories}
        onChange={(e) => setSelectedCategories(e.target.value)}
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <input
        className=" rounded-lg border-2"
        type="text"
        placeholder="Search Products..."
        value={search}
        onChang={(e) => setSearch(e.target.value)}
      />
      <ProductGrid products={filteredProducts} />
    </>
  );
};


export default ProductPage;
