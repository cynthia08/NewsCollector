import React from 'react'
import './css/Footer.css';
import LinkM from '@material-ui/core/Link';
import {Link} from 'react-router-dom'

/*
********************************************************************************************
  Footer component defines the footer content of the application.
********************************************************************************************
*/

function Footer() {
    return (
        <div className='footer-container'>
            <Link to='/' className='social-logo'>
                News Collector&nbsp; 
                <i class="fas fa-dice-d20"/>
            </Link>
            <small class='website-rights'>News Collector 2022</small>
            <div className='rwth-footer'>
                <h4>RWTH Aachen University&nbsp; &nbsp; | &nbsp; &nbsp;</h4> 
                <LinkM target='_blank' href='https://learntech.rwth-aachen.de/' color="inherit" className='other-footer'>
                 i9 Research Group - HCIC 
                </LinkM>

            </div>

        </div>
       
    )
}

export default Footer
