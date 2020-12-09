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
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const Proses = ({ match }) => {
  const ref = React.createRef();
  const classes = useStyles();
  const { firestore } = useFirebase();
  const dataQuery = firestore
    .collection("pesanan")
    .doc(`${match.params.penginapanId}`);
  const [snapshot, loading] = useDocument(dataQuery);
  const { progressPembayaran, formBank } = usePesanan();
  const [activeStep, setActiveStep] = React.useState(3);
  const [dataPesanan, setDataPesanan] = React.useState({});
  const nomorWA = "081-990-321-358";
  console.clear(setActiveStep)
  React.useEffect(() => {
    if (snapshot) {
      setDataPesanan(snapshot.data());
    }
  }, [snapshot]);

  if (loading) {
    return <AppLoading message="Memproses pesanan..." />;
  }

  if (!formBank.pilihBank) {
    return <Redirect to="/history" />;
  }

  const steps = ["Data", "Bayar", "Review"];
  const adminNumber = "+6281990321358";
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
              <ListItemText primary="Kode Booking" />
              <Typography
                variant="body1"
                color="primary"
                className={classes.total}
              >
                <strong>#{dataPesanan.kodeBooking}</strong>
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText primary="Bank" />
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.total}
              >
                {dataPesanan.pilihBank}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText />
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.total}
              >
                {`a/n ${dataPesanan.atasNama}`}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText
                primary="No. Rekening"
                secondary="Tujuan Transfer"
              />
              <Typography variant="h6" className={classes.total}>
                {dataPesanan.noRek}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography
                variant="h6"
                className={classes.total}
                color="primary"
              >
                {currency(parseInt(dataPesanan.harga) + dataPesanan.codeHarga)}
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
        <Tooltip title="Hubungi tim maunginap" aria-label="hubungiCs">
        <a href={`https://wa.me/${adminNumber}`} style={{textDecoration:"none"}}>
          <Button color="primary" variant="outlined" startIcon={<WhatsAppIcon />} className={classes.buttonGrid}>
            Maunginap
          </Button>
        </a>
      </Tooltip>
      </Paper>
    </div>
  );
};

export default Proses;
