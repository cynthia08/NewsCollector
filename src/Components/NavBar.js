import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { deepOrange, cyan, lightBlue, grey } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AuthService from "./services/authServices";
import { useHistory } from "react-router-dom";
import FetchService from "./services/fetchServices";
import './NavBar.css'
import DialogComponent from './DialogComponent';


const useStyles = makeStyles((theme) => ({
    orange: {
      color: theme.palette.getContrastText("#2583A8"),
      backgroundColor: "#2583A8",
    },
  }));
 
function NavBar() {
    const [click, setClick] = useState(false);
    const [showUser, setShowUser] = useState(false);
    const handleClick = () => setClick(!click);
    const closeSmallMenu = () => setClick(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();
    const history = useHistory();
    const url = '';
    
    const { userData, error, isLoading } = FetchService.useFetchUser(url);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAccount = () => {
        setAnchorEl(null);
        setShowUser(true);
    };

    const handleCloseUser = () => {
        setShowUser(false);
    };

    const handleLogOut = () => {
        setAnchorEl(null);
        AuthService.logout();
        history.push({
            pathname: '/',
            //state: { pvalue: values.username } your data array of objects
          });
    };



    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/profile" className="navbar-logo">                     
                        <i class="fas fa-dice-d20 fa-2x"  />
                        <div className="navbar-name">
                            <b>News Collector</b>
                        </div>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars fa-sm'}/>
                    </div>
                    <ul className={click ? 'nav-menu active': 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/profile' className="nav-links" onClick={closeSmallMenu}>
                            Your Profile Results
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/topnews/1' className="nav-links" onClick={closeSmallMenu}>
                            Top News Sources
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/comparison' className="nav-links" onClick={closeSmallMenu}>
                            Global Stats
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/about' className="nav-links" onClick={closeSmallMenu}>
                            About
                            </Link>
                        </li>
                       
                    </ul>
                    <div className='login-nav'>
                        <IconButton
                            size="medium"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar className={classes.orange}>H</Avatar>
                            <ArrowDropDownIcon style={{ color: grey[50] }}></ArrowDropDownIcon>
                            
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleAccount}>My Account</MenuItem>
                            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                        </Menu>

                    </div>
                    <DialogComponent
                        c_open = {showUser}
                        username = {userData.name} 
                        date_c = {userData.date_created}
                        close = {handleCloseUser} >

                    </DialogComponent>
                        
                </div>

            </nav>
            
        </div>
    )
}

export default NavBar
