import React from 'react';
import RegistrationComponent from '../RegistrationComponent';
import Footer from '../Footer'
import NavBarHome from '../NavBarHome';


/*
********************************************************************************************
  Register main page.
********************************************************************************************
*/

function Register() {
  return (
    <div>
        <NavBarHome/>
        <RegistrationComponent/>
        <Footer/>
    </div>
  
  
  );
}

export default Register;
