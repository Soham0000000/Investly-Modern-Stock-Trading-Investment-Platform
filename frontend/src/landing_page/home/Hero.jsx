import React from 'react';

function Hero() {
    return ( 
        <div className="container p-5 mb-8">
            <div className="row">
               <img src="media/images/homeHero.png" alt=" hero image loading.." className='mb-8'/>
            </div>
            <h1  className='text-center mt-5'>Invest in everything</h1>
            <p className='text-center fs-lg fw-normal'>Online platform to invest in stocks, IPOs, derivatives, mutual funds, ETFs, bonds, and more.</p>
            <div className='text-center'>
                <button className='btn btn-solid  theme-primary mt-5 fs-lg px-8 fw-medium lh-sm 'disabled>Sign up for free</button>
            </div>
            
        </div>
     );
}

export default Hero;