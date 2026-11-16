import React from 'react';

const cardStyle = {
  backgroundColor: "white",
  color: "black",
  border: "none",
};
function Pricing() {
    return (  
        <div className="container">
            <div className="row mt-8">
                <div className="col-6">
                    <div className="card" style={cardStyle}>
                        <div className="card-body">
                            <h4 className="card-title">Unbeatable pricing</h4>
                            <p className="card-text fs-lg py-5">We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                            <a href="#" style={{textDecoration: "none"}}>See pricing<i className="fa-solid fa-arrow-right-long"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-6 d-flex justify-items-end">
                    <div className='d-flex '>
                        <img src="media/images/pricing0.svg" alt="" style={{maxWidth: "auto", width: "100px"}} />
                        <p className='fs-xs'> Free account<br/>opening</p>
                    </div>
                    <div className='d-flex'>
                        <img src="media/images/pricing0.svg" alt="" style={{maxWidth: "auto", width: "100px"}} />
                        <p className='fs-xs' >Free equity delivery <br/>and direct mutual funds</p>
                    </div>
                    <div className='d-flex'>
                        <img src="media/images/intradayTrades.svg" alt="" style={{maxWidth: "auto", width: "100px"}} />
                        <p className='fs-xs'> Intraday and<br/>F&O</p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Pricing;