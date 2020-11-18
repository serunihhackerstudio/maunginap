import React from "react";
import { Switch, Route } from "react-router-dom";
import Kontrakan from "./kontrakan";
import Kost from "./kost";

function IconMenu() {
  return (
    <Switch>
      <Route path="/menu/only/kost" component={Kost} />
      <Route path="/menu/only/kontrakan" component={Kontrakan} />
      <Route component={Kost} />
    </Switch>
  );
}

export default IconMenu;
