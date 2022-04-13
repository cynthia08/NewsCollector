import React, { useState, createRef, useEffect } from 'react';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import tokenImage from '../assets/images/token_access.jpeg'
import { useContext, createContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "./user-context";
import './HomeComponent.css';
import home01 from '../assets/images/home001.png';
import home02 from '../assets/images/home002.png';
import home03 from '../assets/images/home003.png';
import home04 from '../assets/images/home004.png';
import home05 from '../assets/images/home04_2.png';
import divider from '../assets/images/divider.png';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AuthService from "./services/authServices";
import FetchService from "./services/fetchServices";
import { useLocation } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    }));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function HomeComponent() {
    const [values, setValues] = useState({
        email: '',
        password: '',
      });

    const [showPassword, setShowPassword] = useState(false);
    const [errorU, setErrorU] = useState("");
    const [errorUFlag, setErrorUFlag] = useState(false);
    const [showSessionExp, setShowSessionExp ] = useState(false);
    const location = useLocation();
    

    const [openError, setOpenError] = useState(false);
    const [userToken, setUserToken] = useState('');

    const history = useHistory();
    const { userID, setUserID } = useContext(UserContext);
    const classes = useStyles();

    const scrollDiv = createRef();

    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
          backgroundColor: '#f5f5f9',
          color: 'rgba(0, 0, 0, 0.87)',
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
      }))(Tooltip);

    useEffect(() => {
        if(location.state !== undefined){
            if(location.state.reason )
            console.log(location.state.reason);
            setShowSessionExp(true);
        }
        
    }, []);
      

    const handleInputChange = (prop) => (e) => {
        // console.log(event.target.name)
        //setValue( e.target.value);
        setValues({ ...values, [prop]: e.target.value });
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
        setShowSessionExp(false);
        
    };

    const scrollHandler = () => {
        scrollDiv.current.scrollIntoView({ behavior: "smooth" });
      };
  
    const loginPost = async () => {
        await AuthService.login(values).then(
                (response) => {
                    console.log(response);
                    setErrorUFlag(false);
                    setUserID(AuthService.getCurrentUser());

                    history.push({
                        pathname: '/profile',
                        state: { pvalue: values.username }// your data array of objects
                    });
                })
            .catch( 
                (error) => {
                    console.log(error);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setErrorUFlag(true);
                    setErrorU(error.message);
                    setOpenError(true);
                });
    }

    const handleSubmit = (prop) =>  (e) => {
        e.preventDefault();
        //setValue( value);
        setValues({ ...values, [prop]: e.target.value });
        loginPost();    

    }

    return (
        <div>
            
            <div className='home-ima'>

            </div>
            
            <div className='home-text'>
                <h1>
                    Your News profile from Twitter 
                </h1><br/>
                <p>
                With the News Collector plugin you can know the main news 
                sources that provide information in your Twitter profile based on your ammount of likes
                and retweets.</p>
                
                <Link onClick={scrollHandler} variant="body2" component="button">
                    Learn more
                </Link>
                <br/><br/>
                <div>
                <form autoComplete="off" onSubmit={handleSubmit('username')} className='login-input'>
                    <div className='login-tooltip'>
                    
                        <h3>Login</h3>
                        
                        { /*
                        <HtmlTooltip
                            title={
                            <React.Fragment>
                                <Typography color="inherit">What is this ID?</Typography>
                                <b>{'You can find your Anonymous ID in the '}</b> <u>{'plugin window'}</u> <b>{'when activating the extension in your browser'}</b>
                                <img src={tokenImage} height='100' width='200'/>
                            </React.Fragment>
                            }>
                            <IconButton aria-label="help" >
                                <HelpIcon fontSize="small" />
                            </IconButton>
                        </HtmlTooltip>
                        */
                        }
                    </div>
                    
                    <TextField 
                        required id="filled-basic" 
                        InputLabelProps={{ required: false }}
                        variant="outlined" label='Email' 
                        value={values.email}
                        onChange={handleInputChange('email')} />

                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password1">Password</InputLabel>
                        <OutlinedInput
                            required id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleInputChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={70}
                        /> 
                    </FormControl>    
                        <Button size="large" variant="contained" color="primary" type="submit" >
                            Submit
                        </Button>
                        <div className='register-text'>
                            <p>Don't have an account? <Link href="/register" variant="body2">Sign Up</Link></p>
                        </div>
                    </form>
                    <div>
                        <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                            Check credentials. {errorU}
                            </Alert>
                        </Snackbar>
                    </div>
                    <div>
                        <Snackbar open={showSessionExp} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="warning">
                            Session Expired. Please Login again.
                            </Alert>
                        </Snackbar>
                    </div>

                </div>
            </div>
            <div className='divider-style'></div>
            <br/> <br/> <br/> <br/> 

            <div className='learn-more' ref={scrollDiv}>
                <div className='intro-learnmore'>
                    <h2>News Collector plugin</h2>
                    <img src={divider} alt="Top1" height={4} width={200}></img>

                    <h4>Many people use Social Media to share content online. 
                        The recommendation algorithms running in the background of
                         these social media sites add an additional layer of 
                         complexity by filtering the information based on the 
                         user's history, likes, and comments, which in turn influence 
                         the opinion of the people interacting with it.
                    </h4>
                    <h4>

                         With the browser plugin you collect the News information present
                         on your Twitter's feed. Only the URLs with News content will be collected.
                         By using the News Collector website you can review the results from
                         the analysis on the information received from the plugin.

                    </h4>

                </div>
                <div className='profile-info'>
                    <div className='profile-ima'>
                        <img src={home01} alt="Profile" height={400} width={500}></img>
                    </div>
                    <div className='profile-text'>
                        <h2>Your Profile</h2>
                        <img src={divider} alt="Top1" height={4} width={100}></img>
                        <h4>Review the main News Sources appearing
                             in your Twitter feed and compare with your reactions
                             (Likes and Retweets). 
                        </h4>
                    </div>
                </div>
                <div className='divider-style'></div>
                <div className='top1-info'>
                    <div className='top1-text'>
                        <h2>Main News Sources</h2>
                        <img src={divider} alt="Top1" height={4} width={100}></img>
                        <h4>Learn the amount of News data you are seeing in your Twitter's feed 
                            from the different News Source.
                        </h4>
                    </div>
                    <div className='top1-ima'>
                        <img src={home02} alt="Top1" height={450} width={300}></img>
                    </div>
                </div>
                <div className='divider-style'></div>

                <div className='top2-info'>
                    <div className='top2-ima'>
                        <img src={home03} alt="Top2" height={400} width={500}></img>
                    </div>
                    <div className='top2-text'>
                        <h2>URLs by News Source</h2>
                        <img src={divider} alt="Top1" height={4} width={100}></img>
                        <h4>Get details on each of the URLs found and compare how diverse and visible is the content of
                            the each of the News Sources.
                        </h4>
                    </div>
                    
                </div>
                <div className='divider-style'></div>
                <div className='global-info'>
                    <div className='global-text'>
                        <h2>Global Details</h2>
                        <img src={divider} alt="Top1" height={4} width={100}></img>
                        <h4>Compare your statistics with other users using the same plugin and see how the numbers differentiate
                            for each of the News Sources.
                        </h4>
                    </div>
                    <div className='global-ima'>
                        <img src={home05} alt="Globals" height={600} width={550}></img>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomeComponent
