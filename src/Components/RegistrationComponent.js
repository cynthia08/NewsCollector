import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import AuthService from "./services/authServices";
import './css/RegistrationComponent.css'
import register from '../assets/images/register-background4.png';

/*
********************************************************************************************
  RegistrationComponent defines the content for the user register page.
********************************************************************************************
*/

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RegistrationComponent() {

    const [values, setValues] = useState({
        email:'',
        password: '',
        name:''
      });
    const [showPassword, setShowPassword] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkName, setCheckName] = useState(false);
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
       
        switch(prop){
            case "name":
                if(e.target.value.length <3 ){
                    setCheckName(true);
                }
                else{
                    setCheckName(false);
                }
                break;
            case "email":
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if ( re.test(e.target.value) ) {
                    setCheckEmail(false);
                
                }
                else{
                    setCheckEmail(true);

                }
                break;
            case "password":
                if(e.target.value.length <6 ){
                    setCheckPassword(true);
                }
                else{
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

  

  }

    

    const handleSubmit = (prop) =>  (e) => {
        e.preventDefault();
        
      
        if( !checkEmail && !checkPassword && !checkName){
            setErrorMessage(false);
            setValues({ ...values, [prop]: e.target.value });
            saveUser(); //call api to save user

           /* 
            if(errorUFlag===false){
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
        <div className='register-data'>
            <form autoComplete="off" onSubmit={handleSubmit()} className='registration-input'>
                <h2>Create a new account</h2> 
                <TextField 
                    error={checkName}
                    type="string"
                    inputProps={{ maxLength: 30 }}
                    required id="filled-basic-name" 
                    InputLabelProps={{ required: false }}
                    variant="outlined" label='Name' 
                    value={values.name}
                    onChange={handleInputChange('name')} 
                    helperText={checkName ? 'Invalid name, must contain at least 6 characters' : ''}/> 
                <TextField 
                    error={checkEmail}
                    type="email"
                    required id="filled-basic-email" 
                    InputLabelProps={{ required: false }}
                    variant="outlined" label='Email' 
                    value={values.email}
                    onChange={handleInputChange('email')} 
                    helperText={checkEmail ? 'Invalid Email format' : ''}/>

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
                    
                        <h4 style={{color:"Red"}}>**Please check input data</h4>
                    )}
                <Button size="large" variant="contained" color="primary" type="submit" >
                    Register
                </Button>
                <div className='login-text'>
                    <p>Already have an account? <Link href="/NewsCollector/" variant="body2">Log in</Link></p>
                </div>
            </form>
            <div>    
                <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                    Your user has been created! <Link href='/NewsCollector/'> Log in</Link> to continue! 
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                    Error creating user! {errorU}
                    </Alert>
                </Snackbar>
              
            </div>
        </div>
        <div >
            <img src={register} alt="Globals" className='register-ima'></img>
        </div>
       
    </div>
    
    
    );
}

export default RegistrationComponent;
