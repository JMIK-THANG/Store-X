import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CartPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cart/1")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch cart items");
        }
        return res.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.error("Error fetching cart items:", err);
      });
  }, []);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          My Cart
        </h2>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Your cart is empty
            </p>

            <Link to="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-6 shadow-sm hover:shadow-md transition bg-gray-50"
                >
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800">
                        {item.name}
                      </h4>

                      <p className="text-gray-600 mt-2">
                        Price: 
                        <span className="font-medium ml-1">
                          ${Number(item.price).toFixed(2)}
                        </span>
                      </p>

                      <p className="text-gray-600">
                        Quantity:
                        <span className="font-medium ml-1">
                          {item.quantity}
                        </span>
                      </p>
                    </div>

                    <div className="text-lg font-bold text-green-600">
                      $
                      {(
                        Number(item.price) * item.quantity
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 border-t pt-6 flex justify-between items-center flex-wrap gap-4">
              <h3 className="text-2xl font-bold">
                Total: ${total.toFixed(2)}
              </h3>

              <Link to="/orders">
                <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition">
                  Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;