import React from 'react'
import ComparisonView from '../ComparisonView'
import NavBar from '../NavBar'
import Footer from '../Footer'

/*
********************************************************************************************
  Global Stats main page.
********************************************************************************************
*/

function Comparison() {
    return (
        <div>
            <NavBar />
            <ComparisonView/>
            <Footer/>
            
        </div>
    )
}

export default Comparison
