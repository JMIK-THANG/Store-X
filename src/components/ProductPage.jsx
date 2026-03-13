import { useState, useEffect } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("All");
  const [uniqueCategories, setUniqueCategories] = useState("All");
  const [error, setError] = useState("");

  async function getProducts() {
    try {
      let response = await fetch("https://fakestoreapi.com/products");
      let productsData = await response.json();
      console.log(productsData)

      let uniqueCategories = Array.from(
        new Set(productsData.map((product) => product.category)),
      );
      setProducts(uniqueCategories);
    } catch (err) {
      console.log(err);
      setError("Something went wrong | Try again later. ");
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <h1>Store-X</h1>
      <label>Choose By Category</label>
      <select
        value={selectedCategories}
        onChange={(e) => setSelectedCategories(e.target.value)}
      >
        ;<option value="All">All</option>
        {products.map((product) => (
          <option value={product}>{product}</option>
        ))}
      </select>
    </>
  );
};

export default ProductPage;
