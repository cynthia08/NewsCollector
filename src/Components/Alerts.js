import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '50%',
      
    },
  }));
  

class SelectAlerts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openSucess: this.props.showSuccess,
            openError: false,
            openInfo: false

        }
      }

    render(){
        console.log("here call from alers");

        const handleClose = (event, reason) => {
            console.log('close')
            if (reason === 'clickaway') {
            return;
            }
            this.setState({openSucess: false});
            
      };

    return (
        <div>
            <Snackbar open={this.state.openSucess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                This is a success message!
                </Alert>
            </Snackbar>

        </div>


  );

    }
   

    
}

export default SelectAlerts;
