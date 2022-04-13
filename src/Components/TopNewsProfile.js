import React from 'react'
import Piramid from './Piramid'
import './Piramid.css'
import { useContext, createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import UserContext from "./user-context"
import FetchService from "./services/fetchServices";




function TopNewsProfile() {
    const { userID } = useContext(UserContext);
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(10, 'auto'),
            width: theme.spacing(130),
            height: theme.spacing(75),
            background: "#F5F5F5",
          },
        },
      }));

      const classes = useStyles();
      const url = "https://jsonplaceholder.typicode.com/users"

      const { newsData, errorN, isLoadingN } = FetchService.useFetchNews(url)
      const { userData, error, isLoading } = FetchService.useFetchUser(url)
      console.log("here from top news ")
      console.log(userData.total_links);
  

    return (
        <div className={classes.root}>
            <Paper elevation={2}>
                <div className='piramid-menu-title'>
                    <b>Top News Sources:  </b>
                </div>  
                <div>
                  <Piramid 
                  newsData = {newsData}
                  loading = {isLoadingN}
                  totalLink = {userData.news_links}
                  loading2 = {isLoading}/>
                </div> 
            </Paper>
        </div>
    )
}

export default TopNewsProfile
