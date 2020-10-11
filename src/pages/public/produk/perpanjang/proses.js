import React from "react";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";


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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Redirect, Link } from "react-router-dom";

import { usePesanan } from "../../../../components/PesananProvider";
import { useDocument } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../../../components/FirebaseProvider";
import { useSnackbar } from "notistack";
import useStyles from "./styles"
import {currency} from "../../../../utils/formatter"

export default function ProsesPerpanjang({ history, match }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { progressPembayaran, nomorWA } = usePesanan();
  const { akunBank, pesananId } = usePesanan();
  const { firestore } = useFirebase();
  const query = firestore
    .collection("pesanan")
    .doc(`${match.params.penginapanId}`);
  const [snapshot, loading] = useDocument(query);
  const [form, setForm] = React.useState({})
  React.useEffect(() => {
    if (snapshot) {
      setForm(snapshot.data());
    }
  }, [snapshot]);

  return (
    <>
      <Card className={classes.rootProses}>
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
          title={form.namaPenginapan}
          subheader={"s/d. " + form.tanggalBerakhir}
        />
        {/* <CardMedia className={classes.media} image={form.foto} /> */}
        <CardContent>

          {/* PROSES */}
        <div className={classes.headingCenter}>
          <Typography variant="h6" color="textSecondary">
            Menunggu Pembayaran Perpanjangan
          </Typography>
          {/* <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
        </div>
        <div>
          <List disablePadding>
            <ListItem className={classes.listItem}>
              <Typography variant="body1" align="justify">
                {progressPembayaran}
              </Typography>
            </ListItem>

            

            <ListItem className={classes.listItem}>
              <ListItemText primary="Nomor WA" />
              <Typography
                variant="subtitle1"
                color="primary"
                className={classes.total}
              >
                <strong>{nomorWA}</strong>
              </Typography>
            </ListItem>
            <Divider variant="middle" />
            <ListItem className={classes.listItem}>
              <ListItemText primary="Bank" />
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.total}
              >
                {form.pilihBank}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText />
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.total}
              >
                {`a/n ${form.atasNama}`}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText
                primary="No. Rekening"
                secondary="Tujuan Transfer"
              />
              <Typography variant="h6" className={classes.total}>
                {form.noRek}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography
                variant="h6"
                className={classes.total}
                color="primary"
              >
                {currency(form.harga)}
              </Typography>
            </ListItem>
          </List>
        </div>

        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            color="primary"
            className={classes.btnLeft}
            type="submit"
            component={Link}
            to={"/history"}
          >
            Lihat Status
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
