import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3802";
const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});

const Summary = () => {
  const [summary, setSummary] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;
    axios.get(`${apiUrl}/portfolio/summary`)
      .then(({ data }) => {
        if (active) setSummary(data);
      })
      .catch(() => {
        if (active) setErrorMessage("Unable to load your portfolio summary.");
      });

    return () => {
      active = false;
    };
  }, []);

  if (errorMessage) return <p role="alert">{errorMessage}</p>;
  if (!summary) return <main className="summary-page">Loading your portfolio...</main>;

  const isProfitable = summary.profitLoss >= 0;
  const profitClass = isProfitable ? "positive-value" : "negative-value";

  return (
    <main className="summary-page">
      <header className="summary-heading">
        <div>
          <p className="eyebrow">PORTFOLIO OVERVIEW</p>
          <h1>Good to see you, {summary.userName}</h1>
          <p className="summary-subtitle">Here is how your account is looking today.</p>
        </div>
        <span className="account-chip"><span /> Account summary</span>
      </header>

      <section className="summary-grid" aria-label="Account summary">
        <article className="summary-card equity-card">
          <div className="card-heading">
            <div>
              <p className="card-label">EQUITY</p>
              <h2>Available margin</h2>
            </div>
            <span className="card-mark equity-mark">₹</span>
          </div>
          <p className="primary-value">{currency.format(summary.availableCash)}</p>
          <div className="metric-divider" />
          <dl className="metric-list">
            <div><dt>Margins used</dt><dd>₹0.00</dd></div>
            <div><dt>Opening balance</dt><dd>{currency.format(summary.availableCash)}</dd></div>
          </dl>
          <Link className="card-link" to="/funds">Manage funds <span aria-hidden="true">↗</span></Link>
        </article>

        <article className="summary-card holdings-card">
          <div className="card-heading">
            <div>
              <p className="card-label">INVESTMENTS</p>
              <h2>Holdings <span className="holdings-count">{summary.holdingsCount}</span></h2>
            </div>
            <span className="card-mark holdings-mark">↗</span>
          </div>
          <p className={`primary-value ${profitClass}`}>
            {currency.format(summary.profitLoss)}
            <span className="gain-pill">{isProfitable ? "+" : ""}{summary.profitPercent.toFixed(2)}%</span>
          </p>
          <p className="value-caption">Total profit and loss</p>
          <div className="metric-divider" />
          <dl className="metric-list">
            <div><dt>Current value</dt><dd>{currency.format(summary.currentValue)}</dd></div>
            <div><dt>Invested value</dt><dd>{currency.format(summary.investedValue)}</dd></div>
          </dl>
          <Link className="card-link" to="/holdings">Explore holdings <span aria-hidden="true">↗</span></Link>
        </article>
      </section>

      <section className="summary-note" aria-label="Portfolio note">
        <span className="note-accent" />
        <div>
          <p className="note-title">A steady start</p>
          <p className="note-copy">Your holdings are {isProfitable ? "up" : "down"} <strong>{Math.abs(summary.profitPercent).toFixed(2)}%</strong> on the invested value.</p>
        </div>
        <Link to="/holdings" aria-label="View all holdings">View portfolio <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
};

export default Summary;
