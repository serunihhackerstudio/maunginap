import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "@material-ui/icons/Settings";

import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
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


// data query
import { useDocument } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../../components/FirebaseProvider";

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
}));

export default function UserView({history}) {
  const { user, firestore } = useFirebase();
  const userQuery = firestore.collection("userbio").doc(`${user.uid}`);
  const [snapshot, loading] = useDocument(userQuery);
  const [item, setItem] = React.useState([]);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (snapshot) {
      setItem(snapshot.data());
    }
  }, [snapshot]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <>
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={() => history.push("/profile/user/info")}>
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
                      <strong>{user.displayName ? user.displayName : "-"}</strong>
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
                      <strong>{item.telepon ? item.telepon : "-" }</strong>
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
    </Card>
    
    </>
  );
}
