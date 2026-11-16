import React, { useState } from "react";
import './pricing.css';

const chargesData = {
  Equity: {
    columns: [
      "Equity delivery",
      "Equity intraday",
      "F&O - Futures",
      "F&O - Options",
    ],
    rows: [
      ["Brokerage", "Zero Brokerage", "0.03% or Rs. 20/executed order whichever is lower", "0.03% or Rs. 20/executed order whichever is lower", "Flat Rs. 20 per executed order"],
      ["STT/CTT", "0.1% on buy & sell", "0.025% on sell side", "0.05% on sell side", "0.15% on sell side"],
      ["Transaction charges", "NSE: 0.00307%", "NSE: 0.00307%", "NSE: 0.00183%", "NSE: 0.03553%"],
      ["GST", "18% on brokerage + SEBI charges + transaction charges", "18% on brokerage + SEBI charges + transaction charges", "18% on brokerage + SEBI charges + transaction charges", "18% on brokerage + SEBI charges + transaction charges"],
      ["SEBI charges", "₹10 / crore", "₹10 / crore", "₹10 / crore", "₹10 / crore"],
      ["Stamp charges", "0.015% on buy side", "0.003% on buy side", "0.002% on buy side", "0.003% on buy side"],
    ],
  },

  Currency: {
    columns: ["Currency futures", "Currency options"],
    rows: [
      ["Brokerage", "0.03% or ₹20/order whichever is lower", "₹20/executed order"],
      ["STT/CTT", "No STT", "No STT"],
      ["Transaction charges", "NSE: 0.00035%", "NSE: 0.0311%"],
      ["GST", "18% on applicable charges", "18% on applicable charges"],
      ["SEBI charges", "₹10 / crore", "₹10 / crore"],
      ["Stamp charges", "0.0001% on buy side", "0.0001% on buy side"],
    ],
  },

  Commodity: {
    columns: ["Commodity futures", "Commodity options"],
    rows: [
      ["Brokerage", "0.03% or Rs. 20/order whichever is lower", "₹20/executed order"],
      ["STT/CTT", "0.01% on sell side (Non-Agri)", "0.05% on sell side"],
      ["Transaction charges", "MCX: 0.0021%\nNSE: 0.0001%", "MCX: 0.0418%\nNSE: 0.001%"],
      ["GST", "18% on applicable charges", "18% on applicable charges"],
      ["SEBI charges", "Agri: ₹1/crore\nNon-agri: ₹10/crore", "₹10/crore"],
      ["Stamp charges", "0.002% on buy side", "0.003% on buy side"],
    ],
  },

  "US Equity": {
    rows: [
      ["Brokerage", "0.10% (Min $0.01, Max $10 on Buy/Sell)"],
      [
        "Transaction charges",
        "SEC Fees: 0.00206% on sell trade value\nFINRA fee: $0.000195 per share (max $9.79) on sell quantity*\nIFSCA Turnover Fee: 0.005% on trade value (Buy & Sell)",
      ],
      ["GST", "18% on brokerage amount"],
    ],
    note: "*The FINRA Trading Activity Fee (TAF) is paused from 1st October to 31st December 2026.",
  },
};

function ChargesSection() {
  const [activeTab, setActiveTab] = useState("US Equity");
  const currentData = chargesData[activeTab];

  return (
    <section className="pricing-page charges-section">
      <div className="container">
        <div className="charges-tabs" role="tablist" aria-label="Charge categories">
          {Object.keys(chargesData).map((tab) => (
            <button
              key={tab}
              className={`charges-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="charges-table-wrap">
          <table className="charges-table">
            {currentData.columns && (
              <thead>
                <tr>
                  <th scope="col">Charges</th>
                  {currentData.columns.map((column) => (
                    <th key={column} scope="col">{column}</th>
                  ))}
                </tr>
              </thead>
            )}

            <tbody>
              {currentData.rows.map((row) => (
                <tr key={row[0]}>
                  <th className="charges-table__label-cell" scope="row">{row[0]}</th>
                  {row.slice(1).map((value, index) => (
                    <td key={index} style={{ whiteSpace: "pre-line" }}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentData.note && <p className="charges-note">{currentData.note}</p>}
      </div>
    </section>
  );
}

export default ChargesSection;
