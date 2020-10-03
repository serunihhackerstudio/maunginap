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
              pathname:
                "/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/admin/login",
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
