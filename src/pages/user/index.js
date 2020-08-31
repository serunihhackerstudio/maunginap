import React from "react";
import { Switch, Route } from "react-router-dom";

// pages
import LoginUser from "./login";
import RegistrasiUser from "./registrasi";

const User = () => {
  return (
    <div>
      <Switch>
        <Route path="/user/login" component={LoginUser} />
        <Route path="/user/register" component={RegistrasiUser} />
      </Switch>
    </div>
  );
};

export default User;
