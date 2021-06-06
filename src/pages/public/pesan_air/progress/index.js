import React from "react";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import useStyles from "./styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HistoryIcon from "@material-ui/icons/History";

// start
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";

// delivery
import MotorcycleOutlinedIcon from "@material-ui/icons/MotorcycleOutlined";

// sampai
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";

// import firebase package
import { useFirebase } from "../../../../components/FirebaseProvider";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

// progressBar
import AppPageLoading from "../../../../components/AppPageLoading";
import CheckIcon from "@material-ui/icons/Check";

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// membuat list item
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { currency } from "../../../../utils/formatter";
function ProgressAir({ history }) {
  const color = "#016660";
  const classes = useStyles();
  const { firestore, user } = useFirebase();
  const query = firestore
    .collection("airIsiUlang")
    .where("userId", "==", `${user.uid}`);
  const [snapshot, loading] = useDocument(query);
  const [item, setItem] = React.useState({});

  // history collection query
  const historyQUery = firestore.collection("historyAirIsiUlang");
  const [historySnapshot, historyLoading] = useCollection(historyQUery);
  const [historyData, setHistoryData] = React.useState([]);

  // fungsi untuk kembali ke halaman produk air isi ulang
  const kembaliKeProduk = () => {
    history.push("/pesan-air/detail");
  };

  // dialog
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // menampilkan fitur histori pesanan
  const historiClicked = () => {
    setOpen(true);
  };

  // load data melalui useEffect
  React.useEffect(() => {
    if (snapshot) {
      if (snapshot.docs[0] === undefined) {
        setItem({
          packing: false,
          delivery: false,
          sampai: false,
          selesai: false,
          pesananId: "Belum ada Pesanan",
        });
      } else {
        setItem(snapshot.docs[0].data());
      }
    }

    if (historySnapshot) {
      setHistoryData(historySnapshot.docs);
      console.log(historySnapshot.docs[0].data());
    }
  }, [snapshot, historySnapshot]);

  let progressPacking = item.packing;
  let progressDelivery = item.delivery;
  let progressSampai = item.sampai;
  let progressSelesai = item.selesai;

  // let progressPackingTime = item.packing;
  let progressPackingTime = item.waktuPacking
    ? new Date(item.waktuPacking).toLocaleTimeString()
    : "";
  let progressDeliveryTime = item.waktuDelivery
    ? new Date(item.waktuDelivery).toLocaleTimeString()
    : "";
  let progressSampaiTime = item.waktuSampai
    ? new Date(item.waktuSampai).toLocaleTimeString()
    : "";
  let progressSelesaiTime = item.waktuSelesai
    ? new Date(item.waktuSelesai).toLocaleTimeString()
    : "";

  // let progressPackingTime = item.waktuPacking;
  // let progressDeliveryTime = item.waktuDelivery;
  // let progressSampaiTime = item.waktuSampai;
  // let progressSelesaiTime = item.waktuSelesai;

  if (loading && historyLoading) {
    return <AppPageLoading />;
  }
  return (
    <>
      <Card className={classes.paper}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{ backgroundColor: color }}>
              {item.packing &&
              !item.sampai &&
              !item.delivery &&
              !item.selesai ? (
                <RepeatOutlinedIcon />
              ) : item.delivery &&
                item.packing &&
                !item.delivery &&
                !item.selesai ? (
                <MotorcycleOutlinedIcon />
              ) : item.sampai &&
                item.delivery &&
                item.packing &&
                !item.selesai ? (
                <FlagOutlinedIcon />
              ) : (
                <CheckIcon />
              )}
            </Avatar>
          }
          title={`Kode Pesanan #${item.pesananId}`}
          subheader={`#${new Date(item.tanggal).toUTCString()}`}
        />
        <CardContent>
          {loading ? (
            <AppPageLoading />
          ) : (
            <Timeline align="alternate">
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {progressPackingTime ? progressPackingTime : ""}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  {progressPacking ? (
                    <TimelineDot color="primary">
                      <RepeatOutlinedIcon />
                    </TimelineDot>
                  ) : (
                    <TimelineDot>
                      <RepeatOutlinedIcon />
                    </TimelineDot>
                  )}

                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {progressPacking ? (
                    <Paper elevation={3} className={classes.paper}>
                      <Typography variant="h6" component="h1">
                        Packing
                      </Typography>
                      <Typography>Air sedang diisi ulang</Typography>
                    </Paper>
                  ) : (
                    ""
                  )}
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {progressDelivery ? progressDeliveryTime : ""}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  {progressDelivery ? (
                    <TimelineDot color="primary">
                      <MotorcycleOutlinedIcon />
                    </TimelineDot>
                  ) : (
                    <TimelineDot>
                      <MotorcycleOutlinedIcon />
                    </TimelineDot>
                  )}

                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {progressDelivery ? (
                    <Paper elevation={3} className={classes.paper}>
                      <Typography variant="h6" component="h1">
                        Delivery
                      </Typography>
                      <Typography>Air isi ulang sedang diantar</Typography>
                    </Paper>
                  ) : (
                    ""
                  )}
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {progressSampai ? progressSampaiTime : ""}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  {progressSampai ? (
                    <TimelineDot color="primary">
                      <FlagOutlinedIcon />
                    </TimelineDot>
                  ) : (
                    <TimelineDot>
                      <FlagOutlinedIcon />
                    </TimelineDot>
                  )}

                  <TimelineConnector className={classes.secondaryTail} />
                </TimelineSeparator>
                <TimelineContent>
                  {progressSampai ? (
                    <Paper elevation={3} className={classes.paper}>
                      <Typography variant="h6" component="h1">
                        sampai
                      </Typography>
                      <Typography>Pengantar air sudah tiba</Typography>
                    </Paper>
                  ) : (
                    ""
                  )}
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {progressSelesai ? progressSelesaiTime : ""}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  {progressSelesai ? (
                    <TimelineDot color="primary">
                      <CheckIcon />
                    </TimelineDot>
                  ) : (
                    <TimelineDot>
                      <CheckIcon />
                    </TimelineDot>
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  {progressSelesai ? (
                    <Paper elevation={3} className={classes.paper}>
                      <Typography variant="h6" component="h1">
                        Selesai
                      </Typography>
                      <Typography>Pesanan berhasil diantarkan</Typography>
                    </Paper>
                  ) : (
                    ""
                  )}
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          )}
        </CardContent>
        <CardActions>
          <Button
            startIcon={<ArrowBackIcon />}
            size="medium"
            color="secondary"
            variant="contained"
            disableElevation
            onClick={kembaliKeProduk}
          >
            Kembali ke produk
          </Button>
          <Button
            startIcon={<HistoryIcon />}
            size="medium"
            color="primary"
            variant="contained"
            disableElevation
            onClick={historiClicked}
          >
            Histori Order
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Catatan Pemesanan Air</DialogTitle>
        <DialogContent>
          <List className={classes.root}>
            {historyData.map((data, index) => {
              const number = index + 1;
              const item = data.data();
              return (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: color }}>{number}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`#${item.pesananId} - ${currency(item.total)}`}
                    secondary={new Date(item.tanggal).toLocaleString()}
                  />
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProgressAir;
