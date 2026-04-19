import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  const addItem = async (itemId) => {
    await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: 1, product_id: itemId, quantity: 1 }),
    });
    alert("successfuly added");
  };
  return (
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
        {/* Category (NEW - important) */}
        <p className="text-[10px] uppercase tracking-wide text-gray-400">
          {product.category}
        </p>

        {/* Title (fixed height) */}
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-[36px]">
          {product.title}
        </h3>

        {/* Price */}
        <p className="font-semibold text-base text-gray-900">
          ${product.price}
        </p>

        {/* Button */}

        <button
          onClick={() => {
            addItem(product.id);
          }}
          className="mt-auto border border-black text-black text-center text-sm py-2 rounded-full transition hover:bg-black hover:text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
