import React from 'react';
import './pricing.css';

function Hero() {
    return ( 
        <section className="pricing-page pricing-hero">
            <div className="container text-center">
                <h1 className="pricing-hero__title">Charges</h1>
                <p className="pricing-hero__subtitle">List of all charges and taxes</p>
                <div className="row  justify-content-center g-4">
                    <div className="col-4">
                        <img src="/media/images/pricing0.svg" alt="Equity delivery charges" className="pricing-card__image" />
                        <h2>Free equity delivery</h2>
                        <p>All equity delivery investments (NSE, BSE), are absolutely free — ₹0 brokerage.</p>
                    </div>
                    <div className="col-4">
                        <img src="/media/images/intradayTrades.svg" alt="Intraday and F&amp;O trades" className="pricing-card__image" />
                        <h2>Intraday and F&amp;O trades</h2>
                        <p>Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                    </div>
                    <div className="col-4">
                        <img src="/media/images/pricingMF.svg" alt="Direct mutual fund charges" className="pricing-card__image" />
                        <h2>Free direct MF</h2>
                        <p>All direct mutual fund investments are absolutely free — ₹0 commissions and no DP charges.</p>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Hero;