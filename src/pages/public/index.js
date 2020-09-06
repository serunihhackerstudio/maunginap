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
import { usePesanan } from "../../components/PesananProvider";
import { Divider } from "@material-ui/core";

// pages
import DetailProduk from "./produk/detail";
import Checkout from "./produk/checkout";
import Bayar from "./produk/bayar";
import HomeProduk from "./produk";
import Proses from "./produk/bayar/proses";
import History from "./produk/history";

function DetailBooking({ history, location }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { auth, user } = useFirebase();
  const [openDialog, setOpenDialog] = React.useState(false);
  const { jumlahPesanan } = usePesanan();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = (e) => {
    auth.signOut();
    window.location.reload();
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

          {/* icon logout */}

          {!user && (
            <IconButton color="inherit" component={Link} to={"/user/login"}>
              <AccountCircleIcon />
            </IconButton>
          )}

          {user && (
            <IconButton color="inherit" component={Link} to={"/history"}>
              <Badge badgeContent={jumlahPesanan} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}

          {user && (
            <IconButton color="inherit" onClick={handleOpenDialog}>
              <SignOutIcon />
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
              path="/view/penginapan/:penginapanId/proses"
              exact
              component={Proses}
            />
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
            <Route path="/history" component={History} />

            {/* <Route
              path="/view/penginapan/:checkoutId/proses/:prosesId"
              exact
              component={Proses}
            /> */}

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
          {"Konfirmasi Sign Out !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah Anda yakin ingin keluar / sign out dari akun Anda ?
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

export default DetailBooking;
