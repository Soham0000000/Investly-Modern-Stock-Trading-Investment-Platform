import React from 'react';
import './pricing.css';

function Bokarage() {
    const accountCharges = [
        { type: 'Individual account', charge: 'Free' },
        { type: 'Minor account', charge: 'Free' },
        { type: 'NRI account', charge: '₹500' },
        { type: 'HUF account', charge: 'Free(online)/₹500(offline)' },
        { type: 'Partnership, LLP, and Corporate accounts (offline only)', charge: '₹500' },
    ];
    return (
        <section className="account-charges-section">
            <div className="container">
                <p className="calculator-link text-center">
                    <a href="#">Calculate your costs upfront</a> using our brokerage calculator
                </p>

                <h2 className="account-charges-title">Charges for account opening</h2>
                <div className="account-charges-table-wrap">
                    <table className="account-charges-table">
                        <thead>
                            <tr>
                                <th scope="col">Type of account</th>
                                <th scope="col">Charges</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountCharges.map((account) => (
                                <tr key={account.type}>
                                    <td>{account.type}</td>
                                    <td>
                                        {account.charge.toLowerCase().startsWith('free') ? (
                                            <span className="free-charge">{account.charge}</span>
                                        ) : account.charge}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </section>
    );
}

export default Bokarage;