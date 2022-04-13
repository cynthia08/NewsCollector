import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText'
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import tokenImage from '../assets/images/token_access.jpeg'
import { useContext, createContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import AuthService from "./services/authServices";
import './RegistrationComponent.css'
import SelectAlerts from './Alerts';
import LoadingComponent from './LoadingComponent';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RegistrationComponent() {

    const [values, setValues] = useState({
        email:'',
        password: '',
        
      });
    const [showPassword, setShowPassword] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false); 
    const [errorMessage, setErrorMessage] = useState(false);

    const [userToken, setUserToken] = useState('');
    const [errorU, setErrorU] = useState("");
    const [errorUFlag, setErrorUFlag] = useState(false);
    const [isLoadingU, setIsLoadingU] = useState(true);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);



    const history = useHistory();


    const handleInputChange = (prop) => (e) => {
        // console.log(event.target.name)
        //setValue( e.target.value);
        switch(prop){
            case "email":
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if ( re.test(e.target.value) ) {
                    console.log("valid email");
                    setCheckEmail(false);
                    console.log(checkEmail);
                
                }
                else{
                    console.log("invalid email");
                    setCheckEmail(true);
                    console.log(checkEmail);

                }
                break;
            case "password":
                if(e.target.value.length <6 ){
                    console.log("not pass password");
                    setCheckPassword(true);
                    console.log(checkPassword);
                }
                else{
                    console.log(" pass password");

                    setCheckPassword(false);
                }
                break;
        }

        setValues({ ...values, [prop]: e.target.value });
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleClose = (event, reason) => {
        console.log('close')
        if (reason === 'clickaway') {
        return;
        }
        setOpenSuccess(false);
        setOpenError(false);
        setOpenInfo(false);
        
  };

  const saveUser = async () => {
    await AuthService.register(values).then(
        (response) => {
            setIsLoadingU(false);
            console.log(response);
            setOpenSuccess(true);
            setErrorUFlag(false);
        })
    .catch( 
        (error) => {
            setErrorUFlag(true);
            setErrorU(error.response.data.message);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setOpenError(true);
            setIsLoadingU(false);
        });

    /*
        //axios.post('https://newshub.mortaga.de/api/auth/register', values)
        axios.get('https://newshub.mortaga.de/api/user')
        .then(response => {
            //setUserToken(response.data.token)
            setIsLoadingU(false);
            console.log(response.data);
            setOpenSuccess(true);
            setErrorUFlag(false);
            
        })
        .catch(error => {
            setErrorUFlag(true);
            setErrorU(error.response.data.message);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setOpenError(true);
            setIsLoadingU(false);
        })

    */

  }

    

    const handleSubmit = (prop) =>  (e) => {
        e.preventDefault();
        
        console.log("from submit form");
        console.log(checkEmail);
        console.log(checkPassword);
        if( !checkEmail && !checkPassword){
            setErrorMessage(false);
            setValues({ ...values, [prop]: e.target.value });
            console.log(values);

            /// here move call
                saveUser();
                /*
                if(responseFlag){
                    history.push({
                        pathname: '/profile',
                        state: { pvalue: values.email }// your data array of objects
                    });
                } else{
                    console.log("ERROR HERE");
                    console.log(errorU)
                
                }
                */
                

           

        }else{
            setErrorMessage(true);
        }

    }


  return (
    <div className='register-container'>
        <div>
            <form autoComplete="off" onSubmit={handleSubmit()} className='registration-input'>
                <div className='register-data'>
                    <h2>Create a new account</h2>  
                    <TextField 
                        error={checkEmail}
                        type="email"
                        required id="filled-basic-email" 
                        InputLabelProps={{ required: false }}
                        variant="outlined" label='Email' 
                        value={values.email}
                        onChange={handleInputChange('email')} 
                        helperText={checkEmail ? 'Invalid Email' : ''}/>

                    <FormControl variant="outlined">
                        <InputLabel 
                            htmlFor="outlined-adornment-password1"
                            error={checkPassword }>
                                Password
                            </InputLabel>
                        <OutlinedInput
                            error={checkPassword  }
                            helperText={checkPassword ? 'Invalid password, must contain at least 6 characters' : ''}
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
                        {!!checkPassword && (
                        <FormHelperText 
                            error={checkPassword ? true : false } 
                            id="password-error">
                            {'Invalid password, must contain at least 6 characters'}
                        </FormHelperText>
                        )}
                    </FormControl> 
                    {!!errorMessage && (
                         <p>Please check input data</p>
                        )}
                    <Button size="large" variant="contained" color="primary" type="submit" >
                        Register
                    </Button>
                    <div className='login-text'>
                        <p>Already have an account? <Link href="/" variant="body2">Log in</Link></p>
                    </div>
                </div>
                <div>
                    <div>
                        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                            Your user has been created! <Link href='/'> Log in</Link> to continue! 
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                            Error creating user! {errorU}
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openInfo} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="warning">
                            This is warning!
                            </Alert>
                        </Snackbar>
                    </div>
                </div>           
            </form>
        </div>
        <div className='register-ima'>

        </div>
    </div>
    
    
    );
}

export default RegistrationComponent;
