import React from 'react'
import { TiledHexagons } from 'tiled-hexagons'
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import './Mosaics.css'
 



function arrangeData(glArray, dataNews, images){
  
    const darken = (hexString, amount) => {
        return hexString
          .match(/.{1,2}/g)
          .map(hex => (
            Math.round((1 - amount/100) * parseInt(hex, 16))))
          .map(hex => hex.toString(16))
          .join('')
    }

    // Put colors and shadows
    //const fills =['3E9CC2', '265F75', '496975'];
    
    // Fill arrays
    const idArray = new Array(glArray.length).fill(-1);
    const textArray = new Array(glArray.length).fill('');
    const imaArray = new Array(glArray.length).fill('');
    const fillArray = new Array(glArray.length).fill('#FFFFFF');
    const shadowArray = new Array(glArray.length).fill('#B2B2B2');

    //indexes
    const middle = Math.ceil(glArray.length/2);
    let top1 = middle/2-1;
    let top2 = middle-1;
    let top3 = Math.ceil(middle+top1+1);

    if(glArray.length===23){
        top1=middle/2-2;
        top3 = Math.ceil(middle+top1+3);
    }

    imaArray.splice(middle-1,1,'images/user.svg');
    idArray.splice(middle-1,1,0);
    textArray.splice(top1-1,1,dataNews[0]);
    textArray.splice(top2-1,1,dataNews[1]);
    textArray.splice(top3-1,1,dataNews[2]);

    idArray.splice(top1-1,1,1);
    idArray.splice(top2-1,1,2);
    idArray.splice(top3-1,1,3);

    fillArray.splice(top1-1,1,'#3E9CC2');
    fillArray.splice(top2-1,1,'#3C85DE');
    fillArray.splice(top3-1,1,'#4EC6F5');

    const fills =['3E9CC2', '3C85DE', '4EC6F5'];
    //const fills =['3E9CC2', '3E9CC2', '3E9CC2'];

    const shadows = fills.map(fill=>{
        let name = darken(fill, 25)
        return '#'+name
    });

    shadowArray.splice(top1-1,1,shadows[0]);
    shadowArray.splice(top2-1,1,shadows[1]);
    shadowArray.splice(top3-1,1,shadows[2]);


    const aux=[];

    for (let i=0; i<textArray.length;i++){
        if(textArray[i]==='' && i!==middle-1){
            aux.push(i);          
        }
    }

    for (let i=0; i<aux.length;i++){
        imaArray.splice(aux[i],1,images[i]);
    }

    // Create obj array

    const objArray = [];

    for(let i=0; i<glArray.length; i++){
        const obj ={
            id: idArray[i],
            news_name: textArray[i],
            color_fill: fillArray[i],
            color_shadow: shadowArray[i],
            images: imaArray[i]
        }
        const iconObj = Object.create(obj);

        objArray.push(iconObj);
    }
    

    return objArray;

}


// from services API, now temporarly is static
function getData(n){

    //get global array from service API

    //number of links from user
    const glLength = n;
    var glArray = [];
    var newImages;
    const images = [
        'images/ima0.png',
        'images/ima1.png',
        'images/ima2.png',
        'images/ima3.png',
        'images/ima4.png',
        'images/ima5.png',
        'images/ima6.png',
        'images/ima1.png',
        'images/ima2.png',
        'images/ima3.png',
        'images/ima4.png',
        'images/ima5.png',
        'images/ima6.png',
        'images/ima1.png',
        'images/ima2.png',
        'images/ima3.png',
        'images/ima4.png',
        'images/ima5.png',
        'images/ima6.png',
        'images/ima1.png',
        'images/ima2.png',
        'images/ima3.png',
        'images/ima4.png',
        'images/ima5.png',
        'images/ima6.png'
    ];  

    // boundaries of size mosaic
    if(glLength <20){
        glArray = new Array(11);
        newImages= images.slice(0,glArray.length-4);
     
     
    } else if(glLength >=20 && glLength <40){
        glArray = new Array(17);
        newImages= images.slice(0,glArray.length-4);

       
    } else{
        glArray = new Array(23);
        newImages= images.slice(0,glArray.length-4);

    }    

    const news = ['BBC News', 'CNN', 'Euro News'];
    const dataMosaic = arrangeData(glArray, news, newImages);

    return dataMosaic;
}


class ProfileMosaics extends React.Component  {
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            sizeMenu: this.props.length,
            showUser: false
        }
      }
    
    
    navigate = (id) => {
        console.log('clicked mosaics' + id);
        //history.push("/topnews");
        if(id===0){
            this.setState({showUser:true});
        }else if(id!==-1){
            this.props.history.push(`/topnews/${id}`);
        }else{
            window.open("https://www.google.com", "_blank"); //to open new page

        }
    };

    handleClose(){
        this.setState({showUser:false});
    }

    
    render() {
        const data = getData(this.state.sizeMenu); //static
        let length = this.props.length;

        if (length<20){
            return (
                <div>
                    <TiledHexagons
                    maxHorizontal={4}
                    tileTextStyles={{
                        fill: '#000000'
                    }} 
                    tileSideLengths={52}
                    tileElevations={16}
                    tileGap={7}
                    tileBorderRadii={9}
                    tiles={
                        data.map(i => {
                            return { 
                            text: `${i.news_name}`,
                            fill: `${i.color_fill}`,
                            shadow: `${i.color_shadow}`,
                            img: `${i.images}`,
                            onClick: () => this.navigate(i.id)
                        }
                    })
                    }
                    />
                    <Dialog
                        open={this.state.showUser}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"User Information"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div className="container-user">
                                <div >
                                    <Avatar src="/images/user.svg" />
                                </div>
                                <div className="item-user">
                                    User ID: {this.props.user} <br/>
                                    Created on: {this.props.date}
                                </div>
                            </div>
                            
                            
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                        </DialogActions>
                    </Dialog>

                </div>
                

            


            )

        }else if(length >=20 && length <40){
            return (
                <div>
                    <TiledHexagons
                    maxHorizontal={6}
                    tileTextStyles={{
                        fill: '#000000'
                    }} 
                    tileSideLengths={52}
                    tileElevations={16}
                    tileGap={7}
                    tileBorderRadii={9}
                    tiles={
                        data.map(i => {
                            return { 
                            text: `${i.news_name}`,
                            fill: `${i.color_fill}`,
                            shadow: `${i.color_shadow}`,
                            img: `${i.images}`,
                            onClick: () => this.navigate(i.id)
                        }
                    })
                    }
                />
                <Dialog
                        open={this.state.showUser}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"User Information"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div className="container-user">
                                <div>
                                    <Avatar src="/images/user.svg" />
                                </div>
                                <div className="item-user"> 
                                    User ID: {this.props.user} <br/>
                                    Created on: {this.props.date}
                                </div>
                            </div>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )

        }else{
            return (
                <div>
                    <TiledHexagons
                    maxHorizontal={8}
                    tileTextStyles={{
                        fill: '#000000'
                    }} 
                    tileSideLengths={52}
                    tileElevations={16}
                    tileGap={7}
                    tileBorderRadii={9}
                    tiles={
                        data.map(i => {
                            return { 
                            text: `${i.news_name}`,
                            fill: `${i.color_fill}`,
                            shadow: `${i.color_shadow}`,
                            img: `${i.images}`,
                            onClick: () => this.navigate(i.id)
                        }
                    })
                    }
                />
                <Dialog
                        open={this.state.showUser}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"User Information"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div className="container-user">
                                <div>
                                    <Avatar src="/images/user.svg" />
                                </div>
                                <div className="item-user">
                                    User ID: {this.props.user} <br/>
                                    Created on: {this.props.date}
                                </div>
                            </div>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Close
                        </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )

        }
        
    }
  
}

export default withRouter(ProfileMosaics);
