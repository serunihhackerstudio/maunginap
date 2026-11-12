import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import { SnackbarProvider } from "notistack";

import theme from "./config/theme";
import FirebaseProvider from "./components/FirebaseProvider";
import PesananProvider from "./components/PesananProvider";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import Home from "./pages/public";
import Login from "./pages/login";
import LupaPassword from "./pages/lupa-password";
import NotFound from "./pages/404";
import Private from "./pages/private";
import Registrasi from "./pages/registrasi";
import User from "./pages/user";
import RegistrasiUser from "./pages/user/registrasi";

// Prefix URL halaman admin (jangan diubah tanpa menyesuaikan tautan di panel admin)
const ADMIN = "/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls";

const adminPrivatePages = [
  { path: `${ADMIN}/produk` },
  { path: `${ADMIN}/transaksi` },
  { path: `${ADMIN}/dashboard`, exact: true },
  { path: `${ADMIN}/pengaturan` },
  { path: `${ADMIN}/users` },
  { path: `${ADMIN}/cloud-messaging` },
];

function App() {
  const notistackRef = React.createRef();
  const dismiss = (key) => () => notistackRef.current.closeSnackbar(key);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionComponent={Zoom}
          ref={notistackRef}
          action={(key) => (
            <Button color="secondary" onClick={dismiss(key)}>
              Tutup
            </Button>
          )}
        >
          <FirebaseProvider>
            <PesananProvider>
              <Router>
                <Switch>
                  {adminPrivatePages.map((page) => (
                    <PrivateRoute key={page.path} component={Private} {...page} />
                  ))}

                  <Route path={`${ADMIN}/registrasi`} component={Registrasi} />
                  <Route path={`${ADMIN}/admin/login`} component={Login} />
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
