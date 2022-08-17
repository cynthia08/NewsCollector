import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from 'react';
import UserContext from "../user-context";
import authService from "./authServices";

/*
*************************************************************************************************************************************************
    This service file provides the API calls to fetch the information used in the application:
        + useFetchTweetNews: fetches all the 'News' tweets collected by the plugin.
        + useFetchAllTweets: fetches all the tweets collected by the plugin.
        + useFetchUser: fetches the user's account data.
        + useFetchGlobalStats: fetches the Top 10 News Sources with the largest number of tweets collected globally (by all users registered).
        + useFetchReactionsP: locally fetches the reactions (likes and retweets) of the user, through JSON file.
        + useFetchReactionsG: locally fetches the reactions (likes and retweets) globally (all users), through JSON file.
**************************************************************************************************************************************************
*/

const API_URL = process.env.REACT_APP_API_URL;
const API_URL_T = process.env.REACT_APP_API_URL_TEMPORAL;


const useFetchTweetNews = () => {
    const [userTweets, setUserTweets] = useState([])
    const [errorUserTweets, setErrorUserTweets] = useState("")
    const [isLoadingUserTweets, setIsLoadingUserTweets] = useState(true)
    const { userID } = useContext(UserContext)

    useEffect(() => {
        setIsLoadingUserTweets(true);
            axios
            .get(API_URL + "/tweet/is/news", {
                headers: {
                    'Authorization': 'Bearer ' + authService.getToken(),
                    'ContentType': 'application/json'
                }
            })
            .then(response => {
                setUserTweets(response.data)
                setIsLoadingUserTweets(false)
               
            })
            .catch(error => {
                setErrorUserTweets("Error: "+error.response.data.message)
                console.log(error)
                setIsLoadingUserTweets(false)
            }) 
        
    }, [])

    return { userTweets, errorUserTweets, isLoadingUserTweets }
   
};

const useFetchAllTweets = () => {
    const [allTweets, setAllTweets] = useState([])
    const [errorAllTweets, setErrorAllTweets] = useState("")
    const [isLoadingAllTweets, setIsLoadingAllTweets] = useState(true)
    const { userID } = useContext(UserContext)

    useEffect(() => {
        setIsLoadingAllTweets(true);
            axios
            .get(API_URL + "/tweet/user", {
                headers: {
                    'Authorization': 'Bearer ' + authService.getToken(),
                    'ContentType': 'application/json'
                }
            })
            .then(response => {
                setAllTweets(response.data)
                setIsLoadingAllTweets(false)
               
            })
            .catch(error => {
                setErrorAllTweets("Error: "+error.response.data.message)
                console.log(error)
                setIsLoadingAllTweets(false)
            }) 
        
    }, [])

    return { allTweets, errorAllTweets, isLoadingAllTweets }
   
};

const useFetchUser = () => {
    const [userData, setUserData] = useState([])
    const [errorU, setErrorU] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { userID } = useContext(UserContext)


    useEffect(() => {
        setIsLoading(true);
        axios
        .get(API_URL + "/user/" + authService.getCurrentUser(), {
            headers: {
                'Authorization': 'Bearer ' + authService.getToken(),
                'ContentType': 'application/json'
            }
        })
        .then(response => {
           
            setUserData(response.data)
            setIsLoading(false)
           
        })
        .catch(error => {
            setErrorU("Error: "+error.response.data.message)
            console.log(error.response.data);
            
            setIsLoading(false)
        })
    }, [])

    return { userData, errorU, isLoading }
};

const useFetchGlobalStats = () => {
    const [globalStats, setGlobalStats] = useState([])
    const [errorGS, setErrorGS] = useState("")
    const [isLoadingGS, setIsLoadingGS] = useState(true)
    const { userID } = useContext(UserContext)

    useEffect(() => {
        setIsLoadingGS(true);
            axios
            .get(API_URL + "/author/news", {
                headers: {
                    'Authorization': 'Bearer ' + authService.getToken(),
                    'ContentType': 'application/json'
                }
            })
            .then(response => {
                setGlobalStats(response.data)
                setIsLoadingGS(false)
               
            })
            .catch(error => {
                setErrorGS("Error: "+error.response.data.message)
                console.log(error)
                setIsLoadingGS(false)
            }) 
        
    }, [])

    return { globalStats, errorGS, isLoadingGS }
   
};


const useFetchReactionsP = () => {
    const [reactionsP, setReactionsP] = useState([])
    const [errorRP, setErrorRP] = useState("")
    const [isLoadingRP, setIsLoadingRP] = useState(true)
    const { userID } = useContext(UserContext)

    useEffect(() => {
        setIsLoadingRP(true);
            axios
            .get(API_URL_T + '/reactionsSample.json') 
            .then(response => {
                setReactionsP(response.data)
                setIsLoadingRP(false)
               
            })
            .catch(error => {
                setErrorRP("Error: "+error.response.data.message)
                console.log(error)
                setIsLoadingRP(false)
            }) 
        
    }, [])

    return { reactionsP, errorRP, isLoadingRP }
   
};

const useFetchReactionsG = () => {
    const [reactionsG, setReactionsG] = useState([])
    const [errorGP, setErrorGP] = useState("")
    const [isLoadingGP, setIsLoadingGP] = useState(true)
    const { userID } = useContext(UserContext)

    useEffect(() => {
        setIsLoadingGP(true);
            axios
            .get(API_URL_T + '/reactionsGlobal.json')
            .then(response => {
                setReactionsG(response.data)
                setIsLoadingGP(false)
               
            })
            .catch(error => {
                setErrorGP("Error: "+error.response.data.message)
                console.log(error)
                setIsLoadingGP(false)
            }) 
        
    }, [])

    return { reactionsG, errorGP, isLoadingGP }
   
};

const fetchService = {
    useFetchUser,
    useFetchTweetNews,
    useFetchReactionsP,
    useFetchReactionsG,
    useFetchGlobalStats,
    useFetchAllTweets
    
};

export default fetchService;