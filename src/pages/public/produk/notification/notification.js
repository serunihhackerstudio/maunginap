import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { useFirebase } from "../../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import {  red, orange } from "@material-ui/core/colors";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TimerIcon from "@material-ui/icons/Timer";
import DoneIcon from "@material-ui/icons/Done";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from "@material-ui/core/Tooltip";

export default function Notification({history}) {
  const classes = useStyles();
  const { firestore, user } = useFirebase();

  const notifQuery = firestore
    .collection("notification")
    .where("userId", "==", `${user.uid}`);

  const [snapshot, loading] = useCollection(notifQuery);
  const [msgNotif, setMsgNotif] = React.useState([]);
  console.clear(loading)
  React.useEffect(() => {
    if (snapshot) {
      const notifData = snapshot.docs;
      notifData.sort((a, b) => b.data().created - a.data().created);
      setMsgNotif(notifData);
    }
  }, [snapshot]);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  return (
    <>
      
          <div>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  
                <Tooltip title="Kembali" aria-label="kembali">
                <IconButton
                  aria-label="Back icon"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
                  
                }

                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Datalog semua notifikasi"
                subheader="Recorded activities"
              />
              <CardContent>
                {msgNotif.map((data) => {
                  const item = data.data();
                  const date = new Date(item.created["seconds"] * 1000).toLocaleDateString()
                  return (
                    <List>
                      <ListItem alignItems="flex-start">
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
                                {item.status === "Jatuh tempo pembayaran" ? (
                                  <strong>
                                    <font color="red">{item.status}</font>
                                  </strong>
                                ) : item.status === "Menunggu pembayaran" ||
                                  item.status === "Menunggu perpanjangan" ? (
                                  <strong>
                                    <font color="orange">{item.status}</font>
                                  </strong>
                                ) : (
                                  <strong>{item.status}</strong>
                                )}
                              </Typography>
                              <Typography variant="subtitle2" color="textSecondary">
                                {date}
                              </Typography>
                            </Typography>
                          </React.Fragment>
                        }
                        ></ListItemText>

                        {/* <ListItemText
                          primary={`Pesanan #${item.kodeBooking} berstatus ${item.status}`}
                          secondary={`${item.created}`}
                        /> */}
                      </ListItem>
                    </List>
                  );
                })}


              </CardContent>
            </Card>
          </div>
    </>
  );
}
