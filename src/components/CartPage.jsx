import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    0,
  );

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🛒</div>

            <h2 className="text-xl font-semibold text-gray-800">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Looks like you haven’t added anything yet.
            </p>

            <Link
              to="/"
              className="rounded-full bg-black px-6 py-3 text-white text-sm font-semibold hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {/* LEFT: Items */}
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm"
                >
                  <img src={item.image} className="h-20 w-20 object-contain" />

                  <div className="flex-1">
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-semibold">${item.price}</p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="border px-4 py-2 rounded-full hover:bg-black hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT: Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <span>Total</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem("cart");
                  setCartItems([]);
                  alert("Demo checkout complete!");
                }}
                className="w-full mt-4 bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
