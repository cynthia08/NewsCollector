import React,{ useState } from 'react'
import Piramid from '../Piramid'
import NavBar from '../NavBar'
import Footer from '../Footer'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import TopNewsProfile from '../TopNewsProfile';

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
