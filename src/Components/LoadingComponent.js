import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './css/LoadingComponent.css'

/*
********************************************************************************************
  LoadingComponent auxiliary component that shows the progress status while content is loading.
********************************************************************************************
*/

function LoadingComponent() {


    return (
        <div className='loading-style'>
            <CircularProgress />
    
        </div>
        );
}

export default LoadingComponent;
