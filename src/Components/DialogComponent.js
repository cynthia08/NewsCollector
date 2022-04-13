import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';



function DialogComponent(props) {
  
  return (
    <div>
        <Dialog
            open={props.c_open}
            onClose={props.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"User Information"}</DialogTitle>
            <DialogContent>
            
                <div className="container-user">
                    <div >
                        <Avatar src="/images/user.svg" />
                    </div>
                    <div className="item-user">
                        <DialogContentText id="alert-dialog-description">
                            User ID: {props.username} <br/>
                            Created on: {new Date(props.date_c).toLocaleDateString()}
                        </DialogContentText>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={props.close} color="primary" autoFocus>
                Close
            </Button>
            </DialogActions>
        </Dialog>

    </div>
  )
}

export default DialogComponent