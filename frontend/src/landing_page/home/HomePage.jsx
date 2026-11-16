import React from 'react';
import Hero from './Hero';
import Trust from './Trust';
import Education from './Education';
import Stats from './Stats';
import Pricing from './Pricing';

import OpenAccount from "../OpenAccount";
import Navbar from "../Navbar";
import Footer from "../Footer";

function HomePage() {
    return ( 
        <>
            <Hero/>
            <Trust/>
            <Stats/>
            <Pricing/>
            <Education/>
            <OpenAccount/>
        </>
     );
}

export default HomePage;