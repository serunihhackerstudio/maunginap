import React from "react";

// material ui
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import { Switch, Route, Redirect } from "react-router-dom";
import SuperAdmin from "./superAdmin";
import IdentitasAdmin from "./identitasAdmin";
import Kota from "./kota";
import Diskon from "./diskon"
import ImageSlider from "./imageSlider"
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
        <Tab
          label="Admin"
          value="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan/admin"
        />
        <Tab
          label="Identias"
          value="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan/identitas"
        />
        <Tab
          label="Kota"
          value="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan/kota"
        />
        <Tab
          label="Diskon"
          value="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan/diskon"
        />
        <Tab
          label="Gambar Promosi"
          value="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan/gambar-promosi"
        />
      </Tabs>
      <div className={classes.tabContent}>
        <Switch>
          <Route
            path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan/admin"
            component={SuperAdmin}
          />
          <Route
            path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan/identitas"
            component={IdentitasAdmin}
          />
          <Route
            path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan/kota"
            component={Kota}
          />
          <Route
            path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan/diskon"
            component={Diskon}
          />
          <Route
            path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan/gambar-promosi"
            component={ImageSlider}
          />
          <Redirect to="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan/admin" />
        </Switch>
      </div>
    </Paper>
  );
}

export default Pengaturan;
