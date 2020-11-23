import React from "react";
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
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles";
import Box from "@material-ui/core/Box";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Divider from "@material-ui/core/Divider";
import { useFirebase } from "../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import { green, red, blue, orange } from "@material-ui/core/colors";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TimerIcon from "@material-ui/icons/Timer";
import DoneIcon from "@material-ui/icons/Done";
import MenuItem from "@material-ui/core/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Tooltip from "@material-ui/core/Tooltip";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

export default function Users({ history }) {
  const classes = useStyles();
  return (
    <>
      <div>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Tooltip title="Kembali" aria-label="kembali">
                <IconButton color="primary"
                  aria-label="Back icon"
                //   onClick={() => {
                //     history.goBack();
                //   }}
                >
                  <PeopleAltIcon />
                </IconButton>
              </Tooltip>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Datalog semua users"
            subheader="Registered users"
          />
          <CardContent>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#016660" }}>
                    {'t'.toUpperCase()}
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
                        <Typography>testing</Typography>
                        <Typography color="primary">
                            <strong>testing@gmail.com</strong>
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                          0813432983423
                        </Typography>
                      </Typography>
                    </React.Fragment>
                  }
                ></ListItemText>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
