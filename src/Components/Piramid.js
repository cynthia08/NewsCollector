import React from 'react'
import './Piramid.css'
import Button from '@material-ui/core/Button'
import NewsTable from './NewsTable'
import Piramid2 from './Piramid2'
import TopPiramid from './TopPiramid'
import { withRouter } from "react-router-dom";
import { useContext, createContext } from 'react';
import UserContext from "./user-context";
import TableEnhaced from './TableEnhaced';
import LoadingComponent from './LoadingComponent'
import Piramid3 from './Piramid3'



function getData(newsData, total){
    /*
    const icons_obj1 ={
        id : 1,
        news_name: newsData.grouped_stats["1"].source_name,
        percentage: ((newsData.grouped_stats["1"].num_links * 100) / total).toFixed()
    }

    const icons_obj2 ={
        id : 2,
        news_name: newsData.grouped_stats["2"].source_name,
        percentage: ((newsData.grouped_stats["2"].num_links * 100) / total).toFixed(),
        images: '/images/numero-2.png'
    }

    const icons_obj3 ={
        id : 3,
        news_name: newsData.grouped_stats["3"].source_name,
        percentage: ((newsData.grouped_stats["3"].num_links * 100) / total).toFixed(),
        images: '/images/numero-3.png'
    }

    const icons_obj4 ={
        id : 4,
        news_name: newsData.grouped_stats["4"].source_name,
        percentage: ((newsData.grouped_stats["4"].num_links * 100) / total).toFixed(),
        images: '/images/numero-4.png'
    }

    const icons_obj5 ={
        id : 5,
        news_name: newsData.grouped_stats["5"].source_name,
        percentage: ((newsData.grouped_stats["5"].num_links * 100) / total).toFixed(),
        images: '/images/numero-5.png'
    }
    
    const icons_obj6 ={
        id : 6,
        news_name: newsData.grouped_stats["6"].source_name,
        percentage: ((newsData.grouped_stats["6"].num_links * 100) / total).toFixed(),
        images: '/images/numero-6.png'
    }
        const info_icons = [icons_obj1, icons_obj2, icons_obj3, icons_obj4, icons_obj5, icons_obj6];

    */
    let reorder = [];
    for (let i in newsData.grouped_stats){
        if(i<=6){
            const newObj = {
                id: i,
                news_name: newsData.grouped_stats[i].source_name, 
                percentage: ((newsData.grouped_stats[i].num_links * 100) / total).toFixed(),
                images: '/images/numero-'+i+'.png'
            };
            reorder.push(newObj);
        }else{
            break;
        }
    }

    console.log('reorder',reorder);

    return reorder;
}

class Piramid extends React.Component{
    constructor(props){
        super(props);
        this.handleClicks = this.handleClicks.bind(this);
        this.handleClickSrc = this.handleClickSrc.bind(this);

        const aux = parseInt(props.match.params.id);
        this.state = {
            id : aux,
        }     
    }

    handleClicks(i){
        this.setState({
            id: i
        })
           
    }
    //const icons1 = ['unaaa', 'unnnaa2'];
    //const icons2 = ['test4', 'test5', 'test6'];

    /*const icons_obj1 ={
        id : 1,
        news_name: 'BBC News',
        color_fill: '#4267b2',
        color_shadow: '#1a2947',
        images: 'images/test1.png'
    }

    const icons_obj2 ={
        id : 2,
        news_name: 'CNN',
        color_fill: '#282828',
        color_shadow: '#1a1a1a',
        images: ''
    }
    */
    //const icons1 = [icons_obj1, icons_obj2];
    //const icons2 = [icons_obj1, icons_obj2, icons_obj1];
   
    handleClickSrc(){
        this.props.history.push("/all-sources")

    }

    render(){
        let icons =[];
        let tableDataSelect =[];
        const isLoading = this.props.loading;
        const isLoading2 = this.props.loading2;
        

        if (isLoading === true || isLoading2 === true){
            return <LoadingComponent/>

        }else{
            icons = getData(this.props.newsData, this.props.totalLink); 
            tableDataSelect = this.props.newsData.grouped_stats[this.state.id];
        }
        const icons1 = icons[0];
        const icons2 = icons.slice(1,3);
        const icons3 = icons.slice(3);
        console.log("length", Object.keys(this.props.newsData.grouped_stats).length);

        return ( 
            <div>
            <div  className='container'>       
                <div className='container-piramid'>
                    <div className='top-piramid'>
                        <TopPiramid icons={icons1}
                        onButtonChange={this.handleClicks}/>
                    </div>
                    <div className='piramid'>
                        <Piramid2 icons ={icons2} 
                        onButtonChange={this.handleClicks}/>
                    </div>
                    <div className='piramid2'>
                        { Object.keys(this.props.newsData.grouped_stats).length>3 ? 
                            <Piramid3 icons ={icons3} 
                            onButtonChange={this.handleClicks}/>
                        
                        : null
                        }
                    </div>
                    
                    <div className='link'>
                        { Object.keys(this.props.newsData.grouped_stats).length>6 ? 

                        <Button href="" size="small" color="primary" style={{textTransform: 'none'}}  onClick={this.handleClickSrc}>
                            See all sources
                        </Button> 
                        : null
                        }
                    </div>
                    
                </div>
                <div className='table' >
                    { /*
                    <NewsTable id_news={this.state.id}></NewsTable>
                    */ }
                    <TableEnhaced id_news={this.state.id} tableData={tableDataSelect} totalLinks={this.props.totalLink}/>
                </div>
                
            </div>
               
            </div>
                
           
            
        )

    }
   
}

export default withRouter(Piramid);
