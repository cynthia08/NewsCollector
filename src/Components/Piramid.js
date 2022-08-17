import React from 'react'
import './css/Piramid.css'
import Button from '@material-ui/core/Button'
import Piramid2 from './Piramid2'
import TopPiramid from './TopPiramid'
import { withRouter } from "react-router-dom";
import UserContext from "./user-context";
import TableEnhaced from './TableEnhaced';
import LoadingComponent from './LoadingComponent'
import Piramid3 from './Piramid3'
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import EmptyData from './EmptyData'
import ErrorComponent from './ErrorComponent'
import * as helpers from './services/helpers';
import NotEnoughInfo from './NotEnoughInfo';


/*
********************************************************************************************
  Piramid defines the component elements that construct the Top News Sources page.
********************************************************************************************
*/

function getData(newsData, total){


    let reorder = [];
    for (let i in newsData){
        if(i<6){
            const newObj = {
                id: parseInt(i),
                news_name: newsData[i].username.length >= 10 ? newsData[i].username.substring(0, 8) + "..." : newsData[i].username, 
                percentage: ((newsData[i].num_links * 100) / total).toFixed(),
            };
            reorder.push(newObj);
        }else{
            break;
        }
    }

    return reorder;
}

class Piramid extends React.Component{
    constructor(props){
        super(props);
        this.handleClicks = this.handleClicks.bind(this);
        this.handleClickSrc = this.handleClickSrc.bind(this);
        this.handleClickGraph = this.handleClickGraph.bind(this);

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

   
    handleClickSrc(){
        this.props.history.push("/all-sources");

    }

    handleClickGraph(){
        this.props.history.push("/news_stats");
    }

    render(){
        let icons =[];
        let tableDataSelect =[];
        const isLoading = this.props.loading;
        const isLoading2 = this.props.loading2;
        

        if (isLoading || isLoading2 ){
            return <LoadingComponent/>

        }else{
            const aux = helpers.groupAuthors(this.props.newsData).sort(helpers.orderById('num_links', 'desc'));

            if(this.props.errorTweets.includes("Error:")){
                return <ErrorComponent/>
            } else if (this.props.newsData.length === 0){
                return <EmptyData/>
            } else if (aux.length < 3){
                return <NotEnoughInfo/>
            }else{
                const userTURLs = helpers.groupAuthorsURLs(this.props.newsData).sort(helpers.orderById('num_links', 'desc'));

                icons = getData(userTURLs, this.props.newsData.length); 
                tableDataSelect = userTURLs[this.state.id];
               
            }
           
        }
        const icons1 = icons[0];
        const icons2 = icons.slice(1,3);
        const icons3 = icons.slice(3);

        return ( 
            <div>
            <div  className='container-p'>       
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
                        { helpers.groupAuthors(this.props.newsData).sort(helpers.orderById('num_links', 'desc')).length>3 ? 
                            <Piramid3 icons ={icons3} 
                            onButtonChange={this.handleClicks}/>
                        
                        : null
                        }
                    </div>
                    <div className='more_options'>
                        <div className='left-btn'>
                        <Button color="primary" size="small" style={{textTransform: 'none'}} startIcon={<DonutSmallIcon />} onClick={this.handleClickGraph}>
                            Graph View 
                        </Button>
                        </div>
                        <div className='right-btn'>
                        { Object.keys(this.props.newsData).length>6 ? 
                        <Button size="small" color="primary" style={{textTransform: 'none'}}  endIcon= {<ControlPointIcon/>} onClick={this.handleClickSrc}>
                            See All Sources
                        </Button> 
                        : null
                        }
                        </div>
                    </div>
                    
                </div>
                <div className='table-piramid' >

                    <TableEnhaced id_news={this.state.id} tableData={tableDataSelect} totalLinks={this.props.totalLink}/>
                    
                
                </div>
                
                
            </div>
               
            </div>
                
           
            
        )

    }
   
}

export default withRouter(Piramid);
