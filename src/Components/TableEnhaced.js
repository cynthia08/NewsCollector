import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import {FaRetweet} from "react-icons/fa";
import Tooltip from '@material-ui/core/Tooltip';




  function createData(title, url, likes, retweets, date) {
    return { title, url, likes, retweets, date };
  }

  function getData(id){
    const icons_obj1 ={
        id : 1,
        news_name: 'BBC News',
        percentage: 50
    }

    const icons_obj2 ={
        id : 2,
        news_name: 'CNN',
        percentage: 20
    }

    const icons_obj3 ={
        id : 3,
        news_name: 'Euro News',
        percentage: 10
    }

    const icons_obj4 ={
        id : 4,
        news_name: 'abc News',
        percentage: 9
    }

    const icons_obj5 ={
        id : 5,
        news_name: 'The Post',
        percentage: 7
    }

    const icons_obj6 ={
        id : 6,
        news_name: 'N.Y. Times',
        percentage: 5
    }

    const info_icons = [icons_obj1, icons_obj2, icons_obj3, icons_obj4, icons_obj5, icons_obj6];

    const rows1 = [
        createData('UK vaccine effectiveness...', 'https://www.google.com', 50, 21, "2021-02-10T22:42:09Z"),
        createData('Police in New York creates...', 'https://www.google.com', 35, 12, "2021-10-12T22:42:09Z"),
        createData('US city lost in caos because...', 'https://www.google.com', 24, 45, "2021-10-24T22:42:09Z"),    
        createData('Taliban forces take capital...', 'https://www.google.com', 67, 43, "2021-10-12T22:42:09Z"),
        createData('COVID vaccine requirement...', 'https://www.google.com', 49, 43, "2021-12-10T22:42:09Z"),
        createData('Earthquake strikes city...', 'https://www.google.com', 24, 21, "2021-10-29T22:42:09Z"),
        createData('Justice department helps...', 'https://www.google.com', 37, 32, "2021-10-12T22:42:09Z"),
        createData('Flight carrying 15900 tons of...', 'https://www.google.com', 24, 32, "2021-12-24T22:42:09Z"),
        createData('Tropical storm hits bay in...', 'https://www.google.com', 67, 22, "2021-08-11T22:42:09Z"),
        createData('Poweful earthquake hits...', 'https://www.google.com', 49, 12, "2021-02-12T22:42:09Z"),
        createData('Earthquake strikes city...', 'https://www.google.com', 24, 12, "2021-10-29T22:42:09Z"),
        createData('Justice department helps...', 'https://www.google.com', 37, 45, "2021-10-18T22:42:09Z"),
        createData('Flight carrying 15900 tons of...', 'https://www.google.com', 24, 23, "2021-12-06T22:42:09Z"),
        createData('Tropical storm hits bay in...', 'https://www.google.com', 67, 56, "2021-08-18T22:42:09Z"),
        createData('Poweful earthquake hits...', 'https://www.google.com', 49, 34, "2021-02-12T22:42:09Z"),
        
      ];

    const rows2 = [
        createData('COVID vaccine requirement...', 'https://www.facebook.com', 51, 45, "2021-02-10T22:42:09Z"),
        createData('Tropical storm hits bay in...', 'https://www.facebook.com', 35, 23, "2021-10-12T22:42:09Z"),
        createData('Poweful earthquake hits...', 'https://www.facebook.com', 24, 34, "2021-10-12T22:42:09Z"),
        createData('Flight carrying 15900 tons of...', 'https://www.facebook.com', 67,65, "2021-10-12T22:42:09Z"),
        createData('Justice department helps...', 'https://www.facebook.com', 49, 45, "2021-12-24T22:42:09Z"),
        createData('Earthquake strikes city...', 'https://www.facebook.com', 24, 34, "2021-08-11T22:42:09Z"),
        createData('Taliban forces take capital...', 'https://www.facebook.com', 37, 12, "2021-10-29T22:42:09Z"),
        createData('US city lost in caos because...', 'https://www.facebook.com', 24, 34, "2021-12-06T22:42:09Z"),
        createData('Police in New York creates...', 'https://www.facebook.com', 67, 19, "2021-10-12T22:42:09Z"),
        createData('UK vaccine effectiveness...', 'https://www.facebook.com', 49, 10, "2021-08-18T22:42:09Z"),
      ];

    const rows3 = [
        createData('Flight carrying 15900 tons of...', 'https://www.twitter.com', 60, 12, "2021-02-10T22:42:09Z"),
        createData('COVID vaccine requirement...', 'https://www.twitter.com', 35, 45, "2021-10-12T22:42:09Z"),
        createData('Poweful earthquake hits...', 'https://www.twitter.com', 24, 65, "2021-10-12T22:42:09Z"),
        createData('Justice department helps...', 'https://www.twitter.com', 67, 13, "2021-12-24T22:42:09Z"),
        createData('Taliban forces take capital...', 'https://www.twitter.com', 49, 34, "2021-08-11T22:42:09Z"),
        createData('UK vaccine effectiveness...', 'https://www.twitter.com', 24, 89, "2021-10-29T22:42:09Z"),
        createData('Earthquake strikes city...', 'https://www.twitter.com', 37, 45, "2021-12-06T22:42:09Z"),
        createData('Tropical storm hits bay in...', 'https://www.twitter.com', 24, 34, "2021-10-12T22:42:09Z"),
        createData('US city lost in caos because...', 'https://www.twitter.com', 67, 19, "2021-08-18T22:42:09Z"),
        createData('Police in New York creates...', 'https://www.twitter.com', 49, 23, "2021-02-12T22:42:09Z"),
      ];

      const rows4 = [
        createData('Police in New York creates...', 'https://www.instagram.com', 76, 23, "2021-02-10T22:42:09Z"),
        createData('US city lost in caos because...', 'https://www.instagram.com', 35, 21, "2021-10-12T22:42:09Z"),
        createData('COVID vaccine requirement...', 'https://www.instagram.com', 24, 18, "2021-10-12T22:42:09Z"),
        createData('Justice department helps...', 'https://www.instagram.com', 67, 19, "2021-12-24T22:42:09Z"),
        createData('Flight carrying 15900 tons of..', 'https://www.instagram.com', 49, 20, "2021-08-11T22:42:09Z"),
        createData('US city lost in caos because...', 'https://www.instagram.com', 24, 10, "2021-12-06T22:42:09Z"),
        createData('Taliban forces take capital...', 'https://www.instagram.com', 37, 9, "2021-10-12T22:42:09Z"),
        createData('Tropical storm hits bay in...', 'https://www.instagram.com', 24, 23, "2021-02-12T22:42:09Z"),
      ];

      const rows5 = [
        createData('COVID vaccine requirement...', 'https://www.pinterest.com', 55, 12, "2021-08-11T22:42:09Z"),
        createData('US city lost in caos because...', 'https://www.pinterest.com', 35, 15, "2021-02-10T22:42:09Z"),
        createData('Taliban forces take capital...', 'https://www.pinterest.com', 24, 25, "2021-02-12T22:42:09Z"),
        createData('UK vaccine effectiveness...', 'https://www.pinterest.com', 67, 34, "2021-10-12T22:42:09Z"),
        createData('Earthquake strikes city...', 'https://www.pinterest.com', 49, 56, "2021-12-06T22:42:09Z"),
        createData('Justice department helps...', 'https://www.pinterest.com', 24, 34, "2021-10-29T22:42:09Z"),
 
      ];

      const rows6 = [
        createData('Justice department helps...', 'https://www.youtube.com', 53, 56, "2021-10-29T22:42:09Z"),
        createData('COVID vaccine requirement...', 'https://www.youtube.com', 35, 67, "2021-12-06T22:42:09Z"),
        createData('Poweful earthquake hits...', 'https://www.youtube.com', 24, 89, "2021-10-12T22:42:09Z"),
        createData('Police in New York creates...', 'https://www.youtube.com', 67, 23, "2021-02-12T22:42:09Z"),
        createData('Taliban forces take capital...', 'https://www.youtube.com', 49, 34, "2021-08-11T22:42:09Z"),

      ];
      
      let info=null;

      switch(id){
          case 1:
               info={
                  id: 1,
                  news_name: 'BBC News',
                  links: rows1,
                  percentage: icons_obj1.percentage
              }
              return info;
          case 2:
                info={
                    id: 2,
                    news_name: 'CNN',
                    links: rows2,
                    percentage: icons_obj2.percentage
                }
                return info;
          case 3:
                info={
                    id: 3,
                    news_name: 'Euro News',
                    links: rows3,
                    percentage: icons_obj3.percentage
                }
                return info;
          case 4: 
                info={
                    id: 4,
                    news_name: 'abc News',
                    links: rows4,
                    percentage: icons_obj4.percentage
                }
                return info;
          case 5:
                info={
                    id: 5,
                    news_name: 'The Washington Post',
                    links: rows5,
                    percentage: icons_obj5.percentage
                }
                return info;
          case 6:
                info={
                    id: 6,
                    news_name: 'New York Times',
                    links: rows6,
                    percentage: icons_obj6.percentage
                }
                return info;

      }

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
    { id: 'title', numeric: false, disablePadding: false, label: 'News Links' },
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
    const colors =["#CB2424", "#8B0B0B", "#038CED", "#3ABEC7", "#ACACAC", "#3B8820"];
    //const info = getData(props.id);
    const percentage = ((props.srcData.num_links*100)/props.totalL).toFixed();
    console.log("enhaced table");
    
    return (
      <Toolbar className={classes.root}>
        
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            <i class="fas fa-circle" style={{color:colors[props.id-1]}}></i>&nbsp; 
            {props.id}. {props.srcData.source_name} - {percentage} %
          </Typography>
        
      </Toolbar>
    );
  };
 
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    container: {
        maxHeight: 400,  
    },
    table: {
      
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
  
  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 250,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);


function TableEnhaced(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('title');
    const [selected, setSelected] = React.useState([]);
    console.log("new table");
    console.log(props.id_news);
    const info = props.tableData;
    console.log(info);
    //const info = getData(props.id_news);
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleClick = (event, name) => {
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
    const tempA = "2021-10-02T22:42:09Z";
    const tempB = "2021-03-24T22:42:09Z"
  
    
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar id={props.id_news} srcData={props.tableData} totalL={props.totalLinks}/>
          <TableContainer className={classes.container}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='medium'
              aria-label="enhanced table"
              stickyHeader
            >

              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(info.urls, getComparator(order, orderBy))
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.title)}
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                      >
                
                        <TableCell component="th" id={labelId} scope="row" style={{ 
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          width: "300px",
                          display: "block",
                          overflow: "hidden" }}
                        >
                            <span style={{color: "Dodgerblue"}}>
                                <i class="fab fa-twitter"></i>&nbsp; 
                            </span>
                            <HtmlTooltip
                              title={
                              <React.Fragment>
                                  <b>{row.title}</b>
                              </React.Fragment>
                              }
                            >
                              <Link href={row.url}>
                                  {row.title}
                              </Link>
                            </HtmlTooltip>
                        </TableCell>
                        <TableCell align="right">
                            <i class="far fa-heart"></i>&nbsp; 
                            {row.no_likes}
                        </TableCell>
                        <TableCell align="right">
                            <FaRetweet/> &nbsp; 
                            {row.no_retweets}
                        </TableCell>
                        <TableCell align="right">
                            {new Date(row.date).toLocaleDateString()}
                        </TableCell>
                       
                      </TableRow>
                    );
                  })}
                
              </TableBody>
            </Table>
          </TableContainer>
          
        </Paper>
        
      </div>
    );
  }

  export default TableEnhaced