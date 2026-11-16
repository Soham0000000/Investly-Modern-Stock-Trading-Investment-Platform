import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Funds.css";

const Funds = () => {
  const [availableCash, setAvailableCash] = useState(0);
  const [activeAction, setActiveAction] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3802/funds")
      .then(({ data }) => setAvailableCash(data.availableCash))
      .catch(() => setErrorMessage("Unable to load demo funds."))
      .finally(() => setIsLoading(false));
  }, []);

  const openAction = (action) => {
    setActiveAction(action);
    setAmount("");
    setErrorMessage("");
    setStatusMessage("");
  };

  const closeAction = () => {
    setActiveAction("");
    setErrorMessage("");
  };

  const handleFundsSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Enter an amount greater than zero.");
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint = activeAction === "add" ? "add" : "withdraw";
      const { data } = await axios.post(`http://localhost:3802/funds/${endpoint}`, {
        amount: parsedAmount,
      });
      setAvailableCash(data.availableCash);
      setStatusMessage(activeAction === "add" ? "Demo funds added." : "Demo funds withdrawn.");
      closeAction();
    } catch (error) {
      setErrorMessage(error.response?.data?.message ?? "Unable to update demo funds.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="funds-page">
      <div className="funds-toolbar">
        <div>
          <h2 className="title">Funds</h2>
          <p className="funds-demo-label">Demo account balance</p>
        </div>
        <div className="funds-actions">
          <button className="funds-button funds-button-add" type="button" onClick={() => openAction("add")}>
            Add funds
          </button>
          <button className="funds-button funds-button-withdraw" type="button" onClick={() => openAction("withdraw")}>
            Withdraw
          </button>
        </div>
      </div>

      {errorMessage && !activeAction && <p className="funds-error" role="alert">{errorMessage}</p>}
      {statusMessage && <p className="funds-success" role="status">{statusMessage}</p>}

      <div className="row funds-summary-row">
        <div className="col">
          <h3 className="funds-section-title">Equity</h3>
          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{isLoading ? "Loading..." : `₹${availableCash.toFixed(2)}`}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">₹0.00</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{isLoading ? "Loading..." : `₹${availableCash.toFixed(2)}`}</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Total collateral</p>
              <p>₹0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
          </div>
        </div>
      </div>

      {activeAction && (
        <div className="funds-dialog-backdrop">
          <section className="funds-dialog" role="dialog" aria-modal="true" aria-labelledby="funds-dialog-title">
            <h2 id="funds-dialog-title">{activeAction === "add" ? "Add demo funds" : "Withdraw demo funds"}</h2>
            <form onSubmit={handleFundsSubmit}>
              <label htmlFor="funds-amount">Amount (₹)</label>
              <input
                id="funds-amount"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                autoFocus
              />
              {errorMessage && <p className="funds-error" role="alert">{errorMessage}</p>}
              <div className="funds-dialog-actions">
                <button className="funds-button funds-button-withdraw" type="button" onClick={closeAction}>
                  Cancel
                </button>
                <button className="funds-button funds-button-add" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Confirm"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
};

export default Funds;
