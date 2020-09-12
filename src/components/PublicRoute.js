import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useFirebase } from "./FirebaseProvider";

function PublicRoute({ component: Component, ...restProps }) {
  const { user } = useFirebase();
  return (
    <Route
      {...restProps}
      render={(props) => {
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/user/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
}

export default PublicRoute;
