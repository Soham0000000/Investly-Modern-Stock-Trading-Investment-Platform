import React from 'react';

function LeftSection({imageURL,productName,productDescription,tryDemo,learnMore,googlePlay,appStore,}) {
    return ( 
        <div className="container mt-12">
            <div className="row p-5">
                <div className="col-6">
                    <img src={imageURL} alt=""/>
                </div>
                <div className="col-6 p-12" >
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <div className='mt-3'>
                        <a href={tryDemo}>Try Demo<i class="fa-solid fa-arrow-right-long"></i></a>
                        <a href={learnMore} style={{marginLeft: "50px"}}>Learn More<i class="fa-solid fa-arrow-right-long"></i></a>
                    </div>
                    <div className='mt-5'>
                        <a href={googlePlay}><img src="media/images/googlePlayBadge.svg" alt="play store" /></a>
                        <a href={appStore} style={{marginLeft: "20px"}}><img src="media/images/appstoreBadge.svg" alt="app store" /></a>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}

export default LeftSection;