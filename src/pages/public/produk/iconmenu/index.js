import React from "react";
import { Switch, Route } from "react-router-dom";
import Kontrakan from "./kontrakan";
import Kost from "./kost";
import Ruko from "./ruko";

function IconMenu() {
  return (
    <Switch>
      <Route path="/filter/kost" component={Kost} />
      <Route path="/filter/kontrakan" component={Kontrakan} />
      <Route path="/filter/ruko" component={Ruko} />
      <Route component={Kost} />
    </Switch>
  );
}

export default IconMenu;
