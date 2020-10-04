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
import { currency } from "../../../../utils/formatter";

const Proses = ({ match }) => {
  const classes = useStyles();
  const { firestore } = useFirebase();
  const dataQuery = firestore
    .collection("pesanan")
    .doc(`${match.params.penginapanId}`);
  const [snapshot, loading] = useDocument(dataQuery);
  const { progressPembayaran, formBank } = usePesanan();
  const [activeStep, setActiveStep] = React.useState(3);

  React.useEffect(() => {
    if (snapshot) {
      console.log(snapshot.data());
    }
  }, [snapshot]);

  if (loading) {
    return <AppLoading message="Memproses pesanan..." />;
  }

  console.log(setActiveStep);

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
          <List disablePadding>
            <ListItem className={classes.listItem}>
              <Typography variant="body1" align="justify">
                {progressPembayaran}
              </Typography>
            </ListItem>

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
                {currency(formBank.harga)}
              </Typography>
            </ListItem>
          </List>
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.cekPesanan}
          component={Link}
          to="/history"
        >
          Cek Pesanan
        </Button>
      </Paper>
    </div>
  );
};

export default Proses;
