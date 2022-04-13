import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './NavBarHome.css'

function NavBarHome() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/login" className="navbar-logo">  
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
