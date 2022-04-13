import React from 'react';
import ProfileMosaics from './ProfileMosaics';
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useContext, createContext } from 'react';
import UserContext from "./user-context";
import './Mosaics.css';
import NewProfileMosaics from './NewProfileMosaics';
import FetchService from "./services/fetchServices";
import { useHistory } from 'react-router-dom';
import LoadingComponent from './LoadingComponent';




function Mosaics() {
    
    const url = "https://jsonplaceholder.typicode.com/users"

    const { newsData, errorN, isLoadingN } = FetchService.useFetchNews(url);

    const { userData, error, isLoading } = FetchService.useFetchUser(url);
   
   
    //const newData= arrangeData();
    //const textArray = new Array(11).fill('10');
    const sizeArray = 10;
    /*
    const icons_obj1 ={
        news_name: 'BBC News',
        color_fill: '#4267b2',
        color_shadow: '#1a2947',
        images: 'images/ima1.png'
    }

    const icons_obj2 ={
        news_name: 'CNN',
        color_fill: '#282828',
        color_shadow: '#1a1a1a',
        images: ''
    }
    */

    //const icons_m = [icons_obj1, icons_obj2];
    //let numP = 70
    const percentageNum = 70;
    const numOne = 'BBC News'
    const percentage = ' of your Twitter content are news URLs';
    const topContributor =' Your top News Contributor is ';
    const numURLs = 100;
    const dateURLs = '09.09.2021'
    const { userID } = useContext(UserContext);
    const dateUser = '01/09/2021';
  
    
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(10, 'auto'),
            width: theme.spacing(105),
            height: theme.spacing(75),
            background: "#F5F5F5",
          },
        },
      }));

    const classes = useStyles();

    return ( 
       <div className={classes.root}>
        <Paper elevation={2}>

            <div className='mosaics-menu-title'>
                <b>Profile Results: </b>
            </div>
            <div>   
                <NewProfileMosaics
                    length={sizeArray}
                    user = {userData}
                    newsSrc = {newsData}
                    loading = {isLoadingN}
                />
            </div>

            <div>
                <Carousel showStatus={false} showThumbs={false} className='carousel-style'>
                    <div key="slide1" className='carousel-item-style'>
                        {isLoading 
                            ? 'Loading...' 
                            : <p><b>{((userData.news_links*100)/userData.total_links).toFixed() }%</b> of your Twitter content are News URLs</p>
                        }
                        
                    </div>
                    <div key="slide2" className='carousel-item-style'>
                        {isLoadingN 
                            ? 'Loading...' 
                            : <p>{topContributor}<b>{newsData.grouped_stats["1"].source_name}</b></p>
                        }
                        
                    </div>
                    <div key="slide3" className='carousel-item-style'>
                        {isLoadingN 
                            ? 'Loading...' 
                            : <p>Found <b>{userData.news_links}</b> URLs since <b>{new Date (userData.date_created).toLocaleDateString()}</b></p>
                        }
                        
                    </div>
                </Carousel>
            </div>
            
        </Paper>
        </div>
    )
}

export default Mosaics;
