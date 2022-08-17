import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LoadingComponent from './LoadingComponent';
import FetchService from "./services/fetchServices";
import * as helpers from './services/helpers';
import { ResponsiveBar } from '@nivo/bar';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import './css/ProfileGraphs.css';
import ErrorComponent from './ErrorComponent';
import EmptyData from './EmptyData';
import DialogFileUpload from './DialogFileUpload';
import authService from './services/authServices';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import NotEnoughInfo from './NotEnoughInfo';


/*
********************************************************************************************
  ProfileGraphs creates content for the Profile Stats graphs.
********************************************************************************************
*/

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function getData(authors, reactionsP){
    const dataGrap = helpers.arrangeDataGraph(authors, reactionsP);
    return dataGrap.sort(helpers.orderById('Tweets', 'asc'));;


}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(10, 'auto'),
        width: theme.spacing(120),
        height: "auto",
        background: "#F5F5F5",
      },
    },
    breadcrumbs: {
        fontSize: 14

    }
  }));

function ProfileGraphs() {
    const { userTweets, errorUserTweets, isLoadingUserTweets } = FetchService.useFetchTweetNews();
    const { reactionsP, errorRP, isLoadingRP } = FetchService.useFetchReactionsP();
    const [showSettings, setShowSettings] = useState(false);
    const [showWarningFile, setShowWarningFile] = useState(false);


    const handleCloseUser = (event, reason) => {
        //if(reason !== "backdropClick" && authService.isFileLoadedJSON(0)){
            setShowSettings(false);
        //}
    };

    const handleCloseWarning = (event, reason) => {
        setShowWarningFile(false);
    };

    useEffect(() => {
        if(authService.isFileLoadedJSON(0)===null){
            setShowWarningFile(true);
        }
        
    }, [authService.getJSONData(0)])

   
    let data =[];
    const classes = useStyles();


    if (isLoadingUserTweets || isLoadingRP ){
        return <LoadingComponent/>

    }else{
        const aux = helpers.groupAuthors(userTweets).sort(helpers.orderById('num_links', 'desc'));

        if(errorUserTweets.includes("Error:") || errorRP.includes("Error:") ){
            return (
                <div className={classes.root}>
                    <Paper elevation={2}>
            
                        <div className='profile-graph-title'>
                            <b>Profile Stats </b> <br/>
                            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                                <Link color="inherit" href='/NewsCollector/profile' >
                                    Your Profile Results
                                </Link>
                                <Link  color="textPrimary"  aria-current="page" >
                                    Profile Stats
                                </Link>
                            </Breadcrumbs>
                            <ErrorComponent/>
                        </div>
                    </Paper>
                </div>

            );

        } else if(userTweets.length===0){
            return (
                    <div className={classes.root}>
                    <Paper elevation={2}>
                        <div className='profile-graph-title'>
                            <b>Profile Stats </b> <br/>
                            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                                <Link color="inherit" href='/NewsCollector/profile' >
                                    Your Profile Results
                                </Link>
                                <Link  color="textPrimary"  aria-current="page" >
                                    Profile Stats
                                </Link>
                            </Breadcrumbs>
                            <EmptyData/>
                        </div>
                    </Paper>
                </div>
            );

        } else if (aux.length < 3){
            return (
                <div className={classes.root}>
                <Paper elevation={2}>
                    <div className='profile-graph-title'>
                        <b>Profile Stats </b> <br/>
                        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                            <Link color="inherit" href='/NewsCollector/profile' >
                                Your Profile Results
                            </Link>
                            <Link  color="textPrimary"  aria-current="page" >
                                Profile Stats
                            </Link>
                        </Breadcrumbs>
                        <NotEnoughInfo/>
                    </div>
                </Paper>
            </div>
        );
        }else{
            const authors = helpers.groupAuthors(userTweets).sort(helpers.orderById('num_links'));

            data = getData(authors, authService.isFileLoadedJSON(0)===null ? reactionsP : authService.getJSONData(0) ); 


        }

      
    }

  return (
      <div>
    <div className={classes.root}>
        <Paper elevation={2}>

            <div className='profile-graph-title'>
                <b>Profile Stats </b> <br/>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                  <Link color="inherit" href='/NewsCollector/profile' >
                    Your Profile Results
                  </Link>
                  <Link  color="textPrimary"  aria-current="page" >
                    Profile Stats
                  </Link>
                </Breadcrumbs>

            </div>
            <div>  
            <div className='container-graph-profile-details'>
                  <ResponsiveBar
                      data={data}
                      keys={["Tweets", "Likes", "Retweets"]}
                      indexBy="Name"
                      margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
                      padding={0.2}
                      valueScale={{ type: "linear" }}
                      colors={["#3182CE", "#3CDBDE",  "#A82054"]}
                      animate={true}
                      layout="horizontal"
                      groupMode="grouped"
                      enableLabel={false}
                      enableGridX={true}
                      enableGridY={false}
                      axisTop={null}
                      axisRight={null}
                      axisLeft={{
                          tickSize: 6,
                          tickPadding: 9,
                          tickRotation: 0,
                          format: (v) => {
                            return v.length > 5 ? (
                                <tspan>
                                {v.substring(0, 5) + "..."}
                                <title>{v}</title>
                                </tspan>
                            ) : (
                                v
                            );
                            },

                        
                      }}
                      axisBottom={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                          legendPosition: 'middle',
                          legendOffset: 32
                          
                      }}
                      legends={[
                          {
                              dataFrom: 'keys',
                              anchor: 'bottom-right',
                              direction: 'column',
                              justify: false,
                              translateX: 120,
                              translateY: -40,
                              itemsSpacing: 2,
                              itemWidth: 100,
                              itemHeight: 20,
                              itemOpacity: 0.85,
                              symbolSize: 15,
                              effects: [
                                  {
                                      on: 'hover',
                                      style: {
                                          itemOpacity: 1
                                      }
                                  }
                              ]
                          }
                      ]}
                      
                      />
                      
                </div> 
                <div className='container-graph-profile-footer'>
                    <h5>Graph shows the amount of posts collected vs the number of your reactions (liked and retweeted posts) grouped by News Source.</h5>
                </div>

            
            </div>
        </Paper>
       
    </div>
     <DialogFileUpload
        setShowSettings = {setShowSettings}
        setShowWarningFile = {setShowWarningFile}
        c_open = {showSettings}
        close = {handleCloseUser} >

    </DialogFileUpload>
   
    </div>
  )
}

export default ProfileGraphs