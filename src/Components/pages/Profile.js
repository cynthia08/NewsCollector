import React, { useState } from 'react'
import Mosaics from '../Mosaics'
import NavBar from '../NavBar'
import Footer from '../Footer'

/*
********************************************************************************************
  Profile Results main page.
********************************************************************************************
*/

function Profile() {
    return (
        
        <div>
            <NavBar />
            <Mosaics/> 
            <Footer/>
        </div>
    )
}

export default Profile
