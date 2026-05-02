import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  const [form, setForm] = useState({
    address_line: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    payment_method: "card",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please use Demo Login first");
      navigate("/");
      return;
    }

    fetch(`http://localhost:5000/api/cart/${user.id}`)
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error("Cart error:", err));
  }, [navigate]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please use Demo Login first");
      return;
    }

    if (
      !form.address_line ||
      !form.city ||
      !form.state ||
      !form.country ||
      !form.zip_code
    ) {
      setStatusMessage("Please fill in all shipping fields.");
      return;
    }

    const orderData = {
      ...form,
      user_id: user.id,
    };

    fetch("http://localhost:5000/api/orders/addorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Order failed");
        return res.json();
      })
      .then(() => {
        setPlacedOrder({
          items: cartItems,
          totalItems,
          totalPrice,
          shipping: form,
        });

        setStatusMessage("Order placed successfully!");
      })
      .catch((err) => {
        console.error("Order error:", err);
        setStatusMessage("Failed to place order.");
      });
  };

  if (placedOrder) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-3xl font-bold text-green-600">
            Order Placed!
          </h1>

          <p className="mb-8 text-gray-600">
            Thank you. Here is your order summary.
          </p>

          <h2 className="mb-4 text-xl font-semibold">Items</h2>

          <div className="space-y-4">
            {placedOrder.items.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-3">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="font-semibold">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{placedOrder.totalItems}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>Total Cost</span>
              <span>${placedOrder.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

          <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>

          <div className="space-y-4">
            <input
              name="address_line"
              placeholder="Address"
              value={form.address_line}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            <input
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />

            <input
              name="zip_code"
              placeholder="ZIP Code"
              value={form.zip_code}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <h2 className="mb-4 mt-8 text-xl font-semibold">Payment Method</h2>

          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option value="card">Debit / Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="applepay">Apple Pay / Google Pay</option>
          </select>

          <button
            onClick={placeOrder}
            className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Place Order
          </button>

          {statusMessage && (
            <p className="mt-4 text-center font-medium text-red-600">
              {statusMessage}
            </p>
          )}
        </div>

        <div className="h-fit rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-3"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between text-xl font-bold">
                  <span>Total Cost</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;