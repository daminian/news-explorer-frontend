import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, path, popupLoginOpen, ...props }) => {

  return (
    <Route path={path}>
      {
        props.isLoggedIn ? <Component {...props} /> :
          <Redirect from="/saved-news" to={{pathname: "/", state: {noAuthRedirected: true}}}/>
      }
    </Route>
  )
}
export default ProtectedRoute;
