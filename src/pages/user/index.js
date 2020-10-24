import React from "react";
import { Switch, Route } from "react-router-dom";

// pages
import LoginUser from "./login";
import RegistrasiUser from "./registrasi";
import Transition from "./registrasi/transition"

const User = () => {
  return (
    <div>
      <Switch>
        <Route path="/user/login" component={LoginUser} />
        <Route path="/user/register" component={RegistrasiUser} />
        <Route path="/user/transisi" component={Transition} />
      </Switch>
    </div>
  );
};

export default User;
