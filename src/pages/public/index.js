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
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Badge from "@material-ui/core/Badge";
import Paper from "@material-ui/core/Paper";

// dialog/modal
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

// Icon
import HomeIcon from "@material-ui/icons/Home";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
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
import Search from "./produk/search";
import Tooltip from "@material-ui/core/Tooltip";

// mobile detector
import { isBrowser } from "react-device-detect";

import { useCollection } from "react-firebase-hooks/firestore";

// menu
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoodIcon from "@material-ui/icons/Mood";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

// colors
import {
  green,
  red,
  blue,
  orange,
  purple,
  lightBlue,
  teal,
  cyan,
  pink,
} from "@material-ui/core/colors";

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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Divider from "@material-ui/core/Divider";

// import usePesanan from PesananProvider
import { usePesanan } from "../../components/PesananProvider";
import IconLoading from "../../components/AppPageLoading/icon";

// searhing fiture
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
// import DirectionsIcon from '@material-ui/icons/Directions';

// searh Feature
import Fuse from "fuse.js";

function Home({ history, location, match }) {
  // use detailParam to get match params penginapanId from detail page
  const { detailParam, setSearchText } = usePesanan();

  const [value1, setValue1] = React.useState(0);
  // menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { auth, user, firestore } = useFirebase();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [jumlahPesanan, setJumlahPesanan] = React.useState(0);

  // searh functionality
  const [produkItemSearch, setProdukItemSearch] = React.useState([]);
  const produkQuery = firestore
    .collection(`penginapan`)
    .doc("data")
    .collection("produk");
  const [snapshotProdukQuery, loadingProdukQuery] = useCollection(produkQuery);
  //

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
  const [isSearchIconClicked, setSearchIconClicked] = React.useState(false);
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
    const storage = [];

    if (snapshotProdukQuery) {
      for (const item of snapshotProdukQuery.docs) {
        // console.log(item.id);
        storage.push(item.data());
      }
      setProdukItemSearch(storage);
    }
  }, [
    snapshot,
    snapshotNotif,
    snapshotNotifAll,
    userBioSnapshot,
    snapshotProdukQuery,
  ]);

  const clear = true;
  if (!clear) {
    console.clear(loadingNotif, loadingNotifAll, jumlahNotif);
    console.clear(userBioLoading, userBioItem);
    console.clear(setOpen);
    console.clear(loading, loadingProdukQuery, isSearchIconClicked);
  }

  const historyPesananCallback = () => {
    setJumlahPesanan(null);
    history.push("/history");
  };

  // const handleOpenDialog = () => {
  //   setOpenDialog(true);
  // };

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

  const colors = [
    green[500],
    red[500],
    blue[500],
    orange[500],
    purple[500],
    lightBlue[500],
    teal[500],
    cyan[500],
    pink[500],
  ];
  const colorIndex = Math.floor(Math.random() * colors.length); // returns a random integer from 0 to 10
  const list = (anchor) => (
    <div
      className={!isBrowser ? clsx(classes.fullList) : clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div>
          <ListItem
            // selected={props.match ? true : false}
            button
          >
            <ListItemIcon>
              {userBioLoading ? (
                <IconLoading />
              ) : (
                // <Avatar style={{backgroundColor:colors[colorIndex]}} className={classes.small} src={userBioItem.foto} alt="img" >
                //   <MoodIcon />
                //   </Avatar>
                <MoodIcon style={{ color: colors[colorIndex] }} />
              )}
            </ListItemIcon>

            {/* <ListItemText primary={`Hai ${user.email.split("@")[0]}`} color="primary"/> */}
            <Typography color={colors[colorIndex]}>
              Hai {user.email.split("@")[0]}
            </Typography>
          </ListItem>
        </div>
        <Divider />
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
    if (address === "/history") {
      historyPesananCallback();
    }
  };

  const [formSearch, setFormSearch] = React.useState({
    search: "",
  });

  const handleSearchChange = (e) => {
    setFormSearch({
      ...formSearch,
      [e.target.name]: e.target.value,
    });
    const options = {
      // isCaseSensitive: false,
      // includeScore: false,
      // shouldSort: true,
      // includeMatches: false,
      // findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      threshold: 0.5,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      keys: ["namaPenginapan", "lokasi", "jenisPenginapan", "harga"],
    };

    const fuse = new Fuse(produkItemSearch, options);
    // Change the pattern
    const pattern = `${e.target.value}`;
    setSearchText(fuse.search(pattern));
  };

  const handleSearch = () => {
    history.push("/search");
    setSearchIconClicked(true);
  };

  const handleBackSearch = () => {
    history.goBack();
    setSearchIconClicked(false);
  };

  return (
    <div className={classes.root}>
      {isBrowser ? (
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            {location.pathname === "/profile/user/info" ||
            location.pathname === "/profile/user/biodata" ? (
              <IconButton
                className={classes.goBackIcon}
                component={Link}
                to={"/profile/view"}
              >
                <ArrowBackIcon color="white" />
              </IconButton>
            ) : location.pathname === "/filter/kost" ||
              location.pathname === "/filter/kontrakan" ||
              location.pathname === "/filter/ruko" ? (
              <IconButton
                className={classes.goBackIcon}
                component={Link}
                to={"/"}
              >
                <ArrowBackIcon color="white" />
              </IconButton>
            ) : location.pathname === "/search" ? (
              <Paper className={classes.rootSearch}>
                <IconButton
                  className={classes.iconButtonSearch}
                  aria-label="menu"
                  onClick={handleBackSearch}
                >
                  <ArrowBackIcon />
                </IconButton>
                <InputBase
                  className={classes.inputSearch}
                  placeholder="Cari nama / lokasi / harga item"
                  name="search"
                  onChange={handleSearchChange}
                  value={formSearch.search}
                  inputProps={{ "aria-label": "search google maps" }}
                />
                {/* <IconButton type="submit" onClick={searchSubmitHandler} className={classes.iconButtonSearch} aria-label="search">
                  <SearchIcon />
                </IconButton> */}
                {/* <Divider className={classes.dividerSearch} orientation="vertical" /> */}
                {/* <IconButton color="primary" className={classes.iconButtonSearch} aria-label="directions">
                  <DirectionsIcon />
                </IconButton> */}
              </Paper>
            ) : (
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
            )}

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
                <Route path="/filter/kontrakan" exact children="Kontrakan" />
                <Route path="/filter/kost" exact children="Kostan" />
                <Route path="/filter/ruko" exact children="Ruko" />
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
              {location.pathname !== "/search" ? (
                <Tooltip title="Cari Data">
                  <IconButton
                    color="inherit"
                    aria-controls="simple-menu"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}

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
            {location.pathname === "/profile/user/info" ? (
              <IconButton
                className={classes.menuButton}
                onClick={() => history.push("/profile/view")}
              >
                <ArrowBackIcon style={{ color: "white" }} />
              </IconButton>
            ) : location.pathname === "/profile/user/biodata" ? (
              <IconButton
                className={classes.menuButton}
                onClick={() => history.push("/profile/view")}
              >
                <ArrowBackIcon style={{ color: "white" }} />
              </IconButton>
            ) : location.pathname === `/view/penginapan/${detailParam}` ? (
              <IconButton
                className={classes.menuButton}
                onClick={() => history.push("/")}
              >
                <ArrowBackIcon style={{ color: "white" }} />
              </IconButton>
            ) : location.pathname === `/filter/kost` ||
              location.pathname === `/filter/kontrakan` ||
              location.pathname === `/filter/ruko` ? (
              <IconButton
                className={classes.menuButton}
                onClick={() => history.push("/")}
              >
                <ArrowBackIcon style={{ color: "white" }} />
              </IconButton>
            ) : location.pathname === "/search" ? (
              <Paper className={classes.rootSearch}>
                <IconButton
                  className={classes.iconButtonSearch}
                  aria-label="menu"
                  onClick={handleBackSearch}
                >
                  <ArrowBackIcon />
                </IconButton>
                <InputBase
                  className={classes.inputSearch}
                  placeholder="Cari nama / lokasi / harga item"
                  name="search"
                  onChange={handleSearchChange}
                  value={formSearch.search}
                  inputProps={{ "aria-label": "search google maps" }}
                />
                {/* <IconButton type="submit" onClick={searchSubmitHandler} className={classes.iconButtonSearch} aria-label="search">
                  <SearchIcon />
                </IconButton> */}
                {/* <Divider className={classes.dividerSearch} orientation="vertical" /> */}
                {/* <IconButton color="primary" className={classes.iconButtonSearch} aria-label="directions">
                  <DirectionsIcon />
                </IconButton> */}
              </Paper>
            ) : (
              ""
            )}
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
                <Route path="/filter/kontrakan" exact children="Kontrakan" />
                <Route path="/filter/kost" exact children="Kostan" />
                <Route path="/filter/ruko" exact children="Ruko" />
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
              {location.pathname !== "/search" ? (
                <Tooltip title="Cari Data">
                  <IconButton
                    color="inherit"
                    aria-controls="simple-menu"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
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
            <Route path="/filter" component={IconMenu} />
            <Route path="/search" component={Search} />

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
              icon={<HomeOutlinedIcon />}
              onClick={navigationTo("/")}
            />
            <BottomNavigationAction
              onClick={navigationTo("/history")}
              label="History"
              icon={
                <Badge badgeContent={jumlahPesanan} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              }
            />
            <BottomNavigationAction
              onClick={navigationTo("/profile/view")}
              label="Profile"
              icon={<AccountCircleOutlinedIcon />}
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
