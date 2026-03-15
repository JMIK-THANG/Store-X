import { useState, useEffect, useMemo } from "react";

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
        value={selectedCategories}
        onChange={(e) => setSelectedCategories(e.target.value)}
      >
        <option value="All">All</option>
        {categories.map((product) => (
          <option value={product}>{product}</option>
        ))}
      </select>
      <input
        className="p1 rounded-lg border-2"
        type="text"
        placeholder="Search Products..."
        value={search}
        onChang={(e) => setSearch(e.target.value)}
      />
      <ProductList products={filteredProducts} />
    </>
  );
};

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No Products found.</p>;
  }
  return (
    <div>
      <div>
        {products.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.category}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductPage;
