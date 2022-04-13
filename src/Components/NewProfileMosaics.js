import React from 'react';
import { TiledHexagons } from 'tiled-hexagons'
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './NewProfileMosaics.css'
import LoadingComponent from './LoadingComponent';
import DialogComponent from './DialogComponent';

function arrangeData(glArray, dataNews, imas_new, optionSelect){
  
    const darken = (hexString, amount) => {
        return hexString
          .match(/.{1,2}/g)
          .map(hex => (
            Math.round((1 - amount/100) * parseInt(hex, 16))))
          .map(hex => hex.toString(16))
          .join('')
    }

    let selectData = [];
    let selectImages =[];
    let selectColor ;
    let colors = ['3C85DE', '4EC6F5', '3CDBDE' ];
    let reactionsId;
    console.log(imas_new);

    if(optionSelect==='Most Liked Tweets'){
        selectData = ['CNN', 'euronews','BBC'];
        selectImages = [
            imas_new[3] !== undefined ? imas_new[3].media_content : 'images/user.svg',
            imas_new[4] !== undefined ? imas_new[4].media_content : 'images/user.svg',
            imas_new[5] !== undefined ? imas_new[5].media_content : 'images/user.svg'
        ];
        selectColor = 0;
        reactionsId = -10;

    } else if(optionSelect==='Most Retweet Tweets'){
        selectData = ['BBC', 'CNN','The Post'];
        selectImages = [
            imas_new[6] !== undefined ? imas_new[6].media_content : 'images/user.svg',
            imas_new[7] !== undefined ? imas_new[7].media_content : 'images/user.svg',
            imas_new[8] !== undefined ? imas_new[8].media_content : 'images/user.svg'
        ];
        selectColor = 1;
        reactionsId = -20;

    }

    //text
    const iconsText1 = ['', dataNews[0], selectData[0], ''];
    const iconsText2 = ['', dataNews[1],'', selectData[1], ''];
    const iconsText3 = ['', dataNews[2], selectData[2], ''];

    //images 
    const iconsImage1 = [imas_new[0] !== undefined ? imas_new[0].media_content : 'images/user.svg', '', '', selectImages[0]];
    const iconsImage2 = [imas_new[1] !== undefined ? imas_new[1].media_content : 'images/user.svg', '','images/user.svg', '', selectImages[1]];
    const iconsImage3 = [imas_new[2] !== undefined ? imas_new[2].media_content : 'images/user.svg', '', '', selectImages[2]];

    //color fills
    const iconsFill1 = ['#FFFFFF', '#3E9CC2', '#'+colors[selectColor], '#FFFFFF'];
    const iconsFill2 = ['#FFFFFF', '#3E9CC2','#FFFFFF', '#'+colors[selectColor], '#FFFFFF'];
    const iconsFill3 = ['#FFFFFF', '#3E9CC2', '#'+colors[selectColor], '#FFFFFF'];

    //color shadows
    const iconsShadow1 = ['#B2B2B2', '#'+darken('3E9CC2', 25), '#'+darken(colors[selectColor], 25), '#B2B2B2'];
    const iconsShadow2 = ['#B2B2B2', '#'+darken('3E9CC2', 25),'#B2B2B2', '#'+darken(colors[selectColor], 25), '#B2B2B2'];
    const iconsShadow3 = ['#B2B2B2', '#'+darken('3E9CC2', 25), '#'+darken(colors[selectColor], 25), '#B2B2B2'];

    //ids
    const iconsId1 = [-1, 1, reactionsId, -1];
    const iconsId2 = [-1, 2,0, reactionsId, -1];
    const iconsId3 = [-1, 3, reactionsId, -1];

    
    // Create obj array

    const objArray1 = [];

    for(let i=0; i<iconsId1.length; i++){
        const obj ={
            id: iconsId1[i],
            news_name: iconsText1[i],
            color_fill: iconsFill1[i],
            color_shadow: iconsShadow1[i],
            images: iconsImage1[i]
        }
        const iconObj = Object.create(obj);

        objArray1.push(iconObj);
    }
    
    const objArray2 = [];

    for(let i=0; i<iconsId2.length; i++){
        const obj ={
            id: iconsId2[i],
            news_name: iconsText2[i],
            color_fill: iconsFill2[i],
            color_shadow: iconsShadow2[i],
            images: iconsImage2[i]
        }
        const iconObj = Object.create(obj);

        objArray2.push(iconObj);
    }

    const objArray3 = [];

    for(let i=0; i<iconsId3.length; i++){
        const obj ={
            id: iconsId3[i],
            news_name: iconsText3[i],
            color_fill: iconsFill3[i],
            color_shadow: iconsShadow3[i],
            images: iconsImage3[i]
        }
        const iconObj = Object.create(obj);

        objArray3.push(iconObj);
    }

    const allIcons = [objArray1, objArray2, objArray3];

    return allIcons;

}


// from services API, now temporarly is static
function getData(n, optionSelect, newsSrcTop, isLoading){

    //get global array from service API

    //number of links from user
    const glLength = n;
    var glArray = [];
    var newImages;
    /*
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
    */
    //console.log(newsSrcTop.grouped_stats);
    //let news = ["1", "2", "3"];
    
    
    const news = [newsSrcTop.grouped_stats["1"].source_name, 
                 newsSrcTop.grouped_stats["2"].source_name, 
                 newsSrcTop.grouped_stats["3"].source_name];

    const imas_new =[];

    // ORDER HERE IMP not change
    const sorted_1 = (newsSrcTop.grouped_stats["1"].urls).sort((a,b) => (b.no_likes+b.no_retweets) - (a.no_likes+a.no_retweets));
    const sorted_2 = (newsSrcTop.grouped_stats["2"].urls).sort((a,b) => (b.no_likes+b.no_retweets) - (a.no_likes+a.no_retweets));
    const sorted_3 = (newsSrcTop.grouped_stats["3"].urls).sort((a,b) => (b.no_likes+b.no_retweets) - (a.no_likes+a.no_retweets));
    
    imas_new.push(sorted_1.find (i => i.media_content !==''));
    imas_new.push(sorted_2.find (i => i.media_content !=='' ));
    imas_new.push(sorted_3.find (i => i.media_content !=='' ));

    const sorted_4 = (newsSrcTop.grouped_stats["1"].urls).sort((a,b) => b.no_likes - a.no_likes);
    const sorted_5 = (newsSrcTop.grouped_stats["2"].urls).sort((a,b) => b.no_likes - a.no_likes);
    const sorted_6 = (newsSrcTop.grouped_stats["3"].urls).sort((a,b) => b.no_likes - a.no_likes);

    imas_new.push(sorted_4.find (i => i.media_content !==''));
    imas_new.push(sorted_5.find (i => i.media_content !=='' ));
    imas_new.push(sorted_6.find (i => i.media_content !=='' ));

   
    const sorted_7 = (newsSrcTop.grouped_stats["1"].urls).sort((a,b) => b.no_retweets - a.no_retweets);
    const sorted_8 = (newsSrcTop.grouped_stats["2"].urls).sort((a,b) => b.no_retweets - a.no_retweets);
    const sorted_9 = (newsSrcTop.grouped_stats["3"].urls).sort((a,b) => b.no_retweets - a.no_retweets);    
     
    imas_new.push(sorted_7.find (i => i.media_content !==''));
    imas_new.push(sorted_8.find (i => i.media_content !=='' ));
    imas_new.push(sorted_9.find (i => i.media_content !=='' ));
       
    const dataMosaic = arrangeData(glArray, news, imas_new, optionSelect);

    return dataMosaic;
}



class NewProfileMosaics extends React.Component{
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseUser = this.handleCloseUser.bind(this);
        this.state = {
            //sizeMenu: this.props.length,
            sizeMenu: 10,
            showUser: false,
            anchorEl: null,
            optionSelect: 'Most Liked Tweets'
        }
    }

    navigate = (id) => {
        console.log('clicked mosaics' + id);
        //history.push("/topnews");
        if(id===0){
            this.setState({showUser:true});
        }else if(id==-10 || id==-20){
            this.props.history.push({
                pathname: '/reactions',
                state: { selector: id }
            });
        }else if(id!==-1){
            this.props.history.push(`/topnews/${id}`);
        }else{
            window.open("https://www.twitter.com", "_blank") //to open new page

        }
    };


    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
      
    };

    handleClose(event){
        this.setState({anchorEl: null});
        const {myValue} = event.currentTarget.dataset;
        if (myValue!==undefined){
            this.setState({optionSelect: myValue});
        }
        
      
    }

    handleCloseUser(){
        this.setState({showUser:false});
    }

    render(){

        const options = [{
            id: 0,
            name: 'Most Liked Tweets',
        },{
            id: 1,
            name: 'Most Retweet Tweets',
        }
        ];
       
        const ITEM_HEIGHT = 48;

        const open = Boolean(this.state.anchorEl);
        const newsSrcTop = this.props.newsSrc;
        const isLoading = this.props.loading;
        let data =[];
        const flagTemp = true
        if (isLoading === true){
            return <LoadingComponent/>

        }else{
            data = getData(this.state.sizeMenu, this.state.optionSelect, newsSrcTop); //static
        }
        

        let length = this.props.length;
        let colorSelect;

        if(this.state.optionSelect==='Most Liked Tweets'){
            colorSelect = <i class="fas fa-circle" style={{color:'#3C85DE'}}></i>
           
    
        } else if(this.state.optionSelect==='Most Retweet Tweets'){
            colorSelect = <i class="fas fa-circle" style={{color:'#4EC6F5'}}></i>
            
    
        }else{
            colorSelect = <i class="fas fa-circle" style={{color:'#3CDBDE'}}></i>
            
        }

        return(
        <div className="container-column1">
            <div className="container-mosaics1">
                <div className="item-mosaics2">
                  
                    <TiledHexagons
                        maxHorizontal={4}
                        tileTextStyles={{
                            fill: '#000000'
                        }} 
                        tileSideLengths={52}
                        tileElevations={16}
                        tileGap={12}
                        tileBorderRadii={9}
                        tiles={
                            data[0].map(i => {
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

                </div>
                <div className="item-mosaics">
                    <TiledHexagons
                        maxHorizontal={5}
                        tileTextStyles={{
                            fill: '#000000'
                        }} 
                        tileSideLengths={52}
                        tileElevations={16}
                        tileGap={12}
                        tileBorderRadii={9}
                        tiles={
                            data[1].map(i => {
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

                </div>
                <div className="item-mosaics2">
                    <TiledHexagons
                            maxHorizontal={4}
                            tileTextStyles={{
                                fill: '#000000'
                            }} 
                            tileSideLengths={52}
                            tileElevations={16}
                            tileGap={12}
                            tileBorderRadii={9}
                            tiles={
                                data[2].map(i => {
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

                </div>
               
                <DialogComponent
                    c_open = {this.state.showUser}
                    username = {this.props.user.name} 
                    date_c = {this.props.user.date_created}
                    close = {this.handleCloseUser} >

                </DialogComponent>
            
                
                <div className="subcontainer">
                    <div> 
                        <i class="fas fa-circle" style={{color:'#3E9CC2'}}></i> &nbsp; 
                        Top News Sources 
                    </div>
                    <div>
                        {colorSelect} &nbsp; 
                        {this.state.optionSelect}
                    </div>
                        
                </div>

            </div>
            <div className="side-menu">
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    
                   <SettingsIcon/>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '22ch'
                       
                    },
                    }}
                >
                    {options.map((option) => (
                    <MenuItem key={option.id} data-my-value={option.name} selected={option.name === this.state.optionSelect} onClick={this.handleClose}>
                       {option.name}
                    </MenuItem>
                    ))}
                </Menu>

            </div>
            
            
            
        </div>
    )}
}

export default withRouter(NewProfileMosaics);
