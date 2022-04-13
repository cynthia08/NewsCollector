import axios from "axios";
import jwt from 'jwt-decode';
import { useEffect, useState } from "react";
import { useContext, createContext } from 'react';
import UserContext from "../user-context";

const API_URL = "https://newshub.mortaga.de/api";
const API_URL_T = "http://localhost:3000/data"

const useFetchNews = (url) => {
    const [newsData, setNewsData] = useState([])
    const [errorN, setErrorN] = useState("")
    const [isLoadingN, setIsLoadingN] = useState(true)
    const { userID } = useContext(UserContext)

    useEffect(() => {
        setIsLoadingN(true);
        setTimeout(()=>{
            axios
            .get(API_URL_T + '/newsDataM.json')
            //.get(`${baseURL}/${userID}`)
            .then(response => {
            setNewsData(response.data)
            setIsLoadingN(false)
            console.log(response.data)  
            })
            .catch(error => {
            setErrorN("Sorry, something went wrong")
            setIsLoadingN(false)
            })       }, 10)
        
    }, [url])

    return { newsData, errorN, isLoadingN }
   
};
  
const useFetchUser = (url) => {
    const [userData, setUserData] = useState([])
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { userID } = useContext(UserContext)


    useEffect(() => {
        setIsLoading(true);
        axios
        .get(API_URL_T+ '/user4.json')
        //.get(`${baseURL}/${userID}`)
        .then(response => {
        
            setUserData(response.data)
            setIsLoading(false)
            console.log(response.data)
        })
        .catch(error => {
            setError("Sorry, something went wrong")
            setIsLoading(false)
        })
    }, [url])

    return { userData, error, isLoading }
};


const fetchService = {
    useFetchNews,
    useFetchUser
    
};

export default fetchService;