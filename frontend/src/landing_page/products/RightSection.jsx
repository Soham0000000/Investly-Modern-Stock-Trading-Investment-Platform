import React from 'react';

function RightSection({productName , productDescription, LearnMore, imageURL}) {
    return ( 
        <div className="container mt-12">
            <div className="row p-5">
                <div className="col-6 mt-12">
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <div>
                        <a href={LearnMore}>Learn More <i class="fa-solid fa-arrow-right-long"></i></a>
                    </div>
                </div>
                <div className="col-6">
                    <img src={imageURL} alt="" />
                </div>
            </div>
        </div>
     );
}

export default RightSection;