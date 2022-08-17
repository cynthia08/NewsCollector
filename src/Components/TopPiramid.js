import React from 'react'
import { Hexagon } from 'tiled-hexagons'
import { withRouter } from "react-router-dom";

/*
********************************************************************************************
  TopPiramid component that creates top section of pyramid icons in Top News Sources.
********************************************************************************************
*/

class TopPiramid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            size: this.props.icons
        }
      }  

      getId(){
       
        this.props.onButtonChange(this.state.size.id);
        this.props.history.push(`/topnews/${this.state.size.id}`); 
      }
    
      render() {
        const darken = (hexString, amount) => {
          return hexString
            .match(/.{1,2}/g)
            .map(hex => (
              Math.round((1 - amount/100) * parseInt(hex, 16))))
            .map(hex => hex.toString(16))
            .join('')
        }
        const fills =['3E9CC2', '3C85DE', '4EC6F5'];
        const shadows = '#'+darken(fills[2],25);

        const textStyle = {
            fontSize: '15px',
            fill: '#000000'
        }

        let x = this.state.size;
        let textI = x.news_name  +'\n'+ x.percentage +'%';
        return (
          <Hexagon
            sideLength={70}
            text={textI}
            textStyle={textStyle}
            onClick={this.getId.bind(this)}
            fill = "#85DDFF"
            shadow= {"#"+ darken('85DDFF', 25)}
          />
        )
    }
}

export default withRouter(TopPiramid);
