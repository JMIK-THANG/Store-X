import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([]);
  const [orderForm, setOrderForm] = useState({
    user_id: 1,
    address_line: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    payment_method: "cod",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleFormChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderSubmit = () => {
    fetch("http://localhost:5000/api/orders/addorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderForm),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to place order");
        return res.json();
      })
      .then((data) => {
        console.log(data);

        setStatusMessage("✅ Order placed successfully!");
        setCartItems([]);

        setTimeout(() => {
          navigate("/"); // home page
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        setStatusMessage("❌ Failed to place order.");
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/cart/1")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cart items");
        return res.json();
      })
      .then((data) => setCartItems(data))
      .catch((err) => console.error(err));
  }, []);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

          <div className="space-y-4">
            <input
              type="text"
              name="address_line"
              placeholder="Address"
              onChange={handleFormChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleFormChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleFormChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={handleFormChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="zip_code"
              placeholder="ZIP Code"
              onChange={handleFormChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Payment Method</h2>

          <select
            name="payment_method"
            onChange={handleFormChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
          </select>

          <button
            onClick={handleOrderSubmit}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
          >
            Place Order
          </button>

          {statusMessage && (
            <p className="mt-4 text-center font-medium text-green-600">
              {statusMessage}
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-5">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-4">
                <div>
                  <h4 className="font-semibold text-lg">{item.name}</h4>

                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="font-semibold">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3 border-t pt-6">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
