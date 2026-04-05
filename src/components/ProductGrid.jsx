const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No Products found.</p>;
  }

  return (
    <div>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((item) => (
            <div className="border rounded-xl p-4 text-center" key={item.id}>
              <img
                className="mb-6 w-40 h-40 mx-auto object-cover"
                src={item.image_url}
                alt={item.name}
              />
              <h3 className="mb-6 min-h-[60px]">{item.name}</h3>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;