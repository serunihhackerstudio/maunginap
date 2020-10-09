import React from "react";

// material ui
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import { Switch, Route, Redirect } from "react-router-dom";
import UserInfo from "./userInfo";
import UserBio from "./userBio";
import useStyles from "./styles";

function UserProfile(props) {
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
        <Tab label="User" value="/profile/user/info" />
        <Tab label="Biodata" value="/profile/user/biodata" />
      </Tabs>
      <div className={classes.tabContent}>
        <Switch>
          <Route path="/profile/user/info" component={UserInfo} />
          <Route path="/profile/user/biodata" component={UserBio} />
          <Redirect to="/profile/user" />
        </Switch>
      </div>
    </Paper>
  );
}

export default UserProfile;
