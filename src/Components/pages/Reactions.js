import React from 'react'
import NavBar from '../NavBar'
import { useParams } from "react-router-dom";
import AllReactions from '../AllReactions'
import Footer from '../Footer'

/*
********************************************************************************************
  All reactions view main page.
********************************************************************************************
*/

function Reactions() {

  return (
    <div>
         <NavBar />
         <AllReactions/>
         <Footer/>

    </div>
  )
}

export default Reactions