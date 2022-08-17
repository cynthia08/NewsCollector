import React from 'react'
import PropTypes from 'prop-types';
import './css/AllSources.css';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {FaRetweet} from "react-icons/fa";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

/*
********************************************************************************************
  AllSourcesTable defines and arranges the content for the All News Sources page.
********************************************************************************************
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


  function descendingComparator(a, b, orderBy) {
    if(orderBy === 'author'){
      if (b.author.username < a.author.username) {
        return -1;
      }
      if (b.author.username > a.author.username) {
        return 1;
      }
      return 0;

    }else{
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
  }
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
    { id: 'text', numeric: false, disablePadding: false, label: 'Tweets' },
    { id: 'author', numeric: false, disablePadding: false, label: 'News Source' },
    { id: 'likes', numeric: true, disablePadding: false, label: 'Likes' },
    { id: 'retweets', numeric: true, disablePadding: false, label: 'Retweets' },
    { id: 'createdAt', numeric: true, disablePadding: false, label: 'Date' },
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
          minWidth: theme.spacing(120),
          margin: theme.spacing(10, 'auto'),
          width: theme.spacing(120),
          height: theme.spacing(89),
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
      maxHeight: 500,
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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.black, 0.05),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.08),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(4),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
      },
    card_root:{
      minWidth: 275,
      backgroundColor: "#FFFF",
    },
    card_title:{
      fontSize: 14,
    },
    table_root:{
      '& > *': {
        borderBottom: 'unset',
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    news_title:{
      maxWidth: 150,
      maxHeight: 44,
    },
    tweets_title: {
      maxWidth: theme.spacing(18),
      maxHeight: 44,
    },
    tablecell_cust:{
      maxWidth: 250,
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      display: "block",
      overflow: "hidden"
    },
    footer:{
      marginRight: 43,
      textAlign:'right',
    },
    breadcrumbs:{
      fontSize: 14
    }

  }));


EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
  };


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [openT, setOpenT] = React.useState(false);
  const classes = useStyles();


  
  return (
    <React.Fragment>
      <TableRow className={classes.table_root}>
        <TableCell >
          {parseInt(row.id)+1}
        </TableCell>
        <TableCell >
          <CardHeader
            className={classes.news_title}
            avatar={
              <Avatar
                alt="avatar_row"
                src={row.avatar}
              />
            }
            title={ row.name }
            action={
              <div>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </div>
            }
          />
          
        </TableCell>
        <TableCell align="left">
          <CardHeader
              className={classes.tweets_title}
              titleTypographyProps={{variant:'subtitle2' }}
              title={ row.no_urls > 1 ? row.no_urls +" Tweets" : row.no_urls +" Tweet" }
              action={
                <div>
                  <IconButton aria-label="expand row" size="small" onClick={() => setOpenT(!openT)}>
                    {openT ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </div>
              }
            />
       
        </TableCell>
        <TableCell align="left">{row.percentage} %</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                News Source Details 
              </Typography>
              <Card elevation={3} className={classes.card_root}>
                <CardHeader
                    avatar={
                      <Avatar src={row.avatar} /> 
                    }
                    title={
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        {row.name }
                        {row.isVerified ? 
                        <Tooltip title="Verified Account">
                          <CheckCircleIcon fontSize="small" style={{ color: "#38C254" }}/> 
                        </Tooltip>
                        :<div/>}
                      </div>
                    }
                    subheader= {
                      <Tooltip title={row.num_followers}>
                         <Link color="inherit">
                          {"Followers: "+row.num_followers_f }
                          </Link> 
                      </Tooltip>
                    }
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {row.bio}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button 
                    style={{textTransform: 'none'}}
                    variant="outlined"
                    size="small" 
                    onClick={() => { window.open("https://www.twitter.com/"+row.name, "_blank");}}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Box>
           
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={openT} timeout="auto" unmountOnExit>
            <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                    List of Tweets
                  </Typography>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{width: "500px"}} >Tweet</TableCell>
                        <TableCell >Likes</TableCell>
                        <TableCell >Retweets</TableCell>
                        <TableCell >Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.urls.map((historyRow, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row"
                           style={{ 
                            whiteSpace: "initial",
                            textOverflow: "ellipsis",
                            width: "500px",
                            display: "block",
                            overflow: "hidden"}}>
                              <span style={{color: "Dodgerblue"}}>
                                <i class="fab fa-twitter"></i>&nbsp; 
                              </span>
                              <Link href={historyRow.url} target="_blank">
                                  {historyRow.title}
                              </Link>
                          </TableCell>
                          <TableCell ><i class="far fa-heart"></i>&nbsp; {historyRow.no_likes}</TableCell>
                          <TableCell ><FaRetweet/> &nbsp;  {historyRow.no_retweets}</TableCell>
                          <TableCell >{new Date(historyRow.date).toLocaleDateString()} </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
            </Collapse>
        </TableCell>
      </TableRow>
      
    </React.Fragment>
  );
}


Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    no_urls: PropTypes.number.isRequired,
    num_followers: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    percentage: PropTypes.string.isRequired,
    urls: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        retweets: PropTypes.number.isRequired,
        date: PropTypes.number.isRequired,
      }),
    ).isRequired,
   
  }).isRequired,
};



function AllSourcesTable(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedOption, setSelectedOption] = React.useState('All News Sources');
    
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('author');
    const [selected, setSelected] = React.useState([]);

    const [tableInfo1, setTableInfo1] = React.useState(props.info[0]);
    
    const [tableInfo2, setTableInfo2] = React.useState(props.info[1]);

    const [filtering, setFiltering] = React.useState(false);
    const textInput1 = React.useRef(null);
    const textInput2 = React.useRef(null);




    const open = Boolean(anchorEl);

   
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (event) => {
      setAnchorEl(null);
      const {myValue} = event.currentTarget.dataset;
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

    const onChange = (event) => {
        setFiltering(true);
      
        if(selectedOption === 'All News Sources'){
          const filteredRows = props.info[0].filter((row) => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase());
          });
          setTableInfo1(filteredRows)
  
        }else{
          const filteredRows = props.info[1].filter((row) => {
            return row.author.username.toLowerCase().includes(event.target.value.toLowerCase()) || row.text.toLowerCase().includes(event.target.value.toLowerCase());
          });
          setTableInfo2(filteredRows)
  
        }
        if(event.target.value ===''){
          setFiltering(false);
        }
  
        
      };
    
    const handleMouseDown = (event) => {
      event.preventDefault();
    };

    const clear = (event) => {
      
      setFiltering(false);
      if(selectedOption === 'All News Sources'){
        textInput1.current.value = "";
        const filteredRows = props.info[0].filter((row) => {
          return row.name.toLowerCase().includes('');
        });
        setTableInfo1(filteredRows)

      }else{
        textInput2.current.value = "";
        const filteredRows = props.info[1].filter((row) => {
          return row.author.username.toLowerCase().includes('') || row.text.toLowerCase().includes('');
        });
        setTableInfo2(filteredRows)

      }    
     
    };

    const options = [
        'All News Sources',
        'All Tweets'
      ];
      
    if(tableInfo1.length>COLORS.length){
        const number = tableInfo1[0].length - COLORS.length;
        COLORS.push(...COLORS.slice(0, number));
  
    }


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={handleClose}
        >
            {options.map((option) => (
                <MenuItem key={option} data-my-value={option} selected={option === selectedOption} onClick={handleClose}>
                    {option}
                </MenuItem>
            ))}
        </Menu>
    );
 


  return (
    <div className={classes.root}>
           <Paper elevation={2}>  
            <div className='allsources-menu-title'>
                <b>All News Sources  </b>
                <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                  <Link color="inherit" href='/NewsCollector/topnews/0'>
                    Top News Sources 
                  </Link>
                  <Link  color="textPrimary"  aria-current="page">
                    All News Sources
                  </Link>
                </Breadcrumbs>
            </div>     
            <div className='all-src-container'>
                <div className='table-all-src'>
                    { selectedOption === 'All News Sources'
                    ?
                    <div>
                      <Paper className={classes.paper}>
                        <Toolbar>
                            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                              {selectedOption} 
                            </Typography>
                            <div className={classes.search}>
                              <div className={classes.searchIcon}>
                                <SearchIcon />
                              </div>
                              <InputBase
                                inputRef = {textInput1}
                                placeholder="Search"
                                classes={{
                                  root: classes.inputRoot,
                                  input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange = {onChange}
                                endAdornment={
                                  filtering ? 
                                  <InputAdornment position="start">
                                    <CloseIcon onClick={clear} onMouseDown={handleMouseDown}/>
                                  </InputAdornment>
                                  :
                                 null
                                }
                              />
                            </div>
                          <div className={classes.grow} />
                          <div className={classes.sectionDesktop}>
                                <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleClick}
                                color="inherit"
                                >
                                    <i class="fas fa-sliders-h"></i>
                                </IconButton>
                            </div>
                        </Toolbar>

                      

                        <TableContainer component={Paper} className={classes.container}>
                        <Table 
                          className={classes.table}
                          aria-labelledby="tableTitle"
                          size='medium'
                          aria-label="collapsible table" 
                          stickyHeader
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">Rank</TableCell>
                              <TableCell align="left">News Source</TableCell>
                              <TableCell align="left">No. Tweets Found</TableCell>
                              <TableCell align="left">Percentage</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {tableInfo1.map((row, index) => (
                              <Row key={index} row={row} />
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
                            <div className={classes.search}>
                              <div className={classes.searchIcon}>
                                <SearchIcon />
                              </div>
                              <InputBase
                                inputRef={textInput2}
                                placeholder="Search…"
                                classes={{
                                  root: classes.inputRoot,
                                  input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange = {onChange}
                                endAdornment={
                                  filtering ? 
                                  <InputAdornment position="start">
                                    <CloseIcon onClick={clear} onMouseDown={handleMouseDown}/>
                                  </InputAdornment>
                                  :
                                 null
                                }
                              />
                          </div>
                          <div className={classes.grow} />
                          <div className={classes.sectionDesktop}>
                                <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleClick}
                                color="inherit"
                                >
                                    <i class="fas fa-sliders-h"></i>
                                </IconButton>
                            </div>
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
                                    {stableSort(tableInfo2, getComparator(order, orderBy))
                                    .map((row2, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;
                    
                                        return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClickSort(event, row2.text)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                        >
                                        
                                          <TableCell component="th" id={labelId} scope="row" style={{ 
                                                  whiteSpace: "initial",
                                                  textOverflow: "ellipsis",
                                                  width: "407px",
                                                  display: "block",
                                                  overflow: "hidden" }}>
                                                    
                                                <span style={{color: "Dodgerblue"}}>
                                                    <i class="fab fa-twitter"></i>&nbsp; 
                                                </span>
                                                <Link href={row2.url} target="_blank">
                                                    {row2.text}
                                                </Link>
                                            </TableCell>
                                          
                                            <TableCell align="left">
                                              {row2.author.username}
                                             
                                            </TableCell>
                                            <TableCell align="right">
                                                <i class="far fa-heart"></i>&nbsp; 
                                                {row2.likes}
                                            </TableCell>
                                            <TableCell align="right">
                                                <FaRetweet/> &nbsp; 
                                                {row2.retweets}
                                            </TableCell>
                                            <TableCell align="right">
                                              {new Date(row2.createdAt).toLocaleDateString()}
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

                {renderMenu}
                

            </div>
            <div className={classes.footer}>
              <Typography color='textSecondary' variant='subtitle2'>
                {selectedOption === 'All News Sources' ? "Total: " +tableInfo1.length + " News Sources": "Total: " +tableInfo2.length + " Tweets"}
              </Typography>

            </div>
            </Paper> 
            
        </div>
  )
}

export default AllSourcesTable