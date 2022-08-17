import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './css/NavBarHome.css'

/*
********************************************************************************************
  NavBarHome defines the content for navigation bar when user is not login.
********************************************************************************************
*/

function NavBarHome() {

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">  
                        <i class="fa-solid fa-face-smile-upside-down"></i>
                        <i class="fas fa-dice-d20 fa-2x"/>
                        <div className="navbar-name">
                            <b>News Collector</b>
                        </div>
                    </Link>
                </div>

            </nav>
            
        </div>
    )
}

export default NavBarHome
