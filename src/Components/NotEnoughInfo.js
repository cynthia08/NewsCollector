import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

/*
********************************************************************************************
  NotEnoughInfo auxiliary component displayed when user's account has not enough content to 
  show results.
********************************************************************************************
*/

const useStyles = makeStyles((theme) => ({
   
    info: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(10),
      height: theme.spacing(40),
      width: theme.spacing(80),
      textAlign : "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"

    }
  }));

function NotEnoughInfo() {

    const classes = useStyles();


  return (
    
         <div className={classes.info}>
            <Typography color="inherit" variant='h6'>
                Not enough data to analyze results. Continue using browser extension to collect more tweets.
                (Applications needs to have collected at least 3 different News Sources for better results)
            </Typography>
        </div>
   
  )
}

export default NotEnoughInfo
