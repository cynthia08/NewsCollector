import React,{useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import authService from "./services/authServices";
import Link from '@material-ui/core/Link';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

/*
********************************************************************************************
  DialogFileUpload creates the dialog box to upload the Reactions File.
********************************************************************************************
*/

function DialogFileUpload(props) {
    const [nameT, setNameT] = useState(authService.getJSONFilename(0)===null ? "No file uploaded" : authService.getJSONFilename(0) );
    const hiddenFileInput = React.useRef(null);
    const [files, setFiles] = useState("");
    const [errorJSON, setErrorJSON] = useState(false);
    const [errorEmpty, setErrorEmptyN] = useState(false);
    const [open, setOpen] = useState(props.c_open);
    const [errorKeysJson, setErrorKeysJson] = useState(true);
    const [errorKeysJsonMessage, setErrorKeysJsonMessage] = useState("");
    
    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            setErrorKeysJson("Bad format, error in bracket/quotation enclosings or commas. Please review Sample file.");
            return false;
        }
        return true;
    }

    function checkFormat(str) {
        const obj = JSON.parse(str);
        if(obj.hasOwnProperty('reactions')){
            if(obj.reactions.hasOwnProperty('likes') && obj.reactions.hasOwnProperty('retweets')){
                if(obj.reactions.likes.length === 0 || obj.reactions.retweets.length === 0){
                    setErrorKeysJsonMessage("Bad format, likes and retweets list should not be empty")
                    return false;
                }else{
                    let flag1 = true;
                    let flag2 = true;
                    obj.reactions.likes.forEach(element => {
                        if(!element.hasOwnProperty("source_username") || !element.hasOwnProperty("amount")){
                            setErrorKeysJsonMessage("Bad JSON format in likes list, check keys match with \'source_username\' and \'amount\'.")
                            flag1 = false;
                        }          
                    });
                  
                    obj.reactions.retweets.forEach(element => {
                        if(!element.hasOwnProperty("source_username") || !element.hasOwnProperty("amount")){
                            setErrorKeysJsonMessage("Bad JSON format in retweets list, check keys match with \'source_username\' and \'amount\'.")
                            flag2 = false;
                        }          
                    });
                   
                    if(flag1 && flag2){
                        return true;
                    }else{
                        return false;
                    }
                }
            }else{
                setErrorKeysJsonMessage("Bad JSON format, check keys match with \'likes\' and \'retweets\'.")
                return false;
            }
        }else{
            setErrorKeysJsonMessage("Bad JSON format file must contain reactions field.")

            return false;
        }

    }
    
    const handleCancel = (e) => {
        if(authService.isFileLoadedJSON(0)){
            props.setShowSettings(false);
            if((authService.getJSONFilename(0))){
                
                setNameT(authService.getJSONFilename(0));
            }

        }else{
            props.setShowWarningFile(true);
        }
        setErrorKeysJson(true) 
        setErrorJSON(false);
        setErrorEmptyN(false);
        props.setShowSettings(false);
    
    }

    
    const handleChange = (e) => {
      
        const fileReader = new FileReader();
        setErrorKeysJson(true);

        if(e.target.files[0] !== undefined) {
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.fileName = e.target.files[0].name;
            
            fileReader.onload = e => {
                if(isJsonString(e.target.result) && checkFormat(e.target.result)){
                    setErrorKeysJson(true) 
                    setFiles(e.target.result);
                    setNameT(e.target.fileName);
                    setErrorJSON(false);
                    setErrorEmptyN(false);
    
                }else{
                    setErrorKeysJson(false)
                    setErrorJSON(true);
                }
            };
        }else{
            setErrorEmptyN(true);
        }
    
    }  
    
    const handleSubmission = (e) => {
     

        if(files===null || files===""){
            setErrorEmptyN(true);
            props.setShowSettings(true);
        }else{
            authService.saveJSON(0, files, nameT);
            props.setShowSettings(false);
            window.location.reload(false);

        }
       
        

	};

    const handleClickUpload = event => {
        hiddenFileInput.current.click();
      };

  return (
    <div>
         <Dialog
            open={props.c_open}
            onClose={props.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
        >
            <DialogTitle id="alert-dialog-title">{"Manage Your Profile Reactions"}</DialogTitle>
            <DialogContent>
            
                <div className="container-user">
                    
                    <div className="item-user">
                     
                        <DialogContentText id="alert-dialog-description">
                            {"You can add your Twitter reactions (amount of Likes & Retweets you've given to different tweets) to analyze your complete stats in your profile."}
                            <br/><br/>
                            {"Upload your reactions file following this "}
                            <Link
                                component="button"
                                variant="body1"
                                onClick={() => {
                                    window.open("../../NewsCollector/data/reactionsSample.json", "_blank");
                                }}
                                >
                                format file
                            </Link>
                            {". Add the username of the tweet you liked or retweeted (without @) in the source_username field. In the amount field add the number of times you have liked or retweeted for the corresponding source." }
                            <br />
                            {"Example: If I liked 3 posts of BBCWorld then: "} <br />
                            {" \{\"source_username\": \"BBCWorld\""} <br />
                            {"\"amount\": 2 \}" } <br /><br />
                            {"For more help, please refer to the"} <Link href="https://youtu.be/0wYa-Xvvpxc"  target="_blank">video tutorial.</Link> <br />

                            <input type="file" onChange={handleChange} ref={hiddenFileInput} hidden/><br />
                            <Button
                                onClick={handleClickUpload}
                                variant="contained"
                                color="primary"
                                startIcon={<CloudUploadIcon />}
                            >
                                Select File
                            </Button>     {nameT}
                            <br /> <br />
                            {errorJSON ? <p style={{color:'red'}} >Error in file format. Check bracket/quotation enclosings and commas. Review Sample file for reference.</p>: ""}
                            {errorEmpty ? <p style={{color:'red'}} >No reaction file selected</p>: ""}
                            {!errorKeysJson  ? <p style={{color:'red'}} > {errorKeysJsonMessage} </p>: ""}
                            
                        </DialogContentText>
                        
                       
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmission} color="primary" autoFocus disabled={errorJSON || errorEmpty ? true: false}>
                Finish
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default DialogFileUpload