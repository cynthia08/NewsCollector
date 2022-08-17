import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LoadingComponent from './LoadingComponent';
import FetchService from "./services/fetchServices";
import * as helpers from './services/helpers';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { ResponsivePie } from '@nivo/pie'
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import IconButton from '@material-ui/core/IconButton';
import ErrorComponent from './ErrorComponent';
import EmptyData from './EmptyData';
import NotEnoughInfo from './NotEnoughInfo';


/*
********************************************************************************************
  GraphDetail component defines the content for the Graph View page.
********************************************************************************************
*/

const COLORS_B =[
    "#1B4F72", "#21618C", "#2874A6", "#2E86C1", "#3498DB", "#5DADE2", "#85C1E9", "#AED6F1", "#D6EAF8", "#EBF5FB",
    "#4F94CD", "#83B4DC", "#B7D3EB", "#EBF3F9", "#63B8FF", "#8FCCFF", "#BAE0FF", "#E5F3FF", "#2980B9", "#5499C7", 
    "#7FB3D5", "#A9CCE3", "#D4E6F1", "#EAF2F8", "#6195C1", "#A7C4DD", "#BBDDFB", "#E6F3FE", "#50A6C2", "#84C0D4",
    "#B6D1DB", "#D7ECF3", "#E7F8FD", "#39B7CD", "#AFE2EB", "#CEF3F8", "#E9FAFC", "#33E6FA", "#98F5FF", "#CCFAFF",
    "#E5FDFF", "#1874CD", "#60AAF3", "#9CC8F3", "#E7F2FD", "#7EB6FF", "#A0CAFF", "#C3DDFF", "#E5F1FF", "#CADAF1"

];

function getData(data){
    return helpers.arrangePieGraph(data);
   

}

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
    breadcrumbs: {
        fontSize: 14

    },
    graph_container:{
        height: 400,
        width: 480,
        marginLeft: 10,
        textAlign: "center",
        position: "relative",
    },
    overlay: {
        position: "absolute",
        top: 10,
        right: 80,
        bottom: 70,
        left: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 60,
        color: "#000000",
        // background: "#FFFFFF33",
        textAlign: "center",
        // This is important to preserve the chart interactivity
        pointerEvents: "none"
      },
    totalLabel: {
        fontSize: 18
    },
    mainContainer:{
        display: "flex",
        marginTop: theme.spacing(2),
        
    },
    details:{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(70),
            height: theme.spacing(58),
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
       
    },
    tableContainer: {
        maxHeight: 430,
      },
    table: {
        minWidth: 500,
    },
    footer:{
        marginTop: 0,
        marginLeft: theme.spacing(1),
        textAlign: 'left',
        maxHeight: theme.spacing(5),
    },
    title:{
        textAlign: 'center'
    },
    graphDetails:{
        marginTop: -46,
        marginLeft: theme.spacing(5),
        textAlign: 'left',
        width: theme.spacing(50),      

    }
    

  }));

function GraphDetail() {
    const classes = useStyles();

    const { userTweets, errorUserTweets, isLoadingUserTweets } = FetchService.useFetchTweetNews();
    let data =[];
    let authors = []

    if (isLoadingUserTweets ){
        return <LoadingComponent/>

    }else{

        const aux = helpers.groupAuthors(userTweets).sort(helpers.orderById('num_links', 'desc'));

        if(errorUserTweets.includes("Error:") ){
            return (
                <div className={classes.root}>
                <Paper elevation={2} >
                <div className='profile-graph-title'>
                    <b>Graph View </b> <br/>
                    <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                      <Link color="inherit" href='/NewsCollector/topnews/0' >
                        Top News Sources
                      </Link>
                      <Link  color="textPrimary"  aria-current="page" >
                        Graph View
                      </Link>
                    </Breadcrumbs>
                    <ErrorComponent/>
                </div>
                </Paper>
                </div>
            )
            
        } else if (userTweets.length === 0){
            return (
                <div className={classes.root}>

                <Paper elevation={2} >
                <div className='profile-graph-title'>
                    <b>Graph View </b> <br/>
                    <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                      <Link color="inherit" href='/NewsCollector/topnews/0' >
                        Top News Sources
                      </Link>
                      <Link  color="textPrimary"  aria-current="page" >
                        Graph View
                      </Link>
                    </Breadcrumbs>
                    <EmptyData/>
                </div>
                </Paper>
                </div>

            )
        } else if (aux.length < 3){
            return (
                <div className={classes.root}>

                <Paper elevation={2} >
                <div className='profile-graph-title'>
                    <b>Graph View </b> <br/>
                    <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                      <Link color="inherit" href='/NewsCollector/topnews/0' >
                        Top News Sources
                      </Link>
                      <Link  color="textPrimary"  aria-current="page" >
                        Graph View
                      </Link>
                    </Breadcrumbs>
                    <NotEnoughInfo/>
                </div>
                </Paper>
                </div>

            )
        
        }else{
            authors = helpers.groupAuthors(userTweets).sort(helpers.orderById('num_links', 'desc'));
            data = getData(authors); //static
    
            let index = data.findIndex(x => x.id === '*Others');
    
            if(authors.length>COLORS_B.length){
                const number = authors.length - COLORS_B.length;
                COLORS_B.push(...COLORS_B.slice(0, number-2));
                COLORS_B.splice(index, 0, '#D3D3D3');
            }else{            
                COLORS_B.splice(index, 0, '#D3D3D3');
            }
           
        }
       
    }


   


  return (
    <div className={classes.root}>
        <Paper elevation={2}>
            <div className='profile-graph-title'>
                <b>Graph View </b> <br/>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                  <Link color="inherit" href='/NewsCollector/topnews/0' >
                    Top News Sources
                  </Link>
                  <Link  color="textPrimary"  aria-current="page" >
                    Graph View
                  </Link>
                </Breadcrumbs>
            </div>

           
            <div> 
                <div className={classes.title}>
                    <Typography color='textPrimary' variant='h6'>
                        Amount of Tweets by News Source
                    </Typography>
                    
                </div> 
            
            <div className={classes.mainContainer}>
                <div className={classes.graph_container}>
                        <ResponsivePie
                            data={data}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.7}
                            cornerRadius={2}
                            activeOuterRadiusOffset={8}
                            colors={COLORS_B}
                            borderWidth={1}
                            borderColor={{
                                from: 'color',
                                modifiers: [
                                    [
                                        'darker',
                                        0.2
                                    ]
                                ]
                            }}
                            enableArcLinkLabels={false}  
                            enableArcLabels={false}  
                        />
                        <div className={classes.overlay}>
                            <span>{userTweets.length}</span>
                            <span className={classes.totalLabel}>Tweets News found</span>
                        </div>
                        
                        <div className={classes.graphDetails}>
                            
                            <Paper >
                        
                            <CardHeader
                                    avatar={
                                    <Avatar src={helpers.imageURLClean(authors[0].avatar)} /> 
                                    }
                                    title={authors[0].username}
                                    subheader={"Collected: "+ authors[0].num_links + " tweets"}
                                    titleTypographyProps={{variant:'h6' }}
                                    action={
                                        <IconButton aria-label="expand row" size="medium" style={{ color: 'gold' }} disabled>
                                            <EmojiEventsIcon/>
                                        </IconButton>
                                    }

                                />
                            </Paper>
                        </div>
                        
                </div> 
               
                <div className={classes.details}>
                    
                   
                   
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table className={classes.table} aria-label="simple table" stickyHeader>
                            <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell align="left">News Source</TableCell>
                                <TableCell align="right">No. Tweets Found</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {authors.map((row,index) => (
                                <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {index+1}
                                </TableCell>
                                <TableCell align="left">
                                   
                                    <i class="fas fa-circle" style={{ color: row.num_links > 1 ? COLORS_B[index] : "#D3D3D3" }}></i>&nbsp;  
                                    {row.num_links > 1 ? row.username : row.username +" (Others)"}
                                    
                                </TableCell>
                                <TableCell align="right">{row.num_links > 1? row.num_links +" Tweets" : row.num_links +" Tweet"}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={classes.footer}>
                        <Typography color='textSecondary' variant='subtitle2'>
                            *Others: This category groups the News Sources found with a single Tweet. 
                        </Typography>
                    </div>
                    
                    

                   
                    

                </div>
            </div>            
            
            </div>
        </Paper>
    </div>
  )
}

export default GraphDetail