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

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <FirebaseProvider>
            <PesananProvider>
              <Router>
                <Switch>
                  {/* halaman private */}
                  <PrivateRoute path="/produk" component={Private} />
                  <PrivateRoute path="/transaksi" component={Private} />
                  <PrivateRoute path="/dashboard" exact component={Private} />
                  <PrivateRoute path="/pengaturan" component={Private} />
                  {/* halaman public */}
                  <Route path="/testing/checkout" component={Checkout} />
                  {/* <Route path="/view" component={Home} /> */}
                  {/* <Route path="/user/login" component={LoginUser} /> */}
                  <Route path="/admin2020/registrasi" component={Registrasi} />
                  <Route path="/admin2020/login" component={Login} />
                  <Route path="/user/registrasi" component={RegistrasiUser} />
                  <Route path="/lupa-password" component={LupaPassword} />
                  <Route path="/user" component={User} />
                  <PublicRoute path="/" component={Home} />
                  <Route component={NotFound} />k
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
