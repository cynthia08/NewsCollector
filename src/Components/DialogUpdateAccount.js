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
import Portal from '@material-ui/core/Portal';

/*
********************************************************************************************
  DialogUpdateAccount creates the dialog box to update user's account information. 
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

function DialogUpdateAccount(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        email:authService.getEmail(),
        name:authService.getName()
      });
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkName, setCheckName] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const [errorSnackbar,setErrorSnackbar] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(false);


    const [open, setOpen] = React.useState(props.c_open);
  
    const handleClose = () => {
      props.setShowDialog1(false);
    };


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
        }

        setValues({ ...values, [prop]: e.target.value });
    }

    const handleSubmitAccount = (prop) =>  (e) => {
        e.preventDefault();
        if( !checkEmail && !checkName){
            setErrorMessage(false);
            setValues({ ...values, [prop]: e.target.value });
            if(values.name !== authService.getName() || values.email !== authService.getEmail()){
                updateUser(values); //call api to save user
            }
        }else{
            setErrorMessage(true);
        }

    }

    const updateUser = async (values) => {
        const cleanValues = {
            name: values.name,
            email: values.email
        }
        
        await authService.updateAccount(cleanValues).then(
            (response) => {
                setErrorSubmit(false);
                props.setShowDialog1(false);
                authService.updateDisplayData(cleanValues.name, cleanValues.email);
                setOpenSuccess(true);
            })
        .catch( 
            (error) => {
                setErrorSubmit(true);
                setErrorSnackbar(error.response.data.message);
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                props.setShowDialog1(false);
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
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Account Information</DialogTitle>
            <form autoComplete="off" onSubmit={handleSubmitAccount()} >
                <DialogContent>
                    <DialogContentText>
                        Choose a name and an email to update your account information.
                    </DialogContentText>
                    <div className={classes.inputs}>
                            <TextField
                                error={checkName}
                                required
                                autoFocus
                                inputProps={{ maxLength: 30 }}
                                margin="dense"
                                id="name"
                                label="Name"
                                type="string"
                                variant="outlined"
                                onChange={handleInputChange('name')} 
                                value={values.name}
                                fullWidth
                                helperText={checkName ? 'Invalid name, must contain at least 6 characters' : ''}
                            />
                            <TextField
                                error={checkEmail}
                                required
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                onChange={handleInputChange('email')} 
                                value={values.email}
                                type="email"
                                variant="outlined"
                                fullWidth
                                helperText={checkEmail ? 'Invalid Email format' : ''}
                            />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
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

export default DialogUpdateAccount