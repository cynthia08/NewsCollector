import React,{useEffect, useState} from 'react';
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './css/Mosaics.css';
import NewProfileMosaics from './NewProfileMosaics';
import FetchService from "./services/fetchServices";
import authService from './services/authServices';
import * as helpers from './services/helpers';
import DialogFileUpload from './DialogFileUpload';
import { useHistory, useLocation } from "react-router-dom";

/*
********************************************************************************************
  Mosaics defines the content for the Profile Results.
********************************************************************************************
*/

function Mosaics() {
    

    const { userTweets, errorUserTweets, isLoadingUserTweets } = FetchService.useFetchTweetNews();
    const { allTweets, errorAllTweets, isLoadingAllTweets } = FetchService.useFetchAllTweets();
    const { reactionsP, errorRP, isLoadingRP } = FetchService.useFetchReactionsP();
    const [showSettings, setShowSettings] = useState(false);
    const [showWarningFile, setShowWarningFile] = useState(false);

    const history = useHistory();

    
    let newReactions;

    if(authService.isFileLoadedJSON(0)){
        newReactions = authService.getJSONData(0)
    }

    const sizeArray = 10;
    const topContributor =' Your top News Contributor is ';

    const handleCloseUser = (event, reason) => {
        setShowSettings(false);
            
    };

    const handleCloseWarning = (event, reason) => {
        setShowWarningFile(false);
    };

    useEffect(() => {
     /*
        if(history.location.state !== undefined ){ //must be undefined
            if(history.location.state.from === 'home' && authService.isFileLoadedJSON(0)===null){
                setShowSettings(true);
            }
            else{
                setShowSettings(false);
            }
        }else{
            setShowSettings(false);
        }
        if(authService.isFileLoadedJSON(0)===null){
            setShowWarningFile(true);
        }
        */
        
    }, [authService.getJSONData(0)])
    
    
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            minWidth: theme.spacing(105),
            margin: theme.spacing(10, 'auto'),
            width: theme.spacing(105, 'auto'),
            height: theme.spacing(80, 'auto'),
            background: "#F5F5F5",
          },
        },
        containerP1: {
            display: 'flex',
            flexDirection: 'column'
        },
        carrousel: {
            marginBottom: theme.spacing(3),
        }

      }));

    const classes = useStyles();

    return ( 
        <div>
       <div className={classes.root}>
        <Paper elevation={2}>
            <div className={classes.containerP1}>
                <div className='mosaics-menu-title'>
                    <b>Profile Results </b>
                </div>
                <div>   
                    
                    <NewProfileMosaics
                        length={sizeArray}
                        newsSrc = {userTweets}
                        reactions = { authService.isFileLoadedJSON(0)===null ?reactionsP : authService.getJSONData(0) }
                        loadingAllN ={isLoadingUserTweets}
                        loadingAllR ={isLoadingRP}
                        errorTweets = {errorUserTweets}
                        errorReact = {errorRP}
                        setShowSettings ={setShowSettings}

                    />
                </div>

                <div className={classes.carrousel}>
                    { userTweets.length ===0 ? 
                    
                    <div>
                    <Carousel showStatus={false} showThumbs={false} className='carousel-style'>
                        <div key="slide1" className='carousel-item-style'>
                            <p>Loading...</p>
                        </div>
                    </Carousel>
                    </div>
                    
                    :
                    <Carousel showStatus={false} showThumbs={false} className='carousel-style'>
                    
                        <div key="slide1" className='carousel-item-style'>
                            {isLoadingUserTweets 
                                ? 'Loading...' 
                                :  <p>Found <b style={{fontSize:"18px"}}>{userTweets.length}</b> tweets with News content</p>
                            
                            }
                            
                            
                        </div>
                        <div key="slide2" className='carousel-item-style'>
                            {isLoadingUserTweets  
                                ? 'Loading...' 
                                : <p>{topContributor}<b style={{fontSize:"18px"}}>{helpers.groupAuthors(userTweets).sort(helpers.orderById('num_links', 'desc'))[0].username}</b></p>
                                
                            }
                        
                            
                        </div>
                        <div key="slide3" className='carousel-item-style'>
                            {isLoadingUserTweets && isLoadingAllTweets
                                ? 'Loading...' 
                                : 
                                <p><b style={{fontSize:"18px"}}>{((userTweets.length*100)/allTweets.total).toFixed() }%</b> of your Twitter content are News related tweets</p>
                            }
                        
                            
                        </div>
                    </Carousel>
                    }
                </div>
            </div>
            <DialogFileUpload
                setShowSettings = {setShowSettings}
                setShowWarningFile = {setShowWarningFile}
                c_open = {showSettings}
                close = {handleCloseUser} >

            </DialogFileUpload>
        </Paper>
        </div>
            
        </div>
    )
}

export default Mosaics;
