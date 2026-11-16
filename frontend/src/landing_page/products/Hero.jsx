import React from 'react';

function Hero() {
    return ( 
       <div className="container border-bottom mb-5">
        <div className="row">
            <div className="col text-center mt-12 p-12" style={{color: "#424242"}}>
                <h1 style={{fontSize: "28px"}}>Investly Products</h1>
                 <p style={{fontSize: "20px"}}> Sleek, modern, and intuitive trading platforms</p>
                  <p style={{fontSize: "16px"}}>Check out our <a href="#" style={{textDecoration: "none"}}>investment offerings → </a> </p>
            </div>
        </div>
       </div>
     );
}

export default Hero;