import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authService from '../services/authServices'

/*
************************************************************************************
  PrivateRoute control the routes which can only be accessed when user is login.
************************************************************************************
*/

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            authService.isLogin() && authService.isValidToken() ?
                <Component {...props} />
            : <Redirect to={{
                pathname: "/",
                state: { reason: "Session expired."}
             }} />
        )} />
    );
};

export default PrivateRoute