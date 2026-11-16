import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const [holding, setHolding] = useState(null);
  const [stockQuantity, setStockQuantity] = useState("1");
  const [stockPrice, setStockPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3802/sellEligibility/${encodeURIComponent(uid)}`)
      .then(({ data }) => {
        if (!data.canSell) {
          setErrorMessage(data.message);
          return;
        }

        setHolding(data.holding);
        setStockPrice(String(data.holding.price));
      })
      .catch(() => setErrorMessage("Could not verify whether this stock can be sold."))
      .finally(() => setIsLoading(false));
  }, [uid]);

  const handleSellClick = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const quantity = Number(stockQuantity);
    const price = Number(stockPrice);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setErrorMessage("Enter a whole-number quantity greater than zero.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setErrorMessage("Enter a valid price greater than zero.");
      return;
    }

    if (!holding || quantity > holding.qty) {
      setErrorMessage(`You can sell up to ${holding?.qty ?? 0} shares.`);
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:3802/sellOrder", {
        name: uid,
        qty: quantity,
        price,
      });
      window.dispatchEvent(new Event("holdings:updated"));
      window.dispatchEvent(new Event("orders:updated"));
      generalContext.closeSellWindow();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ?? "Unable to complete the sell order.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="sell-action-backdrop">
      <section className="sell-action-window" role="dialog" aria-modal="true" aria-labelledby="sell-title">
        <header className="sell-action-header">
          <div>
            <p className="sell-action-eyebrow">Sell order</p>
            <h2 id="sell-title">{uid}</h2>
          </div>
          <button className="sell-action-close" type="button" onClick={handleCancelClick} aria-label="Close sell window">
            ×
          </button>
        </header>

        {isLoading ? (
          <p className="sell-action-status">Checking your available shares...</p>
        ) : holding ? (
          <form onSubmit={handleSellClick}>
            <p className="sell-action-available">Available to sell <strong>{holding.qty}</strong></p>
            <div className="sell-action-fields">
              <label>
                Quantity
                <input
                  type="number"
                  min="1"
                  max={holding.qty}
                  step="1"
                  value={stockQuantity}
                  onChange={(event) => setStockQuantity(event.target.value)}
                />
              </label>
              <label>
                Price (₹)
                <input
                  type="number"
                  min="0.01"
                  step="0.05"
                  value={stockPrice}
                  onChange={(event) => setStockPrice(event.target.value)}
                />
              </label>
            </div>
            {errorMessage && <p className="sell-action-error" role="alert">{errorMessage}</p>}
            <footer className="sell-action-footer">
              <span>Estimated value <strong>₹{(Number(stockQuantity) * Number(stockPrice) || 0).toFixed(2)}</strong></span>
              <div>
                <button className="sell-action-cancel" type="button" onClick={handleCancelClick}>Cancel</button>
                <button className="sell-action-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Selling..." : "Sell shares"}
                </button>
              </div>
            </footer>
          </form>
        ) : (
          <div className="sell-action-empty">
            <p>{errorMessage || `You haven't bought ${uid}, so it can't be sold.`}</p>
            <button className="sell-action-cancel" type="button" onClick={handleCancelClick}>Close</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default SellActionWindow;