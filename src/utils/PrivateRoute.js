import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { checkLocalStorage} from './checkAuth'

const PrivateRoute =  ({component: Component, ...rest}) => {
    const isUser = true;
    return (
        <Route {...rest}
        render={(props) => (
            isUser ? <Component {...props} />
            : <Redirect to="/login" />
            )
        }
        />
    )
}

export default PrivateRoute
