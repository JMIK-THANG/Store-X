import { useState } from "react";

const ProductCard = ({ product }) => {
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const addItem = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      showMessage("Please click Demo Login first to add items.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    showMessage("Added to cart!");
  };
  return (
    <>
        {/* ✅ Popup message */}
      {message && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-black px-6 py-3 text-white shadow-lg">
          {message}
        </div>
      )}
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 flex flex-col">
        {/* Image */}
        <div className="h-48 bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="mt-4 flex flex-col gap-2 flex-grow">
          <p className="text-[10px] uppercase tracking-wide text-gray-400">
            {product.category}
          </p>

          <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-[36px]">
            {product.title}
          </h3>

          <p className="font-semibold text-base text-gray-900">
            ${product.price}
          </p>

          <button
            onClick={addItem}
            className="mt-auto border border-black text-black text-sm py-2 rounded-full transition hover:bg-black hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
