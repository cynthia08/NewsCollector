import React from 'react';
import { TiledHexagons } from 'tiled-hexagons'
import { withRouter } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import './css/NewProfileMosaics.css'
import LoadingComponent from './LoadingComponent';
import * as helpers from './services/helpers';
import ErrorComponent from './ErrorComponent';
import EmptyData from './EmptyData';
import authService from './services/authServices';
import NotEnoughInfo from './NotEnoughInfo';


/*
********************************************************************************************
  NewProfileMosaics defines and arranges the mosaics in Profile Results.
********************************************************************************************
*/

function arrangeData(userTweets, userReactions, optionSelect){
  
    const darken = (hexString, amount) => {
        return hexString
          .match(/.{1,2}/g)
          .map(hex => (
            Math.round((1 - amount/100) * parseInt(hex, 16))))
          .map(hex => hex.toString(16))
          .join('')
    }

    let selectData = [];
    let newSelectData = [];
    let selectColor ;
    let colors = ['3C85DE', '4EC6F5', '3CDBDE' ];
    let reactionsId;

    

    if(userReactions.length !== 0){
        if(optionSelect==='Most Liked Tweets'){
        
            newSelectData =  userReactions.reactions.likes.sort(helpers.orderById('amount', 'desc'))
            if(newSelectData.length >= 3){
                const slicedArray = newSelectData.slice(0, 3);
                selectData = slicedArray;
                selectColor = 0;
                reactionsId = -10;

            }else{
                const aux1 = {
                    source_username : "Sample1",  
                    amount: 0
                }
                const aux2 = {
                    source_username : "Sample2",  
                    amount: 0
                }
                if(newSelectData.length == 1){
                    newSelectData.push(aux1);
                    newSelectData.push(aux2);
                }else{
                    newSelectData.push(aux1);
                    
                }
                selectData = newSelectData;
                selectColor = 0;
                reactionsId = -10;
            }
           
        } else if(optionSelect==='Most Retweet Tweets'){
    
            newSelectData =  userReactions.reactions.retweets.sort(helpers.orderById('amount', 'desc'))
            if(newSelectData.length >= 3){
                const slicedArray = newSelectData.slice(0, 3);
                selectData = slicedArray;
                selectColor = 1;
                reactionsId = -20;
            }else{
                const aux1 = {
                    source_username : "Sample1",  
                    amount: 0
                }
                const aux2 = {
                    source_username : "Sample2",  
                    amount: 0
                }
                if(newSelectData.length == 1){
                    newSelectData.push(aux1);
                    newSelectData.push(aux2);
                }else{
                    newSelectData.push(aux1);
                    
                }
                selectData = newSelectData;
                selectColor = 1;
                reactionsId = -20;
            }
    
        }

    }
    

    // Arrange data for icons
    let {iconsText1,iconsText2, iconsText3 } =[];
    let {iconsImage1, iconsImage2, iconsImage3} = [];

    const dataNews =  [ 
        userTweets.length !== 0 ? helpers.groupAuthors(userTweets).sort(helpers.orderById('num_links', 'desc'))[0].username : "", 
        userTweets.length !== 0 ? helpers.groupAuthors(userTweets).sort(helpers.orderById('num_links', 'desc'))[1].username : "",
        userTweets.length !== 0 ? helpers.groupAuthors(userTweets).sort(helpers.orderById('num_links', 'desc'))[2].username : ""
        ];
    

    if(userTweets.length === 0 && userReactions.length === null){
        //text default
        iconsText1 = ['', '1.', '1.', ''];
        iconsText2 = ['',  '2.','', '2.', ''];
        iconsText3 = ['',  '2.', '3.', ''];

        //image default
        const imageDefault = '/NewsCollector/images/logos/news_default.png'
        iconsImage1 = [imageDefault, '', '', imageDefault];
        iconsImage2 = [imageDefault, '','/NewsCollector/images/user2.png', '', imageDefault];
        iconsImage3 = [imageDefault, '', '', imageDefault];

    }else{
        //text
        
        iconsText1 = ['', 
            dataNews[0].length > 8 ? dataNews[0].substring(0, 8) + "..." : dataNews[0], 
            selectData[0].source_username.length > 8 ? selectData[0].source_username.substring(0, 8) + "..." : selectData[0].source_username, 
            ''];
        iconsText2 = ['', 
            dataNews[1].length > 8 ? dataNews[1].substring(0, 8) + "..." : dataNews[1],'', 
            selectData[1].source_username.length > 8 ? selectData[1].source_username.substring(0, 8) + "..." : selectData[1].source_username, 
            ''];
        iconsText3 = ['', 
            dataNews[2].length > 8 ? dataNews[2].substring(0, 8) + "..." : dataNews[2], 
            selectData[2].source_username.length > 8 ? selectData[2].source_username.substring(0, 8) + "..." : selectData[2].source_username, 
            ''];

        //images 
        iconsImage1 = [helpers.imageLookup(dataNews[0].toLowerCase()) ? '/NewsCollector/images/logos/'+dataNews[0].toLowerCase()+'.png' : '/NewsCollector/images/logos/news_default.png', '', '', helpers.imageLookup(selectData[0].source_username.toLowerCase()) ? '/NewsCollector/images/logos/'+selectData[0].source_username.toLowerCase()+'.png' : '/NewsCollector/images/logos/news_default.png'];
        iconsImage2 = [helpers.imageLookup(dataNews[1].toLowerCase()) ? '/NewsCollector/images/logos/'+dataNews[1].toLowerCase()+'.png' : '/NewsCollector/images/logos/news_default.png', '','/NewsCollector/images/account.png', '', helpers.imageLookup(selectData[1].source_username.toLowerCase()) ? '/NewsCollector/images/logos/'+selectData[1].source_username.toLowerCase()+'.png' : '/NewsCollector/images/logos/news_default.png'];
        iconsImage3 = [helpers.imageLookup(dataNews[2].toLowerCase()) ? '/NewsCollector/images/logos/'+dataNews[2].toLowerCase()+'.png' : '/NewsCollector/images/logos/news_default.png', '', '', helpers.imageLookup(selectData[2].source_username.toLowerCase()) ? '/NewsCollector/images/logos/'+selectData[2].source_username.toLowerCase()+'.png' : '/NewsCollector/images/logos/news_default.png'];
    }
    
    //color fills
    const iconsFill1 = ['#FFFFFF', '#3E9CC2', '#'+colors[selectColor], '#FFFFFF'];
    const iconsFill2 = ['#FFFFFF', '#3E9CC2','#FFFFFF', '#'+colors[selectColor], '#FFFFFF'];
    const iconsFill3 = ['#FFFFFF', '#3E9CC2', '#'+colors[selectColor], '#FFFFFF'];

    //color shadows
    const iconsShadow1 = ['#B2B2B2', '#'+darken('3E9CC2', 25), '#'+darken(colors[selectColor], 25), '#B2B2B2'];
    const iconsShadow2 = ['#B2B2B2', '#'+darken('3E9CC2', 25),'#B2B2B2', '#'+darken(colors[selectColor], 25), '#B2B2B2'];
    const iconsShadow3 = ['#B2B2B2', '#'+darken('3E9CC2', 25), '#'+darken(colors[selectColor], 25), '#B2B2B2'];

    //ids
    const iconsId1 = [dataNews[0], 1, reactionsId, selectData[0].source_username];
    const iconsId2 = [dataNews[1], 2,0, reactionsId, selectData[1].source_username];
    const iconsId3 = [dataNews[2], 3, reactionsId, selectData[2].source_username];

    
    // Create obj for buttons
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

class NewProfileMosaics extends React.Component{
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseUser = this.handleCloseUser.bind(this);
        this.state = {
            sizeMenu: 10,
            showUser: false,
            anchorEl: null,
            optionSelect: 'Most Liked Tweets',
        }
    }

    navigate = (id) => {
        if(id===0){
            this.props.history.push(`/profile/details`);
        }else if(id===-10 || id===-20){
            this.props.history.push({
                pathname: '/reactions',
                state: { selector: id }
            });
        }else if(id===1 ||id===2 || id===3  ){
            this.props.history.push(`/topnews/${id-1}`);
        }else{
            window.open("https://www.twitter.com/" +id, "_blank") //to open new page

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

        let data =[];
        
        if (this.props.loadingU || this.props.loadingAllN ){
            this.props.setShowSettings(false);
            return <LoadingComponent/>

        }else{
            //this.props.setShowSettings(true);
            const aux = helpers.groupAuthors(this.props.newsSrc).sort(helpers.orderById('num_links', 'desc'));
            if(this.props.errorTweets.includes("Error:") || this.props.errorReact.includes("Error:")){
                this.props.setShowSettings(false);
                return <ErrorComponent/>
            } else if (this.props.newsSrc.length === 0){
                this.props.setShowSettings(false);
                return <EmptyData/>
            } else if (aux.length < 3){
                this.props.setShowSettings(false);
                return <NotEnoughInfo/>
            }else{
                let newReactions = this.props.reactions;
                data = arrangeData(this.props.newsSrc, newReactions, this.state.optionSelect); //static
            }
        }
        

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
