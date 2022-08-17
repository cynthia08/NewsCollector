import React from 'react'
import AllSources from '../AllSources'
import NavBar from '../NavBar'
import Footer from '../Footer'

/*
********************************************************************************************
  All sources view main page.
********************************************************************************************
*/

function Sources() {
    return (
        <div>
            <NavBar />
            <AllSources/>  
            <Footer/>
        </div>
    )
}

export default Sources
