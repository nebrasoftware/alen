import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const auth = JSON.parse(localStorage.getItem('auth'));

export const AdminPrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (auth && auth.is_admin)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)