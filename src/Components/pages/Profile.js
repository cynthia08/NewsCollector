import React, { useState } from 'react'
import Mosaics from '../Mosaics'
import NavBar from '../NavBar'
import Footer from '../Footer'
import { useLocation } from "react-router-dom";
import { useContext, createContext } from 'react';
import UserContext from "../user-context"



function Profile() {
    /*
    const location = useLocation();
    const value = location.state.pvalue;
    alert("aqui desde profile "+location.state.pvalue);

    */

    return (
        
        <div>
            <NavBar />
            <Mosaics/> 
            <Footer/>
        </div>
    )
}

export default Profile
