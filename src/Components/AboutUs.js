import React from 'react'
import AboutComponent from './AboutComponent';
import { makeStyles } from '@material-ui/core/styles';


/*
********************************************************************************************
  AboutUs established the content for the AboutUs page.
********************************************************************************************
*/

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(10)
    }
  }));

function AboutUs() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AboutComponent/>
        </div>
        );

}

export default AboutUs
