import React from 'react';
import Bokarage from './Brokarage';
import Hero from './Hero';
import ChargesSection from './ChargesSection';
import DematAccount from './DematAccount';
import OptionSevices from './OptionalServices';
import Disclaimer from './Disclaimer';

function PricingPage() {
    return ( 
        <>
            <Hero/>
            <ChargesSection/>
            <Bokarage/>
            <DematAccount/>
            <OptionSevices/>
            <Disclaimer/>
        </>
     );
}

export default PricingPage;