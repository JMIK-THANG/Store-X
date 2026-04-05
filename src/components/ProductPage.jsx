import { useState, useEffect, useMemo } from "react";
import ProductGrid from "./ProductGrid";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:5000/products"),
          fetch("http://localhost:5000/categories"),
        ]);

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData.data);
        setCategories(categoriesData.data);
        setError("");
      } catch (err) {
        console.log(err);
        setError("Something went wrong | Try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategories === "All" ||
        p.category_id === Number(selectedCategories);

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategories]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        className="rounded-lg border-2"
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ProductGrid products={filteredProducts} />
    </>
  );
};

export default ProductPage;