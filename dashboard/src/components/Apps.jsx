import React from "react";
import { Link } from "react-router-dom";

import "./Apps.css";

const apps = [
  { title: "Overview", description: "Account summary and market snapshot", to: "/" },
  { title: "Orders", description: "Review your buy and sell orders", to: "/orders" },
  { title: "Holdings", description: "See stocks currently in your account", to: "/holdings" },
  { title: "Positions", description: "Review your open positions", to: "/positions" },
  { title: "Funds", description: "View and manage demo account funds", to: "/funds" },
];

const Apps = () => {
  return (
    <section className="apps-page">
      <h2 className="title">Apps</h2>
      <div className="apps-grid">
        {apps.map((app) => (
          <Link className="app-link" to={app.to} key={app.title}>
            <span className="app-link-title">{app.title}</span>
            <span className="app-link-description">{app.description}</span>
            <span className="app-link-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Apps;
