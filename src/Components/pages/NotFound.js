import React from 'react';
import NavBarHome from '../NavBarHome';
import NotFoundComponent from '../NotFoundComponent';
import Footer from '../Footer'

/*
********************************************************************************************
  NotFound main page.
********************************************************************************************
*/

function NotFound() {
  return (
    <div>
        <NavBarHome/>
        <NotFoundComponent/>
        <Footer/>
        
        </div>
  )
}

export default NotFound