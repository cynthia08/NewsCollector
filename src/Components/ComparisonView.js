import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { blue, indigo, red, teal } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { ResponsiveBar } from '@nivo/bar';
import { useContext, createContext } from 'react';
import UserContext from "./user-context";
import FetchService from "./services/fetchServices";
import LoadingComponent from './LoadingComponent';
import './ComparisonView.css'



const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 650,
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
        justifyContent: 'center',
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

function compare(orderBy){
    return function sorting(a,b){
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
        return 1;
        }
        return 0;

    }
   

}

function arrangeData(newsData){

    let reGroupedStats = [];
    for (let i in newsData.grouped_stats){
      const newObj = {
        Name: newsData.grouped_stats[i].source_name,
        Global: newsData.grouped_stats[i].num_links +10, 
        Personal: newsData.grouped_stats[i].num_links
      };
      reGroupedStats.push(newObj);
    }

    return reGroupedStats;

    
}

function countOcurrences(userData, select){
    let property = select===0 ? userData.reactions.likes : userData.reactions.retweets;
    var counts = property.reduce((p, c) => {
        let name = c.source_id;
        
        if (!p.hasOwnProperty(name) ) {
            p[name] = 0;
        }
        p[name]++;
        return p;
      }, {});
    

    var countsExtended = Object.keys(counts).map(k => {
        return {Name: k,Global:counts[k]+10 , Personal: counts[k]}; });
      

    return countsExtended;
      
}



function getData(newsData, userData){
    const chipPersonal = {
        top1: newsData.grouped_stats["1"].source_name,
        top2: newsData.grouped_stats["2"].source_name,
        top3: newsData.grouped_stats["3"].source_name
    }

    const chipGlobal = {
        top1: newsData.grouped_stats["1"].source_name,
        top2: newsData.grouped_stats["2"].source_name,
        top3: newsData.grouped_stats["3"].source_name
    }

    // GRAPHS
    const dataTest = [
        {
          day: "CNN",
          Global: 100,
          Personal: 30,
        },
        {
          day: "BBC",
          Global: 61,
          Personal: 40,
        },
        {
          day: "NY Times",
          Global: 55,
          Personal: 10,
        },
        {
          day: "euro",
          Global: 78,
          Personal: 22,
        },
        {
          day: "abc News",
          Global: 71,
          Personal: 34,
        },
        {
          day: "Milenio",
          Global: 56,
          Personal: 20,
        },
        {
          day: "The Post",
          Global: 67,
          Personal: 32,
        }
      ];

      const dataAmountUsers = [
        {
          newsSrc: "CNN",
          No_Users: 15,
        },
        {
          newsSrc: "BBC",
          No_Users: 11,
          
        },
        {
          newsSrc: "NY Times",
          No_Users: 10,
          
        },
        {
          newsSrc: "euro",
          No_Users: 7,
          
        },
        {
          newsSrc: "abc News",
          No_Users: 9,
          
        },
        {
          newsSrc: "Milenio",
          No_Users: 12,
          
        },
        {
          newsSrc: "The Post",
          No_Users: 6,
          
        }
      ];

      const dataLikes = [
        {
          day: "CNN",
          Global: 80,
          Personal: 70,
        },
        {
          day: "BBC",
          Global: 61,
          Personal: 60,
        },
        {
          day: "NY Times",
          Global: 35,
          Personal: 30,
        },
        {
          day: "euro",
          Global: 56,
          Personal: 45,
        },
        {
          day: "abc News",
          Global: 50,
          Personal: 55,
        },
        {
          day: "Milenio",
          Global: 23,
          Personal: 13,
        },
        {
          day: "The Post",
          Global: 78,
          Personal: 70,
        }
      ];

      const dataRetweets = [
        {
          day: "CNN",
          Global: 50,
          Personal: 53,
        },
        {
          day: "BBC",
          Global: 51,
          Personal: 50,
        },
        {
          day: "NY Times",
          Global: 45,
          Personal: 40,
        },
        {
          day: "euro",
          Global: 36,
          Personal: 35,
        },
        {
          day: "abc News",
          Global: 80,
          Personal: 85,
        },
        {
          day: "Milenio",
          Global: 43,
          Personal: 43,
        },
        {
          day: "The Post",
          Global: 28,
          Personal: 20,
        }
      ];

      dataTest.sort(compare('Global'));
      dataAmountUsers.sort(compare('No_Users'));
      dataLikes.sort(compare('Global'));
      dataRetweets.sort(compare('Global'));
      

      const newData ={
          chip1: chipPersonal,
          chip2: chipGlobal,
          graph1: arrangeData(newsData),
          graph2: dataAmountUsers,
          graph3: countOcurrences(userData, 0),
          graph4: countOcurrences(userData, 1)
      }

      countOcurrences(userData);

      return newData;

    


}

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

function ComparisonView() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const { userID } = useContext(UserContext);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    
    const handleClickChip = (id) =>{
        const url = "https://twitter.com/"+id;
        console.log(url);
        window.open(url, "_blank");
    }


      const url = "https://jsonplaceholder.typicode.com/users"


      const { newsData, errorN, isLoadingN } = FetchService.useFetchNews(url)
      const { userData, error, isLoading } = FetchService.useFetchUser(url)

      let data =[];

      if (isLoading === true || isLoadingN === true){
        return <LoadingComponent/>
      }else{
          data = getData(newsData,userData);
      }
        
    
  
    return (
        
        <div className="container-cards">
            <div>
                <Card className={classes.root}>
                    <CardHeader classes={{ title: 'nTitle', subheader: 'nSubtitle' }}
                        title="Global Results"
                        subheader="Statistics from other users using the plugin"
                    />
                    <CardMedia
                        className={classes.media}
                        image="/images/global.jpg"
                    />
                    <CardContent>  
                        <div className={classes.container}>  
                            <p>In this section you can compare your results with the global results obtained from other users using the plugin.</p>
                            <div>Top news sources appearing in other user's feed: </div>
                            <div className={classes.container2}>
                                <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        <b>{'Num. Links found: 91'}</b>
                                        <br/>
                                        <b>{'Followers on Twitter: 34M'}</b> 
                                        <br/>
                                    </React.Fragment>
                                    }
                                >
                                    <Chip
                                    icon={<LooksOneIcon/>}
                                    label="bbc"
                                    clickable
                                    color="primary"
                                    onClick={() => handleClickChip("BBCWorld")}
                                />
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        <b>{'Num. Links found: 83'}</b>
                                        <br/>
                                        <b>{'Followers on Twitter: 18.5M'}</b> 
                                        <br/>
                                    </React.Fragment>
                                    }
                                >
                                    <Chip
                                        icon={<LooksTwoIcon/>}
                                        label="The Post"
                                        clickable
                                        color="primary"
                                        onClick={() => handleClickChip("washingtonpost")}
                                    />
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        <b>{'Num. Links found: 65'}</b>
                                        <br/>
                                        <b>{'Followers on Twitter: 51.3M'}</b> 
                                        <br/>
                                    </React.Fragment>
                                    }
                                >
                                    <Chip
                                        icon={<Looks3Icon/>}
                                        label="New York Times"
                                        clickable
                                        color="primary"
                                        onClick={() => handleClickChip("nytimes")}
                                    />
                                </HtmlTooltip>
                            </div>
                            <div>Top news sources appearing your feed: </div>
                            <div className={classes.container2}>
                            <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        <b>{'Num. Links found: 91'}</b>
                                        <br/>
                                        <b>{'Followers on Twitter: 34M'}</b> 
                                        <br/>
                                    </React.Fragment>
                                    }
                                >
                                    <Chip
                                    icon={<LooksOneIcon/>}
                                    label={data.chip1.top1}
                                    clickable
                                    color="secondary"
                                    onClick={() => handleClickChip("BBCWorld")}
                                />
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        <b>{'Num. Links found: 83'}</b>
                                        <br/>
                                        <b>{'Followers on Twitter: 18.5M'}</b> 
                                        <br/>
                                    </React.Fragment>
                                    }
                                >
                                    <Chip
                                        icon={<LooksTwoIcon/>}
                                        label={data.chip1.top2}
                                        clickable
                                        color="secondary"
                                        onClick={() => handleClickChip("CNN")}
                                    />
                                </HtmlTooltip>
                                <HtmlTooltip
                                    title={
                                    <React.Fragment>
                                        <b>{'Num. Links found: 65'}</b>
                                        <br/>
                                        <b>{'Followers on Twitter: 485.8K'}</b> 
                                        <br/>
                                    </React.Fragment>
                                    }
                                >
                                    <Chip
                                        icon={<Looks3Icon/>}
                                        label={data.chip1.top3}
                                        clickable
                                        color="secondary"
                                        onClick={() => handleClickChip("euronews")}
                                    />
                                </HtmlTooltip>                           
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
                                   <h4>Amount of users seeing the posts from different News Sources</h4>
                                </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                   <div>
                                        <div className="container-graph">
                                            <ResponsiveBar
                                                data={data.graph2}
                                                keys={["No_Users"]}
                                                indexBy="newsSrc"
                                                margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
                                                padding={0.5}
                                                valueScale={{ type: "linear" }}
                                                colors={["#3E9CC2"]}
                                                animate={true}
                                                layout="horizontal"
                                                groupMode="grouped"
                                                enableLabel={false}
                                                axisTop={null}
                                                axisRight={null}
                                                axisLeft={{
                                                    format: (v) => {
                                                        return v.length > 6 ? (
                                                            <tspan>
                                                            {v.substring(0, 6) + "..."}
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
                                                    legend: 'No. Users',
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
                                            <h5>Graph shows the number of users seeing posts from different News Sources.</h5>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                               <div>
                                   <h4>Amount of post seen by all users</h4>
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
                                                axisTop={null}
                                                axisRight={null}
                                                axisLeft={{
                                                    format: (v) => {
                                                        return v.length > 6 ? (
                                                            <tspan>
                                                            {v.substring(0, 6) + "..."}
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
                                            <h5>Graph shows the number of posts seen with news data by all users. This number is grouped by the News Source.</h5>
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
                                            axisTop={null}
                                            axisRight={null}
                                            axisLeft={{
                                                format: (v) => {
                                                    return v.length > 6 ? (
                                                        <tspan>
                                                        {v.substring(0, 6) + "..."}
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
                                            axisTop={null}
                                            axisRight={null}
                                            axisLeft={{
                                                format: (v) => {
                                                    return v.length > 6 ? (
                                                        <tspan>
                                                        {v.substring(0, 6) + "..."}
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
            </div> 
        </div>
    )
}

export default ComparisonView
