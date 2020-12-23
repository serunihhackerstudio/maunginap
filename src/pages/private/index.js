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
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';

// Icon
// import HomeIcon from "@material-ui/icons/Home";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

// React router
import { Route, Switch } from "react-router-dom";

// komponent halaman private
import Pengaturan from "./pengaturan";
import Produk from "./produk";
import Transaksi from "./transaksi";
import Home from "./home";
import Users from "./users";
import Messaging from "./messaging";

// styles
import useStyles from "./styles";

// firebase hook
import { useFirebase } from "../../components/FirebaseProvider";
import { Divider } from "@material-ui/core";

export default function Private(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { setAdminUser, setAdminPass } = useFirebase();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = (e) => {
    if (window.confirm("Apakah Anda yakin ingin keluar ? ")) {
      setAdminUser("");
      setAdminPass("");
    }
    props.history.push(
      "/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/admin/login"
    );
  };

  return (
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
              <Route
                path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/dashboard"
                exact
                children="Dashboard"
              />
              <Route
                path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/produk"
                children="Kost & Penginapan"
              />
              <Route
                path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/transaksi"
                children="Approve Transaksi"
              />
              <Route
                path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan"
                children="Pengaturan"
              />
              <Route
                path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/users"
                children="Users"
              />
              <Route
                path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/cloud-messaging"
                children="Cloud Messaging"
              />
            </Switch>
            {/* LOGO TITLE */}
          </Typography>
          <IconButton color="inherit">
            <SignOutIcon onClick={handleSignOut} />
          </IconButton>
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
                    props.history.push(
                      "/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/dashboard"
                    );
                  }}
                  button
                >
                  <ListItemIcon>
                    <DashboardOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
              );
            }}
          />

          <Route
            path="/produk"
            children={(props) => {
              return (
                <ListItem
                  selected={props.match ? true : false}
                  onClick={() => {
                    props.history.push(
                      "/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/produk"
                    );
                  }}
                  button
                >
                  <ListItemIcon>
                    <StorefrontIcon />
                  </ListItemIcon>
                  <ListItemText primary="Produk" />
                </ListItem>
              );
            }}
          />

          <Route
            path="/transaksi"
            children={(props) => {
              return (
                <ListItem
                  selected={props.match ? true : false}
                  onClick={() => {
                    props.history.push(
                      "/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/transaksi"
                    );
                  }}
                  button
                >
                  <ListItemIcon>
                    <ShoppingCartOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transaksi" />
                </ListItem>
              );
            }}
          />

          <Route
            path="/cloud-messaging"
            children={(props) => {
              return (
                <ListItem
                  selected={props.match ? true : false}
                  onClick={() => {
                    props.history.push(
                      "/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/cloud-messaging"
                    );
                  }}
                  button
                >
                  <ListItemIcon>
                    <MailOutlineOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cloud Messaging" />
                </ListItem>
              );
            }}
            
          />

        <Route
            path="/pengaturan"
            children={(props) => {
              return (
                <ListItem
                  selected={props.match ? true : false}
                  onClick={() => {
                    props.history.push(
                      "/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan"
                    );
                  }}
                  button
                >
                  <ListItemIcon>
                    <SettingsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pengaturan" />
                </ListItem>
              );
            }}
            
          />
          
          {/* <Route
            path="/users"
            children={(props) => {
              return (
                <ListItem
                  selected={props.match ? true : false}
                  onClick={() => {
                    props.history.push(
                      "/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/users"
                    );
                  }}
                  button
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              );
            }}
          /> */}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route
              path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/pengaturan"
              component={Pengaturan}
            />
            <Route
              path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/produk"
              component={Produk}
            />
            <Route
              path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/transaksi"
              component={Transaksi}
            />
            <Route
              path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/dashboard"
              component={Home}
            />
            <Route
              path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/users"
              component={Users}
            />

            <Route
              path="/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/cloud-messaging"
              component={Messaging}
            />
          </Switch>
        </Container>
      </main>
    </div>
  );
}
