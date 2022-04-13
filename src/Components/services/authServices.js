import axios from "axios";
import jwt from 'jwt-decode';
import { useContext, createContext } from 'react';
import UserContext from "../user-context";


const API_URL = "https://newshub.mortaga.de/api";
const API_URL_T = "http://localhost:3000/data/"

const register = (values) => {
    return axios.post(API_URL +'/auth/register', values)
            //return axios.get('https://newshub.mortaga.de/api/user')
            .then(response => {
               
                // if (response.data.token) {
                //     localStorage.setItem("user", JSON.stringify(response.data));
                // }
                
                //return response.data.token;   
                return response.data;      
            })
};
  
const login = (values) => {
    //const { userID, setUserID } = useContext(UserContext);

    return axios.post(API_URL +'/auth/login', values)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    const user = jwt(response.data.token); // change here
                    console.log("user " + user.sub);
                    //setUserID(user.sub); 

                }
                
                return response.data.token;      
            })
};


const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    const user = jwt(localStorage.getItem("user")); // change here
    return user.sub;
};

const isLogin = () => {
    if (localStorage.getItem("user")) {
        return true;
    }
    return false;
};

const isValidToken = () => { 
    if (localStorage.getItem("user")) {
        const user = jwt(localStorage.getItem("user")); // change here
        if (user.exp > Date.now() / 1000){
            return true;
        } else{
            localStorage.removeItem("user");
            console.log("session expired!");
            return false;

        }    
    } else{
        return false;
    }

}

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
    isLogin,
    isValidToken
};

export default authService;