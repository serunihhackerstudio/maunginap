import React from "react";

// material ui
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import { Switch, Route, Redirect } from "react-router-dom";

// import styles
import useStyles from "./styles"

// import history dan progress
import History from "../../produk/history"
import ProgressAir from "./index"

function TabProgress(props) {
  const handleChangeTab = (event, value) => {
    props.history.push(value);
  };

  const classes = useStyles();

  return (
    <>
        <Tabs
          value={props.location.pathname}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChangeTab}
          centered
        >
          <Tab label="Hunian" value="/history" />
          <Tab label="Air isi ulang" value="/history/pesan-air/progress" />
        </Tabs>
        <div className={classes.tabContent}>
          <Switch>
            <Route path="/history" exact component={History} />
            <Route path="/history/pesan-air/progress" component={ProgressAir} />
            <Redirect to="/history" />
          </Switch>
        </div>
    </>
  );
}

export default TabProgress;
