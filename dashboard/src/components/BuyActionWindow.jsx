import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, price }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(price ?? 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBuyClick = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const quantity = Number(stockQuantity);
    const orderPrice = Number(stockPrice);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setErrorMessage("Enter a whole-number quantity greater than zero.");
      return;
    }

    if (!Number.isFinite(orderPrice) || orderPrice <= 0) {
      setErrorMessage("Enter a valid price greater than zero.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:3802/newOrder", {
        name: uid,
        qty: quantity,
        price: orderPrice,
        mode: "BUY",
      });
      window.dispatchEvent(new Event("holdings:updated"));
      window.dispatchEvent(new Event("orders:updated"));
      generalContext.closeBuyWindow();
    } catch (error) {
      setErrorMessage(error.response?.data?.message ?? "Unable to complete the buy order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      {errorMessage && <p className="buy-action-error" role="alert">{errorMessage}</p>}

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            {isSubmitting ? "Buying..." : "Buy"}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
