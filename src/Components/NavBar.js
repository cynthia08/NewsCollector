import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { grey } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AuthService from "./services/authServices";
import { useHistory } from "react-router-dom";
import './css/NavBar.css'
import DialogFileUpload from './DialogFileUpload';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import authService from './services/authServices';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DialogUpdatePassword from './DialogUpdatePassword';
import DialogUpdateAccount from './DialogUpdateAccount';


/*
********************************************************************************************
  NavBar defines the content for navigation bar when user is login.
********************************************************************************************
*/

const useStyles = makeStyles((theme) => ({
    orange: {
      color: theme.palette.getContrastText("#2583A8"),
      backgroundColor: "#2583A8",
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        height: theme.spacing(23),
        justifyContent: 'space-around'
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
        }
    },
    
   

  }));
 
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NavBar() {

    //test
    const [callback, setCallback] = useState('')


    const [click, setClick] = useState(false);
    const [openAccountMenu, setOpenAccountMenu] = useState(true);
    const [showUpdateInfo, setShowUpdateInfo] = useState(false);
    const [showDialog1, setShowDialog1] = useState(false);
    const [showDialog2, setShowDialog2] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorSnackbar,setErrorSnackbar] = useState('');

    const [showSettings, setShowSettings] = useState(false);
    const [showGlobal, setShowGlobal] = useState(false);
    const [errorSubmit, setErrorSubmit] = React.useState(false);
    const [checkAccount, setCheckAccount] = React.useState(false);


    const [showWarningFile, setShowWarningFile] = useState(false);

    const handleCloseWarning = (event, reason) => {
        setShowWarningFile(false);
    };

    
    useEffect(() => {
        if(authService.isFileLoadedJSON(0)===null){
            if( history.location.pathname === '/profile' ||
                history.location.pathname === '/profile/details' ||
                history.location.pathname === '/comparison' ||
                history.location.pathname === '/reactions' ){ 
                setShowWarningFile(true);    
            }else{
                setShowWarningFile(false);
            }
        }
        
    }, [authService.getJSONData(0)])
    
    
    


    const handleClick = () => setClick(!click);
    const closeSmallMenu = () => setClick(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();
    const history = useHistory();
    const url = '';

    //dialogs states
    const [values, setValues] = useState({
        email: authService.getEmail(),
        name: authService.getName()
      });

    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: ''
    });

    const [checkEmail, setCheckEmail] = useState(false);
    const [checkName, setCheckName] = useState(false);
    const [test, setTest] = useState('');

  
    const [errorMessage, setErrorMessage] = useState(false);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleClickAccount = () => {
        setOpenAccountMenu(!openAccountMenu);
    };
    
    const handleCloseUpdateInfo = () => {
        setShowDialog1(false);
    };

    const handleCloseD1 = () => {
        setShowDialog1(false);
    };

    const handleCloseD2 = () => {
        setShowDialog2(false);
    };

    const handleClosePassword = () => {
        setShowDialog2(false);
    };

    const handleAccountUpdate = () => {
        setShowDialog1(true);
        setAnchorEl(null);
    };

    const handlePasswordUpdate = () => {
        setShowDialog2(true);
        setAnchorEl(null);

    };
    
    // Upload dialog
    const handleSettings = () => {
        setAnchorEl(null);
        setShowSettings(true);
    }

    const handleCloseSettings = (event, reason) => {
        //if(reason !== "backdropClick" && AuthService.isFileLoadedJSON(0) ){
            //setShowSettings(false);
            //window.location.reload(false);
        //}
        setShowSettings(false);
        window.location.reload(false);
        setShowWarningFile(true);
    
    };

    const handleLogOut = () => {
        setAnchorEl(null);
        AuthService.logout();
        history.push({
            pathname: '/',
            //state: { pvalue: values.username } your data array of objects
          });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
        
    };



    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/profile" className="navbar-logo">                     
                        <i class="fas fa-dice-d20 fa-2x"  />
                        <div className="navbar-name">
                            <b>News Collector {callback}</b>
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
                            <Link to='/topnews/0' className="nav-links" onClick={closeSmallMenu}>
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
                            <Avatar className={classes.orange}>{AuthService.getName().charAt(0)}</Avatar>
                            <ArrowDropDownIcon style={{ color: grey[50] }}></ArrowDropDownIcon>
                            
                        </IconButton>
                        <Menu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{  
                                style: {  
                                  width: 330,  
                                },  
                             }}

                        >
                            <ListItem button onClick={handleClickAccount}>
                                <ListItemIcon>
                                <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={AuthService.getName()} secondary={AuthService.getEmail()} />
                                {openAccountMenu ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openAccountMenu} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                   
                                    <ListItem button className={classes.nested}>
                                        <ListItemText onClick={handleAccountUpdate} primary="Change account information" />
                                    </ListItem>
                                    <ListItem button className={classes.nested}>
                                        <ListItemText onClick={handlePasswordUpdate} primary="Change password" />
                                    </ListItem>
                                    <ListItem button className={classes.nested}>
                                        <ListItemText onClick={handleSettings} primary="Manage Your Profile Reactions" secondary="Upload Your Likes and Retweets stats" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button>
                                <ListItemIcon>
                                <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText onClick={handleLogOut} primary="Log Out" />
                            </ListItem>
                            
                        </Menu>


                    </div>                  
                        
                    <DialogUpdateAccount
                        setShowDialog1 ={setShowDialog1}
                        c_open = {showDialog1}
                        close = {handleCloseUpdateInfo}
                    />
                     <DialogUpdatePassword
                        setShowDialog2 ={setShowDialog2}
                        c_open = {showDialog2}
                        close = {handleClosePassword}
                    />
                    <DialogFileUpload  
                        setShowWarningFile = {setShowWarningFile}
                        setShowSettings ={setShowSettings}
                        c_open = {showSettings}
                        close = {handleCloseSettings}
                    />
                                     
                </div>

            </nav>
            <Snackbar open={showWarningFile} autoHideDuration={5500} onClose={handleCloseWarning}>
                <Alert onClose={handleCloseWarning} severity="info">
                    Update reactions file in your account to show complete stats.
                </Alert>
            </Snackbar>
            
        </div>
    )
}

export default NavBar
