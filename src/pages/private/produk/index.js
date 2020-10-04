import React from "react";
import { Route, Switch } from "react-router-dom";
import EditProduk from "./edit";
import GridProduk from "./grid";

function Produk() {
  return (
    <Switch>
      <Route
        path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/produk/edit/:produkId"
        component={EditProduk}
      />
      <Route component={GridProduk} />
    </Switch>
  );
}

export default Produk;
