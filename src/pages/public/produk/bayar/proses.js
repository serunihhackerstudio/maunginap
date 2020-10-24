import React from "react";
import { Redirect, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import AppLoading from "../../../../components/AppLoading";
import { useFirebase } from "../../../../components/FirebaseProvider";
import { useDocument } from "react-firebase-hooks/firestore";
import Paper from "@material-ui/core/Paper";
import useStyles from "./style";
import { usePesanan } from "../../../../components/PesananProvider";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import { currency } from "../../../../utils/formatter";
import Pdf from "react-to-pdf";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import Fab from "@material-ui/core/Fab";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const Proses = ({ match }) => {
  const ref = React.createRef();
  const classes = useStyles();
  const { firestore } = useFirebase();
  const dataQuery = firestore
    .collection("pesanan")
    .doc(`${match.params.penginapanId}`);
  const [snapshot, loading] = useDocument(dataQuery);
  const { progressPembayaran, formBank, nomorWA } = usePesanan();
  const [activeStep, setActiveStep] = React.useState(3);

  React.useEffect(() => {
    if (snapshot) {
      
    }
  }, [snapshot]);

  if (loading) {
    return <AppLoading message="Memproses pesanan..." />;
  }

  if (!formBank.pilihBank) {
    return <Redirect to="/history" />;
  }

  const steps = ["Data", "Bayar", "Review"];

  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.headingCenter}>
          <Typography variant="h6" color="textSecondary">
            Menunggu Pembayaran
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div>
          <List disablePadding ref={ref} style={{ textAlign: "center" }}>
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
                {formBank.pilihBank}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText />
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.total}
              >
                {`a/n ${formBank.atasNama}`}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText
                primary="No. Rekening"
                secondary="Tujuan Transfer"
              />
              <Typography variant="h6" className={classes.total}>
                {formBank.noRek}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography
                variant="h6"
                className={classes.total}
                color="primary"
              >
                {currency(parseInt(formBank.harga) + formBank.codeHarga)}
              </Typography>
            </ListItem>
          </List>
        </div>
        <Tooltip title="Status pesanan">
        <Button
          variant="contained"
          color="primary"
          className={classes.cekPesanan}
          component={Link}
          to="/history"
        >
          Cek Pesanan
        </Button>
        </Tooltip>
        <Pdf targetRef={ref} filename="tagihan-pesanan.pdf">
          {({ toPdf }) => (
            <Tooltip title="Download tagihan ini">
            <Button
              className={classes.buttonGrid}
              variant="contained"
              color="secondary"
              onClick={toPdf}
              startIcon={<CloudDownloadIcon />}
            >
              Tagihan
            </Button>
            </Tooltip>
          )}
        </Pdf>
      </Paper>
      <a href="https://makeitation.com">
      <Tooltip title="Kembali" aria-label="kembali">
        <Fab
          color="primary"
          className={classes.fab}
        >
          <WhatsAppIcon />
        </Fab>
      </Tooltip>
      </a>
    </div>
  );
};

export default Proses;
