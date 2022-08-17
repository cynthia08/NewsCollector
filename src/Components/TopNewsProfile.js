import React from 'react'
import Piramid from './Piramid'
import './css/Piramid.css'
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import UserContext from "./user-context"
import FetchService from "./services/fetchServices";

/*
********************************************************************************************
  TopNewsProfile auxiliary component that call the main content for Top News Sources.
********************************************************************************************
*/

function TopNewsProfile() {
    const { userID } = useContext(UserContext);
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(10, 'auto'),
            width: theme.spacing(140),
            height: "auto",
            background: "#F5F5F5",
          },
        },


      }));

      const classes = useStyles();

      const { userTweets, errorUserTweets, isLoadingUserTweets } = FetchService.useFetchTweetNews();

    return (
        <div className={classes.root}>
            <Paper elevation={2}>
                <div className='piramid-menu-title'>
                    <b>Top News Sources  </b>
                </div>  
                <div>
                 
                      <Piramid 
                        newsData = {userTweets}
                        loading = {isLoadingUserTweets}
                        errorTweets = {errorUserTweets}
                      />

                 
                </div> 
            </Paper>
        </div>
    )
}

export default TopNewsProfile
