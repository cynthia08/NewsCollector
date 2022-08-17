import React, { useState, createRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { useContext } from 'react';
import UserContext from "./user-context";
import './css/HomeComponent.css';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AuthService from "./services/authServices";
import { useLocation, useHistory } from "react-router-dom";
import AboutComponent from './AboutComponent';
import login from '../assets/images/home-background_3.png';

/*
********************************************************************************************
  HomeComponent defines the content for the Home page.
********************************************************************************************
*/

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
    const history = useHistory(); 

    const [openError, setOpenError] = useState(false);
    const [userToken, setUserToken] = useState('');

    const { userID, setUserID } = useContext(UserContext);
    const classes = useStyles();

    const scrollDiv = createRef();

    useEffect(() => {
        if(location.state !== undefined){
            if(location.state.reason )
            setShowSessionExp(true);
        }
        
    }, []);
      

    const handleInputChange = (prop) => (e) => {

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
                    setErrorUFlag(false);
                    setUserID(AuthService.getCurrentUser());

                    history.push({
                        pathname: '/profile',
                        state: { 
                                pvalue: values.username,
                                from: "home" 
                            }// your data array of objects
                    });
                })
            .catch( 
                (error) => {
                    console.log(error);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setErrorUFlag(true);
                    setErrorU(error.response.data.message);
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
            <div className='main-container'>
                <div >
                    <img src={login} alt="Globals" className='home-ima'></img>

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
                                <p>Don't have an account? <Link href="/NewsCollector/register" variant="body2">Sign Up</Link></p>
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
            </div>



            <div className='divider-style' ref={scrollDiv}></div>
            <br/> <br/> <br/> <br/> 

            <div >
                <AboutComponent ></AboutComponent>
            </div>
        </div>
    )
}

export default HomeComponent
