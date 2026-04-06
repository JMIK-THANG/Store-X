const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col">
      <div className="h-48 bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <h3 className="font-semibold text-sm">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <p className="font-medium text-sm">${product.price}</p>

        <button className="mt-auto bg-black text-white text-sm py-2 rounded-full hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;