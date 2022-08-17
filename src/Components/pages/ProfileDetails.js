import React from 'react'
import ProfileGraphs from '../ProfileGraphs'
import NavBar from '../NavBar'
import Footer from '../Footer'

/*
********************************************************************************************
  Profile stats main page.
********************************************************************************************
*/

function ProfileDetails() {

    return (
        
        <div>
            <NavBar />
            <ProfileGraphs/> 
            <Footer/>
        </div>
    )
}

export default ProfileDetails
