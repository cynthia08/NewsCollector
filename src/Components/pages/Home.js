import React, { useState }  from 'react'
import HomeComponent from '../HomeComponent';
import Footer from '../Footer'
import UserContext from "../user-context"
import NavBarHome from '../NavBarHome';

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
