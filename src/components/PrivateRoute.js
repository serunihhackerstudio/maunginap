import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useFirebase } from "./FirebaseProvider";

function PrivateRoute({ component: Component, ...restProps }) {
  const { adminUser } = useFirebase();

  return (
    <Route
      {...restProps}
      render={(props) => {
        return adminUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
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

export default PrivateRoute;
