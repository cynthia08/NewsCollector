import React from 'react';
import PropTypes from 'prop-types';
import './AllSources.css';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { useContext, createContext } from 'react';
import UserContext from "./user-context";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import LoadingComponent from './LoadingComponent';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {FaRetweet} from "react-icons/fa";
import FetchService from "./services/fetchServices";





/*
const useStyles = (theme) => ({
    table: {
        },
      container: {
        maxHeight: 400,
        maxWidth: 630
      },
  });

  
  
function createData(title, name, urls, percentage) {
    return { title, name, urls, percentage };
}

function createData2(title, urls, name, likes, retweets, date) {
    return { title, urls, name, likes, retweets, date };
}
*/

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


function getData(newsData, news_links){
  /*
    const rows1 = [
        createData('news title 1', 'BBC News', 80, 50),
        createData('news title 2', 'CNN', 20, 20),
        createData('news title 3', 'Euro News', 10, 10),
        createData('news title 4', 'abc News', 9, 9),
        createData('news title 5', 'Washington Post', 5, 7),
        createData('news title 6', 'New York Times', 4, 5),
        createData('news title 7', 'Milenio', 2, 2),
        createData('news title 8', 'El Universal', 1, 1)
    ]

    const rows2 = [
        createData2('UK vaccine effectiveness...', 'https://www.google.com', 'BBC News',50, 34, "2021-02-10T22:42:09Z"),
        createData2('Police in New York creates...', 'https://www.google.com', 'BBC News', 35, 12, "2021-10-12T22:42:09Z"),
        createData2('US city lost in caos because...', 'https://www.google.com', 'BBC News', 24, 32, "2021-10-24T22:42:09Z"),
        createData2('Taliban forces take capital...', 'https://www.google.com', 'BBC News', 67, 23, "2021-10-12T22:42:09Z"),
        createData2('COVID vaccine requirement...', 'https://www.google.com', 'BBC News', 49, 32,  "2021-12-10T22:42:09Z"),
        createData2('Earthquake strikes city...', 'https://www.google.com', 'CNN', 24, 23, "2021-10-29T22:42:09Z"),
        createData2('Justice department helps...', 'https://www.google.com', 'CNN', 37, 32, "2021-12-24T22:42:09Z"),
        createData2('Flight carrying 15900 tons of...', 'https://www.google.com', 'CNN',  24, 65, "2021-08-11T22:42:09Z"),
        createData2('Tropical storm hits bay in...', 'https://www.google.com', 'euro News',25, 34, "2021-02-12T22:42:09Z"),
        createData2('Poweful earthquake hits...', 'https://www.google.com','euro News',26, 23, "2021-10-18T22:42:09Z"),
        createData2('Earthquake strikes city...', 'https://www.google.com', 'The Post', 21, 56, "2021-12-06T22:42:09Z"),
        createData2('Justice department helps...', 'https://www.google.com', 'The Post', 37, 9, "2021-08-18T22:42:09Z"),
        createData2('Flight carrying 15900 tons of...', 'https://www.google.com', 'New York Times', 24, 32, "2021-02-12T22:42:09Z"),
        createData2('Tropical storm hits bay in...', 'https://www.google.com', 'Milenio', 67, 54, "2021-04-16T22:42:09Z"),
        createData2('Poweful earthquake hits...', 'https://www.google.com', 'El Universal', 49, 54, "2021-08-13T22:42:09Z"),
    ]
    */

    
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


  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  

  const headCells = [
    { id: 'title', numeric: false, disablePadding: false, label: 'URLs' },
    { id: 'source_name', numeric: false, disablePadding: false, label: 'News Source' },
    { id: 'no_likes', numeric: true, disablePadding: false, label: 'Likes' },
    { id: 'no_retweets', numeric: true, disablePadding: false, label: 'Retweets' },
    { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  ];

  function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow >
        
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
        '& > *': {
          margin: theme.spacing(10, 'auto'),
          width: theme.spacing(110),
          height: theme.spacing(83),
          background: "#F5F5F5",
        },
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      marginLeft: 20,
      marginTop: 10,
    },
    container: {
      maxHeight: 480,
        
    },
    table: {
      minWidth: 600,
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

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    
    return (
      <Toolbar className={classes.root}>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            All Sources
          </Typography>
      </Toolbar>
    );
  };

  const randColor = (size, sizeColors) =>{
    const randoms = [...Array(size-sizeColors)].map(() => "#"+ Math.floor(Math.random()*16777215).toString(16));
    console.log(randoms);
    return randoms;

  }
 

function AllSources() {
    const classes = useStyles();
    const { userID } = useContext(UserContext);

    const url = "https://jsonplaceholder.typicode.com/users"
    /*
    const { newsData, errorN, isLoadingN } = useFetchNews(url)
    const { userData, error, isLoading } = useFetch(url)
    */

    const { newsData, errorN, isLoadingN } = FetchService.useFetchNews(url);
    const { userData, error, isLoading } = FetchService.useFetchUser(url);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedOption, setSelectedOption] = React.useState('All Sources');
    
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('title');
    const [selected, setSelected] = React.useState([]);
    const open = Boolean(anchorEl);

   
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (event) => {
      setAnchorEl(null);
      const {myValue} = event.currentTarget.dataset;
      console.log(myValue);
      if (myValue!==undefined){
        setSelectedOption(myValue);
      }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClickSort = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];

      if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
          );
      }

      setSelected(newSelected);
    };

    const options = [
        'All Sources',
        'All URLs'
      ];
      
    const ITEM_HEIGHT = 48;
    //const info = getData();
    let info = [];

    if (isLoading === true || isLoadingN === true ){
      return  <LoadingComponent/>

    }else{
      info = getData(newsData, userData.news_links);
    }

    //console.log(info[0].length +" "+colors.length+" "+ "% " + info[0].length%colors.length);
    //randColor(100,5);

    if(info[0].length>COLORS.length){
      const number = info[0].length - COLORS.length;
      COLORS.push(...COLORS.slice(0, number));

    }

    return (
        <div className={classes.root}>
           <Paper elevation={2}>  
            <div className='allsources-menu-title'>
                <b>All News Sources  </b>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link color="inherit" href='/topnews/1'>
                    Top News Source 
                  </Link>
                  <Link  color="textPrimary"  aria-current="page">
                    All Sources
                  </Link>
                </Breadcrumbs>
            </div>     
            <div className='all-src-container'>
                <div className='table-src'>
                    { selectedOption === 'All Sources'
                    ?
                    <div>
                      <Paper className={classes.paper}>
                        <Toolbar>
                            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                              {selectedOption}
                            </Typography>
                        </Toolbar>
                        <TableContainer className={classes.container}>
                          
                            <Table  
                              className={classes.table}
                              aria-labelledby="tableTitle"
                              size='medium'
                              aria-label="enhanced table"
                              stickyHeader >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"></TableCell>
                                        <TableCell align="left">News Source</TableCell>
                                        <TableCell align="left">No. URLs Found</TableCell>
                                        <TableCell align="right">Percentage</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {info[0].map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {index+1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                        <i class="fas fa-circle" style={{ color:COLORS[index] }}></i>&nbsp;  
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.urls} URLs
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.percentage} %
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                      </Paper>
                    </div>
                
                :
                <div>
                      <Paper className={classes.paper}>
                        <Toolbar>
                            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                              {selectedOption}
                            </Typography>
                        </Toolbar>
                        <TableContainer className={classes.container}>
                            <Table  
                             className={classes.table}
                             aria-labelledby="tableTitle"
                             size='medium'
                             aria-label="enhanced table"
                             stickyHeader  >
                                <EnhancedTableHead
                                    classes={classes}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {stableSort(info[1], getComparator(order, orderBy))
                                    .map((row2, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;
                    
                                        return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClickSort(event, row2.title)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell component="th" id={labelId} scope="row">
                                                <span style={{color: "Dodgerblue"}}>
                                                    <i class="fab fa-twitter"></i>&nbsp; 
                                                </span>
                                                <Link href={row2.url}>
                                                    {row2.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left">
                                                {row2.source_name}
                                            </TableCell>
                                            <TableCell align="right">
                                                <i class="far fa-heart"></i>&nbsp; 
                                                {row2.no_likes}
                                            </TableCell>
                                            <TableCell align="right">
                                                <FaRetweet/> &nbsp; 
                                                {row2.no_retweets}
                                            </TableCell>
                                            <TableCell align="right">
                                              {new Date(row2.date).toLocaleDateString()}
                                            </TableCell>
                                        
                                        </TableRow>
                                        );
                                    })}
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Paper>
                </div>

                }
                </div>

                <div className='allsources-options'>
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

export default AllSources
