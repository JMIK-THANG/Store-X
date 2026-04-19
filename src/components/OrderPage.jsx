import { useEffect, useState } from "react";

const OrderPage = () => {
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

  // handle form change
  const handleFormChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value,
    });
  };

  // handle order submission
  const handleOrderSubmit = () => {
    fetch("http://localhost:5000/api/orders/addorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderForm),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to place order");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Order placed successfully:", data);
        setStatusMessage("Order placed successfully!");
      })
      .catch((err) => {
        console.error("Error placing order:", err);
        setStatusMessage("Failed to place order.");
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/cart/1")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch cart items");
        }
        return res.json();
      })
      .then((data) => {
        setCartItems(data);
      })
      .catch((err) => {
        console.error("Error fetching cart items:", err);
      });
  }, []);

  return (
    <div>
      <h1>Order Page</h1>

      {/* ADDRESS */}
      <input
        type="text"
        name="address_line"
        placeholder="Enter your address"
        onChange={handleFormChange}
      />
      <input
        type="text"
        name="city"
        placeholder="Enter your city"
        onChange={handleFormChange}
      />
      <input
        type="text"
        name="state"
        placeholder="Enter your State"
        onChange={handleFormChange}
      />
      <input
        type="text"
        name="country"
        placeholder="Enter your country"
        onChange={handleFormChange}
      />
      <input
        type="text"
        name="zip_code"
        placeholder="Enter your ZIP code"
        onChange={handleFormChange}
      />

      {/* Payment */}
      <h3>Payment Method</h3>
      <select name="payment_method" onChange={handleFormChange}>
        <option value="cod">Cash on Delivery</option>
        <option value="card">Card</option>
        <option value="upi">UPI</option>
      </select>

      {/* Summary */}
      <h3>Order Summary</h3>
      {cartItems.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ₹{Number(item.price).toFixed(2)}</p>
        </div>
      ))}

      <p>
        Total Items:{" "}
        {cartItems.reduce((total, item) => total + item.quantity, 0)}
      </p>

      <p>
        Total Price: $
        {Number(
          cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )
        ).toFixed(2)}
      </p>

      <button
        className="bg-blue-500 text-white px-20 rounded"
        onClick={handleOrderSubmit}
      >
        Place Order
      </button>

      <p>{statusMessage}</p>
    </div>
  );
};

export default OrderPage;