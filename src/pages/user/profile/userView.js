import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import HomeIcon from "@material-ui/icons/Home";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import LanguageIcon from "@material-ui/icons/Language";
import PersonIcon from "@material-ui/icons/Person";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DoneIcon from "@material-ui/icons/Done";
// data query
import { useDocument } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../../components/FirebaseProvider";
import SignOutIcon from "@material-ui/icons/ExitToApp";

// dialog/modal
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import ID from "../../../utils/idgenerator";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    margin: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#016660",
    height: theme.spacing(15),
    width: theme.spacing(15),
    margin: "auto",
  },
  divider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  btnSignOut: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
}));

export default function UserView({ history }) {
  const { user, firestore, auth } = useFirebase();
  const userQuery = firestore.collection("userbio").doc(`${user.uid}`);
  const [snapshot, loading] = useDocument(userQuery);
  const [item, setItem] = React.useState([]);
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogV, setOpenDialogV] = React.useState(false);
  // const id = ID();
  // const notifEmailVer = firestore.collection("notification").doc(`${user.uid}`);
  React.useEffect(() => {
    if (snapshot) {
      setItem(snapshot.data());
    }
  }, [snapshot]);

  const clear = true;
  if (!clear){
    console.clear(loading)
  }

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  // const sendEmailVerification = async (e) => {
  //   const actionCodeSettings = {
  //     url: `${window.location.origin}/profile/view`,
  //   };
  //   await user.sendEmailVerification(actionCodeSettings);
  //   enqueueSnackbar(`Email verifikasi telah dikirim ke ${user.email}`, {
  //     variant: "success",
  //   });
  // };

  const handleSignOut = (e) => {
    auth.signOut();
    window.location.reload();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialogV = async () => {
    setOpenDialogV(true);
    const actionCodeSettings = {
      url: `${window.location.origin}/profile/view`,
    };
    await user.sendEmailVerification(actionCodeSettings);
  };

  const handleCloseDialogV = () => {
    setOpenDialogV(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={() => history.push("/profile/user/info")}
            >
              <SettingsIcon />
            </IconButton>
          }
        />

        <CardContent>
          <Avatar className={classes.avatar} src={item.foto} />
          <Divider className={classes.divider} />
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#016660" }}>
                  <PersonIcon />
                </Avatar>
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
                      <Typography variant="body2" color="textSecondary">
                        Nama
                      </Typography>
                      <Typography color="primary">
                        <strong>
                          {user.displayName
                            ? user.displayName
                            : user.email.split("@")[0]}
                        </strong>
                      </Typography>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#016660" }}>
                  <AlternateEmailIcon />
                </Avatar>
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
                      <Typography variant="body2" color="textSecondary">
                        Email
                      </Typography>
                      <Typography color="primary">
                        <strong>{user.email}</strong>
                      </Typography>
                      <Typography>
                        {user.emailVerified ? (
                          <Chip
                            icon={<DoneIcon />}
                            label="Email verified"
                            //   onDelete={handleDelete}
                            color="primary"
                            size="small"
                          />
                        ) : (
                          <Chip
                            icon={<ErrorOutlineIcon />}
                            label="Klik untuk konfirmasi email"
                            onClick={handleOpenDialogV}
                            color="secondary"
                            size="small"
                            //
                          />
                        )}
                      </Typography>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#016660" }}>
                  <HomeIcon />
                </Avatar>
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
                      <Typography variant="body2" color="textSecondary">
                        Alamat
                      </Typography>
                      <Typography color="primary">
                        <strong>{item.alamat ? item.alamat : "-"}</strong>
                      </Typography>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#016660" }}>
                  <PhoneIphoneIcon />
                </Avatar>
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
                      <Typography variant="body2" color="textSecondary">
                        No. Telp/HP/WA
                      </Typography>
                      <Typography color="primary">
                        <strong>{item.telepon ? item.telepon : "-"}</strong>
                      </Typography>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "#016660" }}>
                  <LanguageIcon />
                </Avatar>
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
                      <Typography variant="body2" color="textSecondary">
                        Website
                      </Typography>
                      <Typography color="primary">
                        <strong>{item.website ? item.website : "-"}</strong>
                      </Typography>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </CardContent>
        <div className={classes.btnSignOut}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenDialog}
            startIcon={<SignOutIcon />}
          >
            Sign out
          </Button>
        </div>
      </Card>
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
          <Button onClick={handleSignOut} color="primary">
            Iya
          </Button>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Tidak
          </Button>
        </DialogActions>
      </Dialog>
      {/* MODAL / DIALOG */}

      {/* MODAL */}
      <Dialog
        open={openDialogV}
        onClose={handleCloseDialogV}
        aria-labelledby="alert-dialog-titleV"
        aria-describedby="alert-dialog-descriptionV"
      >
        <DialogTitle id="alert-dialog-titleV">{"Verifikasi Email"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Link verifikasi telah kami kirimkan ke Email Anda. Silahkan periksa
            email Anda untuk menyelesaikan verifikasi
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogV} color="primary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
      {/* MODAL */}
    </>
  );
}
