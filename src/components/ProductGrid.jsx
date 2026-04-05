import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">Trending Now</h3>
          <p className="text-sm text-gray-500">
            Our most loved pieces this week.
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {products.length > 8 && (
        <div className="mt-6 text-center">
          <button className="border px-5 py-2 rounded-full text-sm bg-white hover:bg-gray-50">
            Load More Items
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;