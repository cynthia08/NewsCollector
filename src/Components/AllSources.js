import React from 'react';
import './css/AllSources.css';
import { useContext} from 'react';
import UserContext from "./user-context";
import LoadingComponent from './LoadingComponent';
import FetchService from "./services/fetchServices";
import AllSourcesTable from './AllSourcesTable';
import * as helpers from './services/helpers';

/*
********************************************************************************************
  AllSources obtains the content for the All News Sources page.
********************************************************************************************
*/

function getData(grouped_links, all_links){

    let reGroupedStats = [];
    for (let i in grouped_links){
      const newObj = {};
      newObj.id = i;
      newObj.name = grouped_links[i].username;
      newObj.no_urls = grouped_links[i].num_links;
      newObj.isVerified = grouped_links[i].isVerified;
      newObj.percentage = (grouped_links[i].num_links*100/all_links.length).toFixed();
      newObj.num_followers_f = helpers.formatNumberFollowers(grouped_links[i].num_followers, 2);
      newObj.num_followers = helpers.addWithCommas(grouped_links[i].num_followers);
      newObj.avatar = helpers.imageURLClean(grouped_links[i].avatar);
      newObj.bio = grouped_links[i].bio;
      newObj.urls = grouped_links[i].urls;
      reGroupedStats.push(newObj);
    }
    
    
    const data = [reGroupedStats, all_links];

    return data;
}


function AllSources() {
    const { userID } = useContext(UserContext);

    const { userTweets, errorUserTweets, isLoadingUserTweets } = FetchService.useFetchTweetNews();

    const userTURLs = helpers.groupAuthorsURLs(userTweets).sort(helpers.orderById('num_links', 'desc'));

    if (isLoadingUserTweets  ){
      return  <LoadingComponent/>
    }else{

      return <AllSourcesTable info ={getData(userTURLs, userTweets)}/>
    }
}

export default AllSources
