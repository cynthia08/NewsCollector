import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import {FaRetweet} from "react-icons/fa";
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import * as helpers from './services/helpers';

/*
********************************************************************************************
  TableEnhaced defines the content for tweets table information in Top News Sources.
********************************************************************************************
*/

    
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
    { id: 'title', numeric: false, disablePadding: false, label: 'News Tweets' },
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
        <TableRow>
        
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
      paddingLeft: theme.spacing(0),
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
    small: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    }
  }));
  
  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();

    const number = parseInt(props.id) +1;
    
    return (
      <Toolbar className={classes.root}>
          <CardHeader
              avatar={
                <Avatar
                  className={classes.small}
                  alt="avatar_row"
                  src={helpers.imageURLClean(props.srcData.avatar)}
                />
              }
              title={number +". " +props.srcData.username +" - " + props.srcData.num_links + " Tweets"}
              titleTypographyProps={{variant:'h6' }}

            />
         
        
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
  


function TableEnhaced(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('date');
    const [selected, setSelected] = React.useState([]);
    const info = props.tableData;

  
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
                     

                      <TableCell component="th" id={labelId} scope="row" 
                      style={{ 
                        whiteSpace: "initial",
                        textOverflow: "ellipsis",
                        width: "350px",
                        display: "block",
                        overflow: "hidden" }}
                      >
                          <span style={{color: "Dodgerblue"}}>
                              <i class="fab fa-twitter"></i>&nbsp; 
                          </span>
                          
                            <Link href={row.url} target="_blank">
                                {row.title}
                            </Link>
                          
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