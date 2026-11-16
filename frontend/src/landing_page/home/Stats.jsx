import React from 'react';
import { Link } from 'react-router-dom';

function Stats() {
    return ( 
        <div className="container mt-8 p-8 ">
            <div className="row bg-primary p-2 bg-10" >
                <div className="col-12 d-flex justify-content-around justify-items-center ">
                    <img src="media/images/kitBtn.svg" alt="" style={{maxWidth: "auto", width: "200px"}} className='mx-8'/>
                    <p>Need more? Build your own trading and investing experience with Kite Connect, simple HTTP APIs to place orders, stream market data, manage your account, and more.<Link to="/signup?mode=login" style={{textDecoration:"none"}}> Explore <i className="fa-solid fa-arrow-right-long"></i></Link></p>
                    <img src="media/images/kitBanner.svg" alt="" style={{width: "200px"}}/>
                </div>
            </div>
        </div>
     );
}

export default Stats;