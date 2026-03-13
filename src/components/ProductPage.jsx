import { useState, useEffect } from "react";

const ProductPage = () => {
  const [prodcucts, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState("All");
  const [error, setError] = useState("");

  async function getProducts() {
    try {
      let fetchData = await fetch("https://fakestoreapi.com/products");
      let productsData = await fetchData.json();

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
      <select>
        <option value="All">All</option>
        {}
      </select>
    </>
  );
};

export default ProductPage;
