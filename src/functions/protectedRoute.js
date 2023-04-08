import React, { useContext } from 'react'
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component,user, ...restOfProps }) => {
    console.log('aaaaaaaa',user)
    return (
        <Route
      {...restOfProps}
      render={(props) =>
        user? <Component {...props} /> : <Redirect to="/signup" />
      }
    />
    )
}

export default ProtectedRoute
