import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FetchService from "./services/fetchServices";
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import {FaRetweet} from "react-icons/fa";
import { useLocation } from "react-router-dom";

import './AllReactions.css';

const COLORS =['#CB2424', '#8B0B0B', '#038CED', '#3ABEC7', '#ACACAC', '#3B8820', '#eab27c',
'#550711', '#f41c11', '#a91bc1', '#eb80bc', '#75e7b4', '#a3fbc1', '#eb6381', '#5ea2ff',
'#268d92', '#71a63b', '#91bb34', '#7b02d4', '#4368ad', '#623bf2', '#4b3c0a', '#6f6382', 
'#455f9a', '#7c2440', '#6f5d70', '#ea7685', '#1ad691', '#8fd482', '#27f959', '#49716b', 
'#2857b0', '#d30238', '#483889', '#a64d1f', '#745318', '#9aca3d', '#64920c', '#ebbf51', 
'#3362d5', '#80502e', '#4dc633', '#a96dcc', '#95b680', '#1838a0', '#25d5d7', '#e5c268', 
'#cab715', '#b08608', '#ced48c', '#a491b7', '#c07dee', '#49592', '#5f7f4c', '#758073', 
'#596f4', '#393cfa', '#40bdb0', '#c488c', '#ec600a', '#90af7c', '#11a784', '#c2e15f', 
'#34213d', '#70622c', '#20b73c', '#80cf49', '#2d34ee', '#3ac7c4', '#5a6b16', '#5ae17e', 
'#51de82', '#f72ec9', '#82df9b', '#73a931', '#543410', '#af79ce', '#3bcc97', '#f553f9', 
'#5179e4', '#222c08', '#e0051a', '#12c91b', '#fb285', '#cf046c', '#7e2088', '#896c03',
'#70b26c', '#b73dd7', '#3a76e5', '#dffa69', '#f9e79', '#776b70', '#8705eb', '#73cbe2', 
'#b845af', '#ce779d', '#77a0a1', '#d49614', '#64fc3b', '#f852c5', '#13441b'];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(10, 'auto'),
          width: theme.spacing(110),
          height: theme.spacing(75),
          background: "#F5F5F5",
        },
    },
    paper: {
      width: '80%',
      marginBottom: theme.spacing(2),
      marginLeft: 30,
      marginTop: 20,
    },
    container: {
        maxHeight: 430,
        maxWidth: 800  
    },
    table: {
      minWidth: 500,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

  function getData(newsData, news_links){   
      let reGroupedStats = [];
      for (let i in newsData.grouped_stats){
        const newObj = {};
        newObj.name = newsData.grouped_stats[i].source_name;
        newObj.urls = newsData.grouped_stats[i].num_links;
        newObj.percentage = (newsData.grouped_stats[i].num_links*100/news_links).toFixed();
        reGroupedStats.push(newObj);
      }
      
      const data = [reGroupedStats, newsData.all_stats.urls];
  
      return data;
  }

function AllReactions() {
    const classes = useStyles();
    const url = "https://jsonplaceholder.typicode.com/users";

    const { newsData, errorN, isLoadingN } = FetchService.useFetchNews(url);

    const { userData, error, isLoading } = FetchService.useFetchUser(url);
    

    

    const [anchorEl, setAnchorEl] = React.useState(null);
    const location = useLocation();
    const [selectedOption, setSelectedOption] = React.useState(location.state===undefined || location.state.selector === -10   ? "Likes" : "Retweets");
    const open = Boolean(anchorEl);

    const options = [
        'Likes',
        'Retweets'
      ];
      
    const ITEM_HEIGHT = 48;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = (event) => {
        setAnchorEl(null);
        const {myValue} = event.currentTarget.dataset;
        console.log(myValue);

        if (myValue !== undefined){
            setSelectedOption(myValue);
        }
    };

    let info = [];

    if (isLoading === true || isLoadingN === true ){
        return <h1>Loading data...</h1>
    }else {
        info = getData(newsData, userData.news_links);
    }

    if(info[0].length>COLORS.length){
        const number = info[0].length - COLORS.length;
        COLORS.push(...COLORS.slice(0, number));
  
      }

  return (
   <div className={classes.root}>  
        <Paper elevation={2}>
            <div className='allreactions-menu-title'>
                <b>All Reactions </b>
            </div>   
            <div className='all-reactions-container'>
                <div className='table-src'>
                { selectedOption === 'Likes'
                    ?
                    <Paper className={classes.paper}>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            {selectedOption} by News Source
                        </Typography>
                    </Toolbar>
                    <TableContainer className={classes.container}>
                        <Table  
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size='medium'
                            aria-label="enhanced table"
                            stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left">News Source</TableCell>
                                    <TableCell align="right">  Amount of Liked Posts </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {info[0].map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {index+1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <i class="fas fa-circle" style={{color:COLORS[index]}}></i>&nbsp;  
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <i class="far fa-heart"></i>&nbsp;
                                        {row.urls - 40} 
                                    </TableCell>
                                  
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Paper>
                    :
                    <Paper className={classes.paper}>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            {selectedOption} by News Source
                        </Typography>
                    </Toolbar>
                    <TableContainer className={classes.container}>
                        <Table  
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size='medium'
                            aria-label="enhanced table"
                            stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left">News Source</TableCell>
                                    <TableCell align="right">Amount of Retweeted Posts</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {info[0].map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {index+1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <i class="fas fa-circle" style={{color:COLORS[index]}}></i>&nbsp;  
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <FaRetweet/> &nbsp; 
                                        {row.urls - 40} 
                                    </TableCell>
                                  
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Paper>
                }
                </div>
                
                <div className='allreactions-options'>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <i class="fas fa-sliders-h"></i>
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '18ch',
                        },
                        }}
                    >
                        {options.map((option) => (
                        <MenuItem key={option} data-my-value={option} selected={option === selectedOption} onClick={handleClose}>
                            {option}
                        </MenuItem>
                        ))}
                    </Menu>

                </div>

                
            </div>
            
        </Paper>     
    </div>
  )
}

export default AllReactions