import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export const PublicRoute = ({component, isAuth, ...options}) => {
    if (!isAuth) return <Route {...options} component={component} />
    return <Redirect to="/dashboard" />
}

export const PrivateRoute = ({component,isAuth, ...options}) => {
    if (isAuth) return <Route {...options} component={component} />
    return <Redirect to="/auth/login" />
}