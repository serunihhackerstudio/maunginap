import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FilterListIcon from "@material-ui/icons/FilterList";

// Icon
import HomeIcon from "@material-ui/icons/Home";

// React router
import { Route, Switch } from "react-router-dom";

// styles
import useStyles from "./styles";

// firebase hook
import { useFirebase } from "../../components/FirebaseProvider";
import { Divider } from "@material-ui/core";
import HomeProduk from "./produk";
import Proses from "./produk/bayar/proses";

// pages
import DetailProduk from "./produk/detail";
import Checkout from "./produk/checkout";
import PesananProvider from "../../components/PesananProvider";
import Bayar from "./produk/bayar";

function DetailBooking({ history }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { auth, user } = useFirebase();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = (e) => {
    if (window.confirm("Apakah Anda yakin ingin keluar ? ")) auth.signOut();
  };

  // const handleLogin = (e) => {
  //   // history.push("/login")
  //   return <Redirect to="/login" />;
  // };

  return (
    <PesananProvider>
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {/* LOGO TITLE */}
              <Switch>
                <Route path="/" exact children="Home" />
                <Route
                  path="/view/penginapan/:checkoutId/checkout"
                  exact
                  children="Checkout"
                />
                <Route
                  path="/view/penginapan/:penginapanId"
                  exact
                  children="Detail"
                />
                <Route
                  path="/view/penginapan/:checkoutId/checkout/bayar"
                  exact
                  children="Metode Pembayaran"
                />
                <Route
                  path="/view/penginapan/:checkoutId/proses/:prosesId"
                  exact
                  children="Progress Pembayaran"
                />
              </Switch>
              {/* LOGO TITLE */}
            </Typography>
            {!user && (
              <IconButton color="inherit">
                <a
                  href="/user/login"
                  onClick={() => window.location.reload()}
                  style={{ color: "#FFFFFF" }}
                >
                  <AccountCircleIcon />
                </a>
              </IconButton>
            )}
            {user && (
              <IconButton color="inherit" onClick={handleSignOut}>
                <SignOutIcon onClick={handleSignOut} />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          {/* MENU MENU APLIKASI */}
          <List>
            <Route
              path="/"
              exact
              children={(props) => {
                return (
                  <ListItem
                    selected={props.match ? true : false}
                    onClick={() => {
                      props.history.push("/");
                    }}
                    button
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                );
              }}
            />

            <Route
              path="#"
              children={(props) => {
                return (
                  <ListItem
                    selected={props.match ? true : false}
                    onClick={() => {
                      props.history.push("#");
                    }}
                    button
                  >
                    <ListItemIcon>
                      <FilterListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Filter" />
                  </ListItem>
                );
              }}
            />
          </List>
        </Drawer>

        {/* ROUTING ADDRESS */}

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route
                path="/view/penginapan/:checkoutId/checkout"
                exact
                component={Checkout}
              />
              <Route
                path="/view/penginapan/:penginapanId"
                exact
                component={DetailProduk}
              />
              <Route
                path="/view/penginapan/:checkoutId/checkout/bayar"
                exact
                component={Bayar}
              />
              <Route
                path="/view/penginapan/:checkoutId/proses/:prosesId"
                exact
                component={Proses}
              />

              <Route path="/" exact component={HomeProduk} />
            </Switch>
          </Container>
        </main>

        {/* ROUTING ADDRESS */}
      </div>
    </PesananProvider>
  );
}

export default DetailBooking;
