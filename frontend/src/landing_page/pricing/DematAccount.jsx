import React from 'react';
import './pricing.css';

function DematAccount() {

     const dematAMC = [
        {ValueOfHoldings:'Up to ₹4 lakh', AMC: 'Free'},
        {ValueOfHoldings:'₹4 lakh – ₹10 lakh', AMC: '₹100 per year + 18% GST, charged quarterly'},
        {ValueOfHoldings:'Above ₹10 lakh', AMC: '₹300 per year + 18% GST, charged quarterly'}
    ];

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-12">
        <h2 className="account-charges-title mt-12 pt-12">Demat AMC (Annual Maintenance Charge)</h2>
                <h5 className='first-free'>Free for first year*</h5>
                <p className="fs-xs pt-3">From second year onwards, for BSDA accounts:</p>
                <div className="account-charges-table-wrap">
                <table className='account-charges-table'>
                    <thead>
                        <tr>
                            <th scope='col'>Value of holdings</th>
                            <th scope='col'>AMC</th>
                        </tr>
                        </thead>
                        <tbody>
                            {dematAMC.map((account)=>(
                                <tr key={account.ValueOfHoldings}>
                                    <td>{account.ValueOfHoldings}</td>
                                    <td>
                                        {account.AMC.toLowerCase().startsWith('free') ? (<span className='free-charge'>{account.AMC}</span>) : account.AMC}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>
                </div>
                <p className="fs-xs pt-5">For a non-BSDA account, AMC is ₹300 per year + 18% GST, regardless of holdings value, charged quarterly.</p>
                <p className="fs-xs">To learn more about BSDA, click here. To learn more about AMC, <a href="" style={{textDecoration:"none"}}>click here</a>.</p>
                <p className="fs-xs">*Resident individual accounts only.</p>
                </div>
            </div>
        </div>
     );
}

export default DematAccount;