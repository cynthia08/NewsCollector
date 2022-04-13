import React from 'react'
import NavBar from '../NavBar'
import { useParams } from "react-router-dom";
import AllReactions from '../AllReactions'
import Footer from '../Footer'


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