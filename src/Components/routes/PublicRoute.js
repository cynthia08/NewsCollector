import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authService from '../services/authServices'


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            authService.isLogin() && restricted && authService.isValidToken() ?
                <Redirect to="/profile" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute