import React, { useState }  from 'react'
import HomeComponent from '../HomeComponent';
import Footer from '../Footer'
import NavBarHome from '../NavBarHome';


/*
********************************************************************************************
  Home main page.
********************************************************************************************
*/

function Home() {

    return (
        <div>
            <NavBarHome/>
            <HomeComponent/>
            <Footer/>
        </div>
    )
}

export default Home
