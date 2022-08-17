import React from 'react'
import { TiledHexagons } from 'tiled-hexagons'
import { withRouter } from "react-router-dom";

/*
********************************************************************************************
  Piramid2 component that creates second section of pyramid icons in Top News Sources.
********************************************************************************************
*/

class Piramid2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          size: this.props.icons
        }
    }

    getId(i){
        this.props.onButtonChange(i);
        this.props.history.push(`/topnews/${i}`); 
      }

    render() {
        let x = this.state.size;
        const darken = (hexString, amount) => {
            return hexString
              .match(/.{1,2}/g)
              .map(hex => (
                Math.round((1 - amount/100) * parseInt(hex, 16))))
              .map(hex => hex.toString(16))
              .join('')
          }
        const fills =['3E9CC2', '3C85DE', '4EC6F5'];
        //const fills2 = ['#25D7EE', '#76E5F3', '#A7F1FB', '#BCEAF0', '#D7F2F5'];
        const fills2 = ['25D7EE', '76E5F3', 'A7F1FB', 'BCEAF0', 'D7F2F5'];
        const shadows = fills2.map(fill=>{
            let name = darken(fill, 25)
            return '#'+name
        });

        if(x.length===2){    
            return (
                <TiledHexagons
                maxHorizontal={x.length}
                tileSideLengths={60}
                tileTextStyles={{
                    fontSize: '14px',
                    fill: '#000000'
                  }}
                tileElevations={16}           
                tileGap={7}
                tileBorderRadii={9}
                tiles={x.map((i, index) => {
                    return { 
                            fill: "#85DDFF" ,
                            shadow: "#" + darken("85DDFF",25),
                            text: `${i.news_name  +'\n'+ i.percentage +'%'}`,
                            onClick: () => this.getId(i.id)
                    }
                })}
                />
            )

        } else{
            return (
                    <TiledHexagons
                    maxHorizontal={x.length}
                    tileSideLengths={53}
                    tileTextStyles={{
                        fontSize: '13px',
                        fill: '#000000'
                      }}
                    tileElevations={16}
                    tileGap={7}
                    tileBorderRadii={9}
                    tiles={x.map((i, index) => {
                        return { 
                                fill: "#85DDFF" ,
                                shadow: "#" + darken("85DDFF",25),
                                text: `${i.news_name  +'\n'+ i.percentage +'%'}`,
                                onClick: () => this.getId(i.id)
                        }
                    })}
                    />           
            )
        }

        
    }

}

export default withRouter(Piramid2);

