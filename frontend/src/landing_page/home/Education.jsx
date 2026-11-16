import React from 'react';

function Education() {
    return (  
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <img src="media/images/education.svg" alt="" />
                </div>
                <div className="col-6 my-12">
                    <h3 className='my-12'>Free and open market education</h3>
                    <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href="#" style={{textDecoration: "none"}}>Varsity <i className="fa-solid fa-arrow-right-long"></i></a>
                    <p className='my-6'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href="#" style={{textDecoration: "none"}}>TradingQ&A  <i className="fa-solid fa-arrow-right-long"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Education;