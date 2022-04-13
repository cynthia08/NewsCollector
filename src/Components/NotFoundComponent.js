import React from 'react'
import Button from '@material-ui/core/Button';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import './NotFoundComponent.css'

function NotFoundComponent() {
  return (
    <div className='not-found-main'>
        <div className='icon-not-found'>
            <NotListedLocationIcon style={{ fontSize: 100, color: "#2583A8" }}/>
        </div>
        <div className='text-not-found'>
            <h1>404 - Page not found </h1>
            <p>Sorry, we can't find what you are looking for.</p>
            <Button variant="contained" color="primary" href='/'>
                Go back Home
            </Button>
        </div>
       


    </div>
  )
}

export default NotFoundComponent