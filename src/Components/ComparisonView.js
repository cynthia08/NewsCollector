import React,{useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { indigo } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import { ResponsiveBar } from '@nivo/bar';
import { useContext } from 'react';
import UserContext from "./user-context";
import FetchService from "./services/fetchServices";
import LoadingComponent from './LoadingComponent';
import './css/ComparisonView.css';
import * as helpers from './services/helpers';
import authService from './services/authServices';
import EmptyData from './EmptyData';
import ErrorComponent from './ErrorComponent';
import DialogFileUpload from './DialogFileUpload';
import NotEnoughInfo from './NotEnoughInfo';


/*
********************************************************************************************
  ComparisonView defines and arranges the content for the Global Stats page.
********************************************************************************************
*/

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 730,
      marginTop: 80,
      fontFamily: `"Poppins", sans-serif`,
      backgroundColor: "#FAFAFA",
    },
    nTitle:{
        fontFamily: `"Poppins", sans-serif`,
    },
    nSubtitle:{
        fontFamily: `"Poppins", sans-serif`,
    },
    media: {
      height: 0,
      paddingTop: '20%', 
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar1: {
      backgroundColor: indigo[500],
    },
    container: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(0.5),
        }
    },
    container2: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
        margin: theme.spacing(0.5),
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
  }));


function getData(userTweets, globalStats, userReactions, reactionsG){
    const authors = helpers.groupAuthors(userTweets).sort(helpers.orderById('num_links', 'desc'));
    
    const chipPersonal = {
        top1: authors[0].username,
        top2: authors[1].username,
        top3: authors[2].username
    }

    const tooltipPersonal ={
        top1: authors[0].num_links,
        top2: authors[1].num_links,
        top3: authors[2].num_links
    }

    const chipGlobal = {
        top1: globalStats[0].username,
        top2: globalStats[1].username,
        top3: globalStats[2].username
    }

    const tooltipGlobal ={
        top1: globalStats[0].totalNumberOfTweets,
        top2: globalStats[1].totalNumberOfTweets,
        top3: globalStats[2].totalNumberOfTweets
    }    
    

    const aux = globalStats.sort(helpers.orderById('totalNumberOfTweets', 'asc'));

    const formatGlobal = aux.map(({
        username: Name,
        totalNumberOfTweets: Global,
        numberOfTweetsByUser: Personal,
        ...rest
      }) => ({
        Name,
        Global,
        Personal,
        ...rest
      }));
      
      const newData ={
          chip1: chipGlobal,
          chip2: chipPersonal,
          tooltip1: tooltipGlobal,
          tooltip2: tooltipPersonal,
          graph1: formatGlobal,
          graph3: helpers.countOcurrences(userReactions, reactionsG, 0).sort(helpers.orderById('Global', 'asc')),
          graph4: helpers.countOcurrences(userReactions, reactionsG, 1).sort(helpers.orderById('Global', 'asc'))
          
      }


      return newData;
}

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 300,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

function ComparisonView() {
    const classes = useStyles();
    const [showSettings, setShowSettings] = useState(false);
    const [showWarningFile, setShowWarningFile] = useState(false);

    const { userID } = useContext(UserContext);

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
    
    const handleClickChip = (id) =>{
        const url = "https://twitter.com/"+id;
        window.open(url, "_blank");
    }

      const { userTweets, errorUserTweets, isLoadingUserTweets } = FetchService.useFetchTweetNews();
      const { globalStats, errorGS, isLoadingGS } = FetchService.useFetchGlobalStats();
      const { reactionsP, errorRP, isLoadingRP } = FetchService.useFetchReactionsP();
      const  { reactionsG, errorGP, isLoadingGP } = FetchService.useFetchReactionsG();

      
      
      let data =[];
  

      if (isLoadingUserTweets || isLoadingGS || isLoadingRP || isLoadingGP){
        return <LoadingComponent/>
      }else{
          const aux = helpers.groupAuthors(userTweets).sort(helpers.orderById('num_links', 'desc'));

          if(errorUserTweets.includes("Error:") || errorGS.includes("Error:") || errorRP.includes("Error:") || errorGP.includes("Error:")){
              return (
                        <div className="container-cards">
                        <Card className={classes.root}>
                            <CardHeader classes={{ title: 'nTitle', subheader: 'nSubtitle' }}
                                title="Global Results"
                                subheader="Statistics from other users using the plugin"
                            />
                             <ErrorComponent/>
                        </Card>
                    </div>
             
              )
          }else if(userTweets.length===0){
              return (
                        <div className="container-cards">
                            <Card className={classes.root}>
                                <CardHeader classes={{ title: 'nTitle', subheader: 'nSubtitle' }}
                                    title="Global Results"
                                    subheader="Statistics from other users using the plugin"
                                />
                                <EmptyData/>
                            </Card>
                        </div>
                )
          } else if (aux.length < 3){
            return (
                <div className="container-cards">
                    <Card className={classes.root}>
                        <CardHeader classes={{ title: 'nTitle', subheader: 'nSubtitle' }}
                            title="Global Results"
                            subheader="Statistics from other users using the plugin"
                        />
                        <NotEnoughInfo/>
                    </Card>
                </div>
        )
        
        }else{
            
             if(authService.isFileLoadedJSON(0)){
                 data = getData(userTweets, globalStats, authService.getJSONData(0), reactionsG);
             }else{
                
                data = getData(userTweets, globalStats, reactionsP, reactionsG);

            }

          }
  
      }
        
    return (
        
        <div>
            <div className='container-cards'>
                <Card className={classes.root}>
                    <CardHeader classes={{ title: 'nTitle', subheader: 'nSubtitle' }}
                        title="Global Results"
                        subheader="Statistics from other users using the plugin"
                    />
                    <CardMedia
                        className={classes.media}
                        image="/NewsCollector/images/global.jpg"
                    />
                    <CardContent>  
                   
                        <div className={classes.container}>  
                            <p>In this section you can compare your results with the global results obtained from other users using the plugin.</p>
                            <div>
                                <div>Top news sources appearing in other user's feed: </div>
                                <div className={classes.container2}>
                                    <HtmlTooltip
                                        title={
                                        <React.Fragment>
                                            <b>{'Num. Tweets found: ' + data.tooltip1.top1}</b>
                                            <br/>

                                        </React.Fragment>
                                        }
                                    >
                                        <Chip
                                        icon={<LooksOneIcon/>}
                                        label={data.chip1.top1}
                                        clickable
                                        color="primary"
                                        onClick={() => handleClickChip(data.chip1.top1)}
                                    />
                                    </HtmlTooltip>
                                    <HtmlTooltip
                                        title={
                                        <React.Fragment>
                                            <b>{'Num. Tweets found: ' + data.tooltip1.top2}</b>
                                            <br/>
                                        
                                        </React.Fragment>
                                        }
                                    >
                                        <Chip
                                            icon={<LooksTwoIcon/>}
                                            label={data.chip1.top2}
                                            clickable
                                            color="primary"
                                            onClick={() => handleClickChip(data.chip1.top2)}
                                        />
                                    </HtmlTooltip>
                                    <HtmlTooltip
                                        title={
                                        <React.Fragment>
                                            <b>{'Num. Tweets found: ' + data.tooltip1.top3}</b>
                                            <br/>
                                           
                                        </React.Fragment>
                                        }
                                    >
                                        <Chip
                                            icon={<Looks3Icon/>}
                                            label={data.chip1.top3}
                                            clickable
                                            color="primary"
                                            onClick={() => handleClickChip(data.chip1.top3)}
                                        />
                                    </HtmlTooltip>
                                </div>
                            </div>
                            
                            <div>
                                <div>Top news sources appearing your feed: </div>
                                <div className={classes.container2}>
                                <HtmlTooltip
                                        title={
                                        <React.Fragment>
                                            <b>{'Num. Tweets found: ' + data.tooltip2.top1}</b>
                                            <br/>
                                          
                                        </React.Fragment>
                                        }
                                    >
                                        <Chip
                                        icon={<LooksOneIcon/>}
                                        label={data.chip2.top1}
                                        clickable
                                        color="secondary"
                                        onClick={() => handleClickChip(data.chip2.top1)}
                                    />
                                    </HtmlTooltip>
                                    <HtmlTooltip
                                        title={
                                        <React.Fragment>
                                            <b>{'Num. Tweets found: ' + data.tooltip2.top2}</b>
                                            <br/>
                                         
                                        </React.Fragment>
                                        }
                                    >
                                        <Chip
                                            icon={<LooksTwoIcon/>}
                                            label={data.chip2.top2}
                                            clickable
                                            color="secondary"
                                            onClick={() => handleClickChip(data.chip2.top2)}
                                        />
                                    </HtmlTooltip>
                                    <HtmlTooltip
                                        title={
                                        <React.Fragment>
                                            <b>{'Num. Tweets found: ' + data.tooltip2.top3}</b>
                                            <br/>
                                           
                                        </React.Fragment>
                                        }
                                    >
                                        <Chip
                                            icon={<Looks3Icon/>}
                                            label={data.chip2.top3}
                                            clickable
                                            color="secondary"
                                            onClick={() => handleClickChip(data.chip2.top3)}
                                        />
                                    </HtmlTooltip>                           
                                </div>
                            </div>
                        </div>
                   
                    </CardContent>


                  
                    <CardContent>
                   
                    <p>Learn more specific information with the following graphs:</p>
                    <br/>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                           <div>
                               <h4>Top most seen News Sources by all users</h4>
                            </div>
                            </AccordionSummary>
                            <AccordionDetails>
                               <div>
                                    <div className="container-graph">
                                        <ResponsiveBar
                                            data={data.graph1}
                                            keys={["Global", "Personal"]}
                                            indexBy="Name"
                                            margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
                                            padding={0.3}
                                            valueScale={{ type: "linear" }}
                                            colors={["#3182CE", "#3CDBDE"]}
                                            animate={true}
                                            layout="horizontal"
                                            groupMode="grouped"
                                            enableLabel={false}
                                            enableGridX={true}
                                            enableGridY={false}
                                            axisTop={null}
                                            axisRight={null}
                                            axisLeft={{
                                                format: (v) => {
                                                    return v.length > 6 ? (
                                                        <tspan>
                                                        {v.substring(0, 5) + "..."}
                                                        <title>{v}</title>
                                                        </tspan>
                                                    ) : (
                                                        v
                                                    );
                                                },
                                                tickSize: 5,
                                                tickPadding: 5,
                                                tickRotation: 0,
                                                legend: "",
                                                legendPosition: "middle",
                                                legendOffset: -40
                                            }}
                                            axisBottom={{
                                                tickSize: 5,
                                                tickPadding: 5,
                                                tickRotation: 0,
                                                legend: 'No. Posts',
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
                                    <div className='graph-details'>
                                        <h5>Graph shows the Top 10 News Sources with the number of posts seen with news data by all users.</h5>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                         
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            >
                            <h4>Most liked posts by News Source</h4>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                <div className="container-graph">
                                    <ResponsiveBar
                                        data={data.graph3}
                                        keys={["Global", "Personal"]}
                                        indexBy="Name"
                                        margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
                                        padding={0.3}
                                        valueScale={{ type: "linear" }}
                                        colors={["#A82054", "#F54789"]}
                                        animate={true}
                                        layout="horizontal"
                                        groupMode="grouped"
                                        enableLabel={false}
                                        enableGridX={true}
                                        enableGridY={false}
                                        axisTop={null}
                                        axisRight={null}
                                        axisLeft={{
                                            format: (v) => {
                                                return v.length > 6 ? (
                                                    <tspan>
                                                    {v.substring(0, 5) + "..."}
                                                    <title>{v}</title>
                                                    </tspan>
                                                ) : (
                                                    v
                                                );
                                            },
                                            tickSize: 5,
                                            tickPadding: 5,
                                            tickRotation: 0,
                                            legend: "",
                                            legendPosition: "middle",
                                            legendOffset: -40
                                        }}
                                        axisBottom={{
                                            tickSize: 5,
                                            tickPadding: 5,
                                            tickRotation: 0,
                                            legend: 'No. Posts',
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
                                <div className='graph-details'>
                                    <h5>Graph shows the amount of posts liked by all users. This number is grouped by the News Source.</h5>
                                </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                            >
                            <h4>Most retweeted posts by News Source</h4>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div>
                                <div className="container-graph">
                                    <ResponsiveBar
                                        data={data.graph4}
                                        keys={["Global", "Personal"]}
                                        indexBy="Name"
                                        margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
                                        padding={0.3}
                                        valueScale={{ type: "linear" }}
                                        colors={{ scheme: 'nivo' }}  
                                        animate={true}
                                        layout="horizontal"
                                        groupMode="grouped"
                                        enableLabel={false}
                                        enableGridX={true}
                                        enableGridY={false}
                                        axisTop={null}
                                        axisRight={null}
                                        axisLeft={{
                                            format: (v) => {
                                                return v.length > 6 ? (
                                                    <tspan>
                                                    {v.substring(0, 5) + "..."}
                                                    <title>{v}</title>
                                                    </tspan>
                                                ) : (
                                                    v
                                                );
                                            },
                                            tickSize: 5,
                                            tickPadding: 5,
                                            tickRotation: 0,
                                            legend: "",
                                            legendPosition: "middle",
                                            legendOffset: -40
                                        }}
                                        axisBottom={{
                                            tickSize: 5,
                                            tickPadding: 5,
                                            tickRotation: 0,
                                            legend: 'No. Posts',
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
                                <div className='graph-details'>
                                    <h5>Graph shows the amount of posts retweeted by all users. This number is grouped by the News Source.</h5>
                                </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        
                    </CardContent>
                    
 
                </Card>
                <DialogFileUpload
                    setShowSettings = {setShowSettings}
                    setShowWarningFile = {setShowWarningFile}
                    c_open = {showSettings}
                    close = {handleCloseUser} >

            </DialogFileUpload>
         
            </div> 
        </div>
    )
}

export default ComparisonView
