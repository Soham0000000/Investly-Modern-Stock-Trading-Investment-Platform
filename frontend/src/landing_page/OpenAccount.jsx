import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
    return ( 
        <div className="container p-5 mb-8 my-6">
            <h1  className='text-center mt-5'>Open an Investly account</h1>
            <p className='text-center fs-lg fw-normal'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
            <div className='text-center mb-12'>
                <Link className='btn btn-solid theme-primary mt-5 fs-lg px-8 fw-medium lh-sm' to='/signup'>Sign up for free</Link>
            </div>
            
        </div>
     );
}

export default OpenAccount;