import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

/*
********************************************************************************************
  ErrorComponent auxiliary component displayed when error occurs.
********************************************************************************************
*/

const useStyles = makeStyles((theme) => ({
   
    info: {
      marginTop: theme.spacing(2),
      height: theme.spacing(40),
      textAlign : "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"

    }
  }));

  

function ErrorComponent(props) {

    const classes = useStyles();
  
    return (
        <div className={classes.info}>
            <Typography color="inherit" variant='h6' gutterBottom>
                Sorry something went wront. 
            </Typography>
            <Typography color="inherit" variant='subtitle2' gutterBottom>
                Internal server error.
            </Typography>
            <Typography color="inherit" variant='subtitle2' gutterBottom>
                {props.message}
            </Typography>
           
        </div>
  )
}

export default ErrorComponent