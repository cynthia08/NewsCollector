import React,{useState,useEffect, Component} from 'react'
import './AboutUs.css'
import { HiOutlinePuzzle } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { CgBrowser } from "react-icons/cg";
import { useContext, createContext } from 'react';
import UserContext from "./user-context"
import Logo from "../assets/images/logo1.png"

const baseURL = "https://jsonplaceholder.typicode.com/users"


function AboutUs() {
    const style = {
        fontWeight: '900',
        textDecorationLine: 'underline'
    };
    const { userID } = useContext(UserContext);
    


    return (
        <div className='content-about'>
            <h2>How our plugin works: {userID}</h2>
            <div>
    </div>
            <div className='content-list'>
                <ol>
                    <li className='li-personalized'>
                        <HiOutlinePuzzle size={35}/>  &nbsp; 
                        Once installed in your browser, the plugin collects Twitter data.<br/>
                        It <b style={{style}}>only</b> collects URLs content information and liked Tweets, <b>no personal data</b> is collected.
                    </li>
                    <li className='li-personalized'>
                        <FiSettings size={35}/> &nbsp; 
                        The plugin analyzes the data for news content.
                    </li>
                    <li className='li-personalized'>
                        <CgBrowser size={35}/> &nbsp; 
                        The Web page shows your results and analyzed data.
                    </li>
                </ol>
            </div>
            <br/>
            <h2>Our Research</h2> &nbsp; 
            <p>
            Our research focuses on the effects of social media on opinion formation. A lot of human interaction and information exchange is
taking place on Social Media. This may have drastic effects on society. Therefore, making social media platforms an important subject to study. The
recommendation algorithms running in the background of these social media sites add an additional layer of
complexity by filtering the information based on the user's history, likes, and comments, which in turn influence
the opinion of the people interacting with it. To understand this complex process of opinion formation we want
to understand the way users receive content from such recommendation systems and their reactions (in the
form of comments or shares) on them.
            </p>
            <div className="logo-footer">
                <img src={Logo} height='100' width='400'></img>
            </div>
            

        </div>
    )
}

export default AboutUs
//fetchingAPI(baseURL)(UsingHoc)