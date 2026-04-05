const ProductCard = ({ product }) => {
  return (
    <article className="bg-white rounded-2xl border p-3 shadow-sm">
      <img
        src={product.image_url || "https://via.placeholder.com/300x220"}
        alt={product.name}
        className="w-full h-44 object-cover rounded-xl mb-3"
      />

      <p className="text-[11px] uppercase tracking-wide text-gray-400">
        {product.category_name || "Category"}
      </p>

      <h4 className="font-medium mt-1">{product.name}</h4>

      <p className="text-sm text-gray-500 mt-1">
        {product.description || "No description available."}
      </p>

      <p className="mt-3 font-semibold">${product.price}</p>
    </article>
  );
};

export default ProductCard;