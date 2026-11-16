import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrders = () => {
      axios
        .get("http://localhost:3802/allOrders")
        .then(({ data }) => {
          setOrders(data);
          setErrorMessage("");
        })
        .catch(() => setErrorMessage("Unable to load orders. Please try again."))
        .finally(() => setIsLoading(false));
    };

    fetchOrders();
    window.addEventListener("orders:updated", fetchOrders);

    return () => window.removeEventListener("orders:updated", fetchOrders);
  }, []);

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>

      {isLoading ? (
        <p>Loading orders...</p>
      ) : errorMessage ? (
        <p role="alert">{errorMessage}</p>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="btn">Get started</Link>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>₹{Number(order.price).toFixed(2)}</td>
                  <td className={order.mode === "BUY" ? "profit" : "loss"}>
                    {order.mode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
