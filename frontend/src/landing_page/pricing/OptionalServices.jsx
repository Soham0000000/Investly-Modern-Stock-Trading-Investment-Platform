import React from 'react';
import './pricing.css';
function OptionSevices() {
   const services = [
        {Service:'Tickertape',BillingFrequency:'Monthly / Quarterly / Annual',Charges:'Free: 0 | Pro: 249/699/2399'},
        {Service:'Smallcase',BillingFrequency:'	Per transaction',Charges:'Buy & Invest More: 100 | SIP: 10'},
        {Service:'Kite Connect',BillingFrequency:'Monthly',Charges:'Connect: 500 | Personal: Free'},
   ]
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2 className='account-charges-title  mt-12'>Charges for optional value added services</h2>
                    <div className='account-charges-table-wrap'>
                        <table className='account-charges-table'>
                            <thead>
                        <tr>
                            <th scope='col'>Service</th>
                            <th scope='col'>Billing Frequency</th>
                            <th scope='col'>Charges</th>
                        </tr>
                        </thead>
                        <tbody>
                            {services.map((ser)=>(
                                <tr key={ser.Service}>
                                    <td>{ser.Service}</td>
                                    <td>{ser.BillingFrequency}</td>
                                    <td>{ser.Charges}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default OptionSevices;