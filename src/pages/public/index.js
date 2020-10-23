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
import SignOutIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";

// dialog/modal
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

// Icon
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// React router
import { Route, Switch, Link } from "react-router-dom";

// styles
import useStyles from "./styles";

// firebase hook
import { useFirebase } from "../../components/FirebaseProvider";

// pages
import DetailProduk from "./produk/detail";
import HomeProduk from "./produk";
import Proses from "./produk/bayar/proses";
import History from "./produk/history";
import Perpanjang from "./produk/perpanjang";
import ProsesPerpanjang from "./produk/perpanjang/proses";
import DialogBooking from "./produk/dialog/index";
import UserProfile from "../user/profile";
import Tooltip from "@material-ui/core/Tooltip";

// mobile detector
import { isBrowser } from "react-device-detect";

import { useCollection } from "react-firebase-hooks/firestore";

// menu
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";

import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { green, pink } from "@material-ui/core/colors";

function Home({ history, location }) {
  // menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { auth, user, firestore } = useFirebase();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [jumlahPesanan, setJumlahPesanan] = React.useState(0);
  const historyQuery = firestore
    .collection("pesanan")
    .where("userId", "==", user.uid);

  const [snapshot, loading] = useCollection(historyQuery);

  const notifQuery = firestore
    .collection("notification").orderBy("created", "desc")
    // .where("userId", "==", user.uid);

  const [snapshotNotif, loadingNotif] = useCollection(notifQuery);
  const [jumlahNotif, setJumlahNotif] = React.useState(0);
  const [msgNotif, setMsgNotif] = React.useState([]);

  React.useEffect(() => {
    if (snapshot) {
      setJumlahPesanan(snapshot.docs.length);
    }

    if (snapshotNotif) {
      setJumlahNotif(snapshotNotif.docs.length);
      setMsgNotif(snapshotNotif.docs);
    }
  }, [snapshot, snapshotNotif]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSignOut = (e) => {
    auth.signOut();
    window.location.reload();
  };

  const [drawer, setDrawer] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer({ left: open });
  };

  const list = (anchor) => (
    <div
      className={!isBrowser ? clsx(classes.fullList) : clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Route
          path="/"
          exact
          children={(props) => {
            return (
              <ListItem
                // selected={props.match ? true : false}
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
        {/* TESTING SEMENTARA DI-HIDE */}
        <Route
          path="/profile/user"
          children={(props) => {
            return (
              <ListItem
                // selected={props.match ? true : false}
                onClick={() => {
                  props.history.push("/profile/user");
                }}
                button
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItem>
            );
          }}
        />
      </List>
    </div>
  );

  const anchor = "left";
  let posisiMenu = "left";
  if (!isBrowser) {
    posisiMenu = "bottom";
  }

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
            onClick={toggleDrawer(anchor, true)}
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

              <Route path="/profile/user/info" exact children="User" />
              <Route path="/profile/user/biodata" exact children="Biodata" />

              <Route
                exact
                path="/perpanjang/:penginapanId"
                children="Perpanjang"
              />
              <Route
                exact
                path="/perpanjang/:penginapanId/proses"
                children="Checkout"
              />

              <Route path="/history" exact children="History Pesanan" />
            </Switch>
            {/* LOGO TITLE */}
          </Typography>

          {/* icon logout */}

          {!user && (
            <IconButton color="inherit" component={Link} to={"/user/login"}>
              <AccountCircleIcon />
            </IconButton>
          )}

          {user && (
            <>
              <Tooltip title="Pesanan">
                <IconButton
                  color="inherit"
                  aria-controls="simple-menu"
                  onClick={handleClick}
                >
                  <Badge badgeContent={jumlahNotif} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Pesanan">
                <IconButton color="inherit" component={Link} to={"/history"}>
                  <Badge badgeContent={jumlahPesanan} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </>
          )}

          {/* {user && (
            <Tooltip title="Sign out">
              <IconButton color="inherit" onClick={handleOpenDialog}>
                <SignOutIcon />
              </IconButton>
            </Tooltip>
          )} */}
          <div>
            <Menu
              className={classes.menuItem}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: "full",
                  width: 370,
                },
              }}
            >
              {msgNotif.map((data) => {
                const item = data.data();
                return (
                  <MenuItem onClick={handleClose}>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar style={{ backgroundColor: green[500] }}>
                            <NotificationsIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <Typography>
                          #{item.kodeBooking}&nbsp;
                        </Typography>
                        <Typography color="secondary">
                          {item.status}
                        </Typography>
                        {/* <ListItemText
                          primary={`Pesanan #${item.kodeBooking} berstatus ${item.status}`}
                          secondary={`${item.created}`}
                        /> */}
                      </ListItem>
                    </List>
                  </MenuItem>
                );
              })}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      <div>
        <React.Fragment key={anchor}>
          {/* <Button onClick={}>{"left"}</Button> */}
          <Drawer
            anchor={posisiMenu}
            open={drawer[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      </div>

      {/* ROUTING ADDRESS */}

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route
              path="/view/penginapan/:penginapanId/proses"
              exact
              component={Proses}
            />
            <Route
              path="/view/penginapan/:penginapanId/checkout"
              exact
              component={DialogBooking}
            />
            <Route
              path="/view/penginapan/:penginapanId"
              exact
              component={DetailProduk}
            />
            <Route path="/history" component={History} />
            <Route
              exact
              path="/perpanjang/:penginapanId"
              component={Perpanjang}
            />
            <Route
              exact
              path="/perpanjang/:penginapanId/proses"
              component={ProsesPerpanjang}
            />
            <Route path="/profile/user" component={UserProfile} />
            <Route component={HomeProduk} />
          </Switch>
        </Container>
      </main>

      {/* MODAL / DIALOG */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Konfirmasi sign out"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah Anda yakin ingin keluar dari akun Anda ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Tidak
          </Button>
          <Button onClick={handleSignOut} color="primary" autoFocus>
            Iya
          </Button>
        </DialogActions>
      </Dialog>
      {/* MODAL / DIALOG */}

      {/* ROUTING ADDRESS */}
    </div>
  );
}

export default Home;
