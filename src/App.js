import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// src
import Registrasi from "./pages/registrasi";
import RegistrasiUser from "./pages/user/registrasi";
import Login from "./pages/login";
import LupaPassword from "./pages/lupa-password";
import NotFound from "./pages/404";
import Private from "./pages/private";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import FirebaseProvider from "./components/FirebaseProvider";
import Home from "./pages/public";
import User from "./pages/user";

// import komponent material UI
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from "./config/theme";
import PesananProvider from "./components/PesananProvider";
import Checkout from "./testing/Checkout";

// notistack
import { SnackbarProvider } from "notistack";
// test
// pusher
// import * as PusherPushNotifications from "@pusher/push-notifications-web";
import "./App.css";

// button
import Zoom from "@material-ui/core/Zoom";
import { Button } from "@material-ui/core";

function App() {
  // const beamsClient = new PusherPushNotifications.Client({
  //   instanceId: "118259de-124d-42a4-8d8f-edade323e549",
  // });

  // beamsClient
  //   .start()
  //   .then(() => beamsClient.addDeviceInterest("hello"))
  //   .then(() => console.log("Successfully registered and subscribed!"))
  //   .catch(console.error);

  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          TransitionComponent={Zoom}
          ref={notistackRef}
          action={(key) => (
            <Button color="secondary" onClick={onClickDismiss(key)}>
              Tutup
            </Button>
          )}
        >
          <FirebaseProvider>
            <PesananProvider>
              <Router>
                <Switch>
                  {/* halaman private */}
                  <PrivateRoute
                    path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/produk"
                    component={Private}
                  />
                  <PrivateRoute
                    path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/transaksi"
                    component={Private}
                  />
                  <PrivateRoute
                    path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/dashboard"
                    exact
                    component={Private}
                  />
                  <PrivateRoute
                    path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan"
                    component={Private}
                  />
                  <PrivateRoute
                    path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/users"
                    component={Private}
                  />

                  <PrivateRoute
                    path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/cloud-messaging"
                    component={Private}
                  />
                  {/* halaman public */}
                  <Route path="/testing/checkout" component={Checkout} />
                  {/* <Route path="/view" component={Home} /> */}
                  {/* <Route path="/user/login" component={LoginUser} /> */}
                  <Route
                    path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/registrasi"
                    component={Registrasi}
                  />
                  <Route
                    path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/admin/login"
                    component={Login}
                  />
                  <Route path="/user/registrasi" component={RegistrasiUser} />
                  <Route path="/lupa-password" component={LupaPassword} />
                  <Route path="/user" component={User} />
                  <PublicRoute path="/" component={Home} />
                  <Route component={NotFound} />
                </Switch>
              </Router>
            </PesananProvider>
          </FirebaseProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
