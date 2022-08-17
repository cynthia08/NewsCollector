import axios from "axios";
import jwt from 'jwt-decode';
import { useContext, createContext } from 'react';
import UserContext from "../user-context";

/*
************************************************************************
    This service file manages all the information related to the user's 
    authentication and account management.
************************************************************************
*/

const API_URL = process.env.REACT_APP_API_URL;
const API_URL_T = process.env.REACT_APP_API_URL_TEMPORAL;


/*
**
    Manage user's authentication:
    + login
    + logout
    + register
    
    Check user's login and session is still valid:
    + isLogin
    + isValidToken
**
*/

const login = (values) => {
    //const { userID, setUserID } = useContext(UserContext);

    return axios.post(API_URL +'/auth/login', values)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    const user = jwt(response.data.token); 
                    const name = response.data.name;
                    const email = jwt(response.data.token).email;
                    localStorage.setItem("diplayName", name);
                    localStorage.setItem("displayEmail", email);

                }
                
                return response.data.token;      
            })
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_reactions");
    localStorage.removeItem("filenameP");
    localStorage.removeItem("global_reactions");
    localStorage.removeItem("filenameG");
    localStorage.removeItem("diplayName");
    localStorage.removeItem("displayEmail");
};

const register = (values) => {
    return axios.post(API_URL +'/auth/register', values)
            .then(response => {
                return response.data;    
                  
            })
};

const isLogin = () => {
    if (localStorage.getItem("user")) {
        return true;
    }
    return false;
};

const isValidToken = () => { 
    if (localStorage.getItem("user")) {
        const user = jwt(localStorage.getItem("user")); 
        if (user.exp > Date.now() / 1000){
            return true;
        } else{
            localStorage.removeItem("user");
            console.log("Session expired!");
            return false;

        }    
    } else{
        return false;
    }

}

/*
**
    Updates user's account information:
    + updateAccount
    + updatePassword
    + updateDisplayData
**
*/

const updateAccount = (values) => {
    return axios.post(API_URL +'/user/update/basic-info', values , {
            headers: {
                'Authorization': 'Bearer ' + authService.getToken(),
                'ContentType': 'application/json'
            }
        })
            .then(response => {
               
                return response.data;      
            })
};

const updatePassword = (values) => {
    return axios.post(API_URL +'/user/update/password', values , {
            headers: {
                'Authorization': 'Bearer ' + authService.getToken(),
                'ContentType': 'application/json'
            }
        })
            .then(response => {
                return response.data;      
            })
};

const updateDisplayData = (name, email) => {
    localStorage.setItem("diplayName", name);
    localStorage.setItem("displayEmail", email);
    
};
  
/*
**
    Gets user's account information:
    + getCurrentUser
    + getToken
    + getName
    + getEmail
**
*/

const getCurrentUser = () => {
    const user = jwt(localStorage.getItem("user")); 
    return user.sub;
};

const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user")); 
    return user.token;
};

const getName = () => {
    const user = localStorage.getItem("diplayName"); //JSON.parse(localStorage.getItem("user")); // change here   
    return user;
};

const getEmail = () => {
    const email = localStorage.getItem("displayEmail");
    return email;
};

/*
**
    Manages the local upload of the reactions JSON file by saving the reactions data in local storage.
    + saveJSON
    + isFileLoadedJSON
    + getJSONData
    + getJSONFilename
**
*/

const saveJSON = (id, data, filename) => { 
   if(id === 0){
        localStorage.setItem("user_reactions", data);
        localStorage.setItem("filenameP", filename);
   }else if (id === 1){
        localStorage.setItem("global_reactions", data);
        localStorage.setItem("filenameG", filename);
   }
}

const isFileLoadedJSON = (id) => { 
    if(id === 0){
        return localStorage.getItem("user_reactions");

    }else if (id === 1){
        return localStorage.getItem("global_reactions");

    }

}

const getJSONData = (id) => {
    let user;
    if(id === 0){
        user = JSON.parse(localStorage.getItem("user_reactions")); // change here
    }else if (id === 1){
        user = JSON.parse(localStorage.getItem("global_reactions")); // change here
    }
    return user;
};

const getJSONFilename = (id) => { 
    if(id === 0){
        return localStorage.getItem("filenameP");
    }else if (id === 1){
        return localStorage.getItem("filenameG");
    }  

}

/*
**
    Checks if reactions file is loaded:
    + flagData
    + dataFound
**
*/

const flagData = (length) => { 
    if(length === 0){
         localStorage.setItem("dataFound", true);
    }
 }

 const dataFound = () => { 
    return localStorage.getItem("dataFound");
 }

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
    isLogin,
    isValidToken,
    getToken,
    getName,
    saveJSON,
    isFileLoadedJSON,
    getJSONFilename,
    getJSONData,
    getEmail,
    updateAccount,
    updatePassword,
    flagData,
    dataFound,
    updateDisplayData
};

export default authService;