import React from 'react'
import NavBar from '../NavBar'
import Footer from '../Footer'
import {BrowserRouter as Router, useParams } from "react-router-dom";
import TopNewsProfile from '../TopNewsProfile';

/*
********************************************************************************************
  Top News Sources main page.
********************************************************************************************
*/

function TopNews() {   
    let { id } = useParams();
   
    return (
        <div>
            <NavBar />
            <TopNewsProfile />
            <Footer/>
        </div>
    )
}

export default TopNews
