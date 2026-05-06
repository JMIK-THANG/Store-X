import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 object-contain"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                  <p className="font-semibold">${item.price}</p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-black hover:text-white"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="rounded-2xl bg-white p-5 text-right shadow-sm">
              <p className="text-xl font-bold">
                Total: ${total.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;