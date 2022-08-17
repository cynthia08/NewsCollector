import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import imageExtension from '../assets/images/extension.png'
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

/*
********************************************************************************************
  EmptyData auxiliary component displayed when user's account has no content (new account
    without tweets collected)
********************************************************************************************
*/

const useStyles = makeStyles((theme) => ({
   
    info: {
      marginTop: theme.spacing(2),
      height: theme.spacing(40),
      textAlign : "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"

    }
  }));

  

function EmptyData() {

    const classes = useStyles();

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 300,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
      }))(Tooltip);

  
    return (
        <div className={classes.info}>
            <Typography color="inherit" variant='h6'>No data found. Enable browser extension to collect Twitter data</Typography>
            <HtmlTooltip className={classes.tooltip}
                title={
                <React.Fragment>
                    <Typography color="inherit">How to enable extension?</Typography><br/>
                    <img src={imageExtension} height='200' width='285'/>
                    <b>{'Click on toogle button to enable the browser extension '}</b> 
                </React.Fragment>
                }>
                <IconButton aria-label="help" >
                    <HelpIcon fontSize="small" />
                </IconButton>
            </HtmlTooltip>
        </div>
  )
}

export default EmptyData