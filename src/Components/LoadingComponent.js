import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LoadingComponent.css'
import { makeStyles } from '@material-ui/core';



function LoadingComponent() {


    return (
        <div className='loading-style'>
            <CircularProgress />
        


        </div>
        );
}

export default LoadingComponent;
