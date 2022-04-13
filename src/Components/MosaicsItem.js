import React from 'react'
import { TiledHexagons } from 'tiled-hexagons'


class MosaicsItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
          flag: this.props.row
        }

    }

    render(){
        const icons = ['nodejs', 'react'];
        const icons2 = ['nodejs', 'react', 'redux'];

        const x = this.state.flag;
        if (x==1){
            return (
                <TiledHexagons
                    maxHorizontal={2}
                    tileSideLengths={60}
                    tileElevations={16}
                    tileGap={7}
                    tileBorderRadii={9}
                    tiles={icons.map(icon => {
                        return { text: icon }
                    })}
                    />
            )
        } else{
            return(
                <TiledHexagons
                    maxHorizontal={3}
                    tileSideLengths={60}
                    tileElevations={16}
                    tileGap={7}
                    tileBorderRadii={9}
                    tiles={icons2.map(icon => {
                        return { text: icon }
                    })}
                    />

            )
            
        }
    }
    
}

export default MosaicsItem;
