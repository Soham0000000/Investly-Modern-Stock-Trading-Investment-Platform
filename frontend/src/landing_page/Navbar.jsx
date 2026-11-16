import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <nav className="site-navbar">
        <div className="site-navbar-inner">
          <Link className="site-navbar-brand" to="/" aria-label="Investly home">
            <img src="media/images/investly.png" alt="Investly" />
          </Link>
          <button
            className="site-navbar-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="site-navbar-links"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <ul id="site-navbar-links" className={`site-navbar-links${isMenuOpen ? " is-open" : ""}`}>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link to="/product" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
            <li><Link to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link></li>
            <li><Link to="/support" onClick={() => setIsMenuOpen(false)}>Support</Link></li>
            <li className="site-navbar-kite-item"><Link className="site-navbar-kite" to="/signup?mode=login" aria-label="Kite login" onClick={() => setIsMenuOpen(false)}><img src="media/images/kitBtn.svg" alt="Kite" /></Link></li>
          </ul>
        </div>
      </nav>
  );
}

export default Navbar;
