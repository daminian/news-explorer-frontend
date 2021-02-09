import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, path, popupLoginOpen, ...props }) => {

  return (
    <Route path={path}>
      {
        props.isLoggedIn ? <Component {...props} /> :
          <Redirect to={{pathname: "/", state: {noAuthRedirected: true}}}/>
      }
    </Route>
  )
}
export default withRouter(ProtectedRoute);
