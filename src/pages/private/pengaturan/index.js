import React from "react";

// material ui
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import { Switch, Route, Redirect } from "react-router-dom";
import SuperAdmin from "./superAdmin";
import IdentitasAdmin from "./identitasAdmin";
import Kota from "./kota";
import useStyles from "./styles";

function Pengaturan(props) {
  const handleChangeTab = (event, value) => {
    props.history.push(value);
  };

  const classes = useStyles();

  return (
    <Paper square>
      <Tabs
        value={props.location.pathname}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChangeTab}
      >
        <Tab label="Admin" value="/pengaturan/admin" />
        <Tab label="Identias" value="/pengaturan/identitas" />
        <Tab label="Kota" value="/pengaturan/kota" />
      </Tabs>
      <div className={classes.tabContent}>
        <Switch>
          <Route path="/pengaturan/admin" component={SuperAdmin} />
          <Route path="/pengaturan/identitas" component={IdentitasAdmin} />
          <Route path="/pengaturan/kota" component={Kota} />
          <Redirect to="/pengaturan/admin" />
        </Switch>
      </div>
    </Paper>
  );
}

export default Pengaturan;
