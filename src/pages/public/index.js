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
import UserView from "../user/profile/userView";
import Notification from "./produk/notification/notification";
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
import { green, red, blue, orange } from "@material-ui/core/colors";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TimerIcon from "@material-ui/icons/Timer";
import DoneIcon from "@material-ui/icons/Done";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

// import menu icnomenu
import IconMenu from "../public/produk/iconmenu";

// bottom navigation
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function Home({ history, location }) {
  const [value1, setValue1] = React.useState(0);
  // menu
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    .collection("notification")
    .where("userId", "==", `${user.uid}`)
    .limit(10);

  const notifQueryAll = firestore
    .collection("notification")
    .where("userId", "==", `${user.uid}`);
  // .orderBy("created","desc")
  const [snapshotNotif, loadingNotif] = useCollection(notifQuery);
  const [snapshotNotifAll, loadingNotifAll] = useCollection(notifQueryAll);
  const [jumlahNotif, setJumlahNotif] = React.useState(0);
  const [jumlahNotifAll, setJumlahNotifAll] = React.useState(0);
  const [msgNotif, setMsgNotif] = React.useState([]);

  // avatar image
  const userBio = firestore.collection("userbio").doc(`${user.uid}`);
  const [userBioSnapshot, userBioLoading] = useCollection(userBio);
  const [userBioItem, setUserBioItem] = React.useState({});

  React.useEffect(() => {
    if (snapshot) {
      setJumlahPesanan(snapshot.docs.length);
    }

    if (snapshotNotif) {
      setJumlahNotif(snapshotNotif.docs.length);
      const notifData = snapshotNotif.docs;
      notifData.sort((a, b) => b.data().created - a.data().created);
      // notifData.sort((a,b) =>  new Date(a.date) - new Date(b.date))
      setMsgNotif(notifData);
    }
    if (snapshotNotifAll) {
      setJumlahNotifAll(snapshotNotifAll.docs.length);
    }

    if (userBioSnapshot) {
      setUserBioItem(userBioSnapshot.data());
    }
  }, [snapshot, snapshotNotif, snapshotNotifAll, userBioSnapshot]);

  const historyPesananCallback = () => {
    setJumlahPesanan(null);
    history.push("/history");
  };

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setJumlahNotifAll(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClose = () => {
    setAnchorEl(null);
    history.push("/history");
  };

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
                  props.history.push("/profile/view");
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

  const navigationTo = (address) => (event) => {
    event.preventDefault();
    history.push(`${address}`);
    if (address === "/history"){
      historyPesananCallback();
    }
    
  };

  return (
    <div className={classes.root}>
      {isBrowser ? (
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
                <Route path="/notification" exact children="Notification" />
                <Route path="/profile/view" exact children="User Profile" />
                <Route path="/menu/only/kontrakan" exact children="Kontrakan" />
                <Route path="/menu/only/kost" exact children="Kostan" />
                <Route
                  path="/view/penginapan/:checkoutId/proses"
                  exact
                  children="Tagihan"
                />
              </Switch>
              {/* LOGO TITLE */}
            </Typography>

            {/* icon logout */}

            {!user && (
              <IconButton color="inherit" component={Link} to={"/user/login"}>
                <AccountCircleIcon />
              </IconButton>
            )}
            <>
              <Tooltip title="Notifikasi">
                <IconButton
                  color="inherit"
                  aria-controls="simple-menu"
                  onClick={handleClick}
                >
                  <Badge badgeContent={jumlahNotifAll} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Pesanan">
                <IconButton color="inherit" onClick={historyPesananCallback}>
                  <Badge badgeContent={jumlahPesanan} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </>

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
                    width: 340,
                  },
                }}
              >
                {msgNotif.map((data) => {
                  const item = data.data();
                  const date = new Date(
                    item.created["seconds"] * 1000
                  ).toLocaleDateString();
                  return (
                    <MenuItem onClick={handleItemClose}>
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            {item.status === "Jatuh tempo pembayaran" ? (
                              <Avatar style={{ backgroundColor: red[500] }}>
                                <AttachMoneyIcon />
                              </Avatar>
                            ) : item.status === "Menunggu pembayaran" ||
                              item.status === "Menunggu perpanjangan" ? (
                              <Avatar style={{ backgroundColor: orange[500] }}>
                                <TimerIcon />
                              </Avatar>
                            ) : (
                              <Avatar style={{ backgroundColor: "#016660" }}>
                                <DoneIcon />
                              </Avatar>
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  <Typography>
                                    {item.namaPenginapan} #{item.kodeBooking}
                                  </Typography>
                                  <Typography color="primary">
                                    {item.status ===
                                    "Jatuh tempo pembayaran" ? (
                                      <strong>
                                        <font color="red">{item.status}</font>
                                      </strong>
                                    ) : item.status === "Menunggu pembayaran" ||
                                      item.status ===
                                        "Menunggu perpanjangan" ? (
                                      <strong>
                                        <font color="orange">
                                          {item.status}
                                        </font>
                                      </strong>
                                    ) : (
                                      <strong>{item.status}</strong>
                                    )}
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                  >
                                    {date}
                                  </Typography>
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          {/* <ListItemText
                          primary={`Pesanan #${item.kodeBooking} berstatus ${item.status}`}
                          secondary={`${item.created}`}
                        /> */}
                        </ListItem>
                      </List>
                    </MenuItem>
                  );
                })}
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    history.push("/notification");
                  }}
                >
                  <List>
                    <ListItem>
                      {msgNotif.length === 0 ? (
                        <>
                          <ListItemAvatar>
                            <Avatar style={{ backgroundColor: orange[500] }}>
                              <ErrorOutlineIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              Belum ada data
                            </Typography>
                          </ListItemText>
                        </>
                      ) : (
                        <>
                          <ListItemAvatar>
                            <ExpandMoreIcon />
                          </ListItemAvatar>
                          <ListItemText>
                            <Typography>Lihat semua</Typography>
                          </ListItemText>
                        </>
                      )}
                    </ListItem>
                  </List>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            {/* {location.pathname === "/history" ? (
              <IconButton className={classes.menuButton} onClick={() => history.push("/")}>
                <ArrowBackIcon style={{color:"white"}}/>
              </IconButton>
            ) : location.pathname === "/profile/view" ? (
              <IconButton className={classes.menuButton} onClick={() => history.push("/")}>
                <ArrowBackIcon style={{color:"white"}}/>
              </IconButton>
            ) : (
              ""
            )} */}

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
                <Route path="/notification" exact children="Notification" />
                <Route path="/profile/view" exact children="User Profile" />
                <Route path="/menu/only/kontrakan" exact children="Kontrakan" />
                <Route path="/menu/only/kost" exact children="Kostan" />
                <Route
                  path="/view/penginapan/:checkoutId/proses"
                  exact
                  children="Tagihan"
                />
              </Switch>
              {/* LOGO TITLE */}
            </Typography>

            {/* icon logout */}

            {!user && (
              <IconButton color="inherit" component={Link} to={"/user/login"}>
                <AccountCircleIcon />
              </IconButton>
            )}
            <>
              <Tooltip title="Notifikasi">
                <IconButton
                  color="inherit"
                  aria-controls="simple-menu"
                  onClick={handleClick}
                >
                  <Badge badgeContent={jumlahNotifAll} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </>

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
                    width: 340,
                  },
                }}
              >
                {msgNotif.map((data) => {
                  const item = data.data();
                  const date = new Date(
                    item.created["seconds"] * 1000
                  ).toLocaleDateString();
                  return (
                    <MenuItem onClick={handleItemClose}>
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            {item.status === "Jatuh tempo pembayaran" ? (
                              <Avatar style={{ backgroundColor: red[500] }}>
                                <AttachMoneyIcon />
                              </Avatar>
                            ) : item.status === "Menunggu pembayaran" ||
                              item.status === "Menunggu perpanjangan" ? (
                              <Avatar style={{ backgroundColor: orange[500] }}>
                                <TimerIcon />
                              </Avatar>
                            ) : (
                              <Avatar style={{ backgroundColor: "#016660" }}>
                                <DoneIcon />
                              </Avatar>
                            )}
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  <Typography>
                                    {item.namaPenginapan} #{item.kodeBooking}
                                  </Typography>
                                  <Typography color="primary">
                                    {item.status ===
                                    "Jatuh tempo pembayaran" ? (
                                      <strong>
                                        <font color="red">{item.status}</font>
                                      </strong>
                                    ) : item.status === "Menunggu pembayaran" ||
                                      item.status ===
                                        "Menunggu perpanjangan" ? (
                                      <strong>
                                        <font color="orange">
                                          {item.status}
                                        </font>
                                      </strong>
                                    ) : (
                                      <strong>{item.status}</strong>
                                    )}
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                  >
                                    {date}
                                  </Typography>
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          {/* <ListItemText
                          primary={`Pesanan #${item.kodeBooking} berstatus ${item.status}`}
                          secondary={`${item.created}`}
                        /> */}
                        </ListItem>
                      </List>
                    </MenuItem>
                  );
                })}
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    history.push("/notification");
                  }}
                >
                  <List>
                    <ListItem>
                      {msgNotif.length === 0 ? (
                        <>
                          <ListItemAvatar>
                            <Avatar style={{ backgroundColor: orange[500] }}>
                              <ErrorOutlineIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText>
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              Belum ada data
                            </Typography>
                          </ListItemText>
                        </>
                      ) : (
                        <>
                          <ListItemAvatar>
                            <ExpandMoreIcon />
                          </ListItemAvatar>
                          <ListItemText>
                            <Typography>Lihat semua</Typography>
                          </ListItemText>
                        </>
                      )}
                    </ListItem>
                  </List>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      )}

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
            <Route path="/profile/view" exact component={UserView} />
            <Route path="/notification" component={Notification} />
            <Route path="/menu/only" component={IconMenu} />

            <Route component={HomeProduk} />
          </Switch>
        </Container>
        <div className={classes.appBarSpacer} />
      </main>
      {!isBrowser ? (
        <AppBar
          position="fixed"
          color="inherit"
          style={{
            top: "auto",
            bottom: 0,
          }}
        >
          <BottomNavigation
            value={value1}
            onChange={(event, newValue) => {
              setValue1(newValue);
            }}
            showLabels
            className={classes.bottomNav}
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon />}
              onClick={navigationTo("/")}
            />
            <BottomNavigationAction
              onClick={navigationTo("/history")}
              label="History"
              icon={
                <Badge badgeContent={jumlahPesanan} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              }
            />
            <BottomNavigationAction
              onClick={navigationTo("/profile/view")}
              label="Profile"
              icon={<AccountCircleIcon />}
            />
          </BottomNavigation>
          {/* <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          
        </Toolbar> */}
        </AppBar>
      ) : (
        ""
      )}
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
