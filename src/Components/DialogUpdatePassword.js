import React ,{useState}from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import authService from './services/authServices';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText'
import CloseIcon from '@material-ui/icons/Close';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Portal from '@material-ui/core/Portal';

/*
********************************************************************************************
  DialogUpdatePassword creates the dialog box to update user's password information. 
********************************************************************************************
*/

const useStyles = makeStyles((theme) => ({
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        height: theme.spacing(20),
        justifyContent: 'space-around'
      
    }
  }));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function DialogUpdatePassword(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const [checkOldPassword, setCheckOldPassword] = useState(false);
    const [checkNewPassword, setCheckNewPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

   
    const [errorSnackbar,setErrorSnackbar] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const [open, setOpen] = React.useState(props.c_open);
  
    const handleCancel = () => {
      props.setShowDialog2(false);
    };


    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleMouseDownNewPassword = (e) => {
         e.preventDefault();
    };

    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleMouseDownOldPassword = (e) => {
         e.preventDefault();
    };


    const handleInputChange = (prop) => (e) => {
       
        switch(prop){
            case "old":
                if(e.target.value.length === 0 ){
                    setCheckOldPassword(true);
                }
                else{
                    setCheckOldPassword(false);
                }
                break;
            case "new":
                if(e.target.value.length < 6 ){
                    setCheckNewPassword(true);
                }
                else{
                    setCheckNewPassword(false);
                }
                break;
        }

        setValues({ ...values, [prop]: e.target.value });
    }

    const handleSubmitPassword = (prop) =>  (e) => {
        e.preventDefault();
        if( !checkNewPassword && ! checkOldPassword){          
            setErrorMessage(false);
            setValues({ ...values, [prop]: e.target.value });
           
            updatePassword(values); //call api to save user
            
        }else{
            setErrorMessage(true);
        }

    }

    const updatePassword = async (passwords) => {
            const cleanValues = {
                oldPassword: passwords.oldPassword,
                newPassword: passwords.newPassword
            }   
            
            await authService.updatePassword(cleanValues).then(
                (response) => {
                    props.setShowDialog2(false);
                    setOpenSuccess(true);
                })
            .catch( 
                (error) => {
                    setErrorSnackbar(error.response.data.message);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    props.setShowDialog2(true);
                    setOpenError(true);
                    
                });
            
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenSuccess(false);
        setOpenError(false);
        
  };



  return (
    <div>
        <Dialog  
        open={props.c_open} 
        onClose={props.close}
        aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Password</DialogTitle>
            <form autoComplete="off" onSubmit={handleSubmitPassword()} >
            <DialogContent>
            <DialogContentText>
                Choose a new password for your account.
            </DialogContentText>
            <div className={classes.inputs}>
                <FormControl variant="outlined">
                    <InputLabel required
                        htmlFor="outlined-adornment-password1"
                        error={checkOldPassword }>
                            Old Password
                        </InputLabel>
                    <OutlinedInput
                        error={checkOldPassword  }
                        helperText={checkOldPassword ? 'Invalid password, you must input previous password' : ''}
                        required id="outlined-adornment-password-old"
                        label="Package Type"
                        type={showOldPassword ? 'text' : 'password'}
                        value={values.oldPassword}
                        onChange={handleInputChange('oldPassword')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownOldPassword}
                            edge="end"
                            >
                            {showOldPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={70}
                    /> 
                    {!!checkOldPassword && (
                    <FormHelperText 
                        error={checkOldPassword ? true : false } 
                        id="password-error">
                        {'Invalid password, you must input previous password'}
                    </FormHelperText>
                    )}
                </FormControl> 
                <FormControl variant="outlined">
                    <InputLabel 
                        htmlFor="outlined-adornment-password1"
                        required
                        error={checkNewPassword }>
                            New Password
                        </InputLabel>
                    <OutlinedInput
                        error={checkNewPassword  }
                        helperText={checkNewPassword ? 'Invalid password, must contain at least 6 characters' : ''}
                        required id="outlined-adornment-password-new"
                        label="Package Type"
                        type={showNewPassword ? 'text' : 'password'}
                        value={values.newPassword}
                        onChange={handleInputChange('newPassword')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownNewPassword}
                            edge="end"
                            >
                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={70}
                    /> 
                    {!!checkNewPassword && (
                    <FormHelperText 
                        error={checkNewPassword ? true : false } 
                        id="password-error">
                        {'Invalid password, must contain at least 6 characters'}
                    </FormHelperText>
                    )}
                </FormControl> 


                {!!errorMessage && (
                        <h4 style={{color:"Red"}}>**Please check input data</h4>
                    )}
               
            
            </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button color="primary" type="submit">
                    Update
                </Button>
            </DialogActions>
        </form>
      
        </Dialog>
        <div>    
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                Information updated!
                </Alert>
            </Snackbar>
            <Portal>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error">
                    Error updating information! {errorSnackbar}. Check old password or try again later.
                    </Alert>
                </Snackbar>
            </Portal>
        </div>
        

    </div>
  )
}

export default DialogUpdatePassword