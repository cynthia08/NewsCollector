import React from 'react'
import NavBar from '../NavBar'
import Footer from '../Footer'
import GraphDetail from '../GraphDetail.js'

/*
********************************************************************************************
  Graph view main page.
********************************************************************************************
*/

function GraphView() {
  return (
    <div>
        <NavBar />
        <GraphDetail/> 
        <Footer/>
    </div>
  )
}

export default GraphView