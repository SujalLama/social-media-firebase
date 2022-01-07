import { onAuthStateChanged } from 'firebase/auth';
import React, {useEffect, useState} from 'react'
import {Route, Redirect} from 'react-router-dom'
import { auth } from '../config/firebase-config';
import { checkLocalStorage } from './checkAuth';


const PrivateRoute =  ({component: Component, ...rest}) => {
    return (
        <Route {...rest}
        render={(props) => (
            checkLocalStorage() ? <Component {...props} />
            : <Redirect to="/login" />
            )
        }
        />
    )
}

export default PrivateRoute
