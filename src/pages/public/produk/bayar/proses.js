import React from "react";
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
import Grid from "@material-ui/core/Grid";
const Proses = ({ match }) => {
  const classes = useStyles();
  const { firestore } = useFirebase();
  const dataQuery = firestore
    .collection("pesanan")
    .doc(`${match.params.penginapanId}`);
  const [snapshot, loading] = useDocument(dataQuery);
  const { progressPembayaran } = usePesanan();
  const [activeStep, setActiveStep] = React.useState(3);

  React.useEffect(() => {
    if (snapshot) {
      console.log(snapshot.data());
    }
  }, [snapshot]);

  if (loading) {
    return <AppLoading message="Memproses pesanan..." />;
  }

  const steps = ["Shipping address", "Payment details", "Review your order"];

  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.headingCenter}>
          <Typography variant="h4" color="textSecondary">
            Menunggu Pross Pembayaran
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
              <ListItemText primary={progressPembayaran} />
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText primary="Bank" />
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.total}
              >
                {"Bank Mandiri KCP Jakarta Raya"}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText />
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.total}
              >
                {"a/n. Toufani Rizal Alfarisi"}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText
                primary="No. Rekening"
                secondary="Tujuan Transfer"
              />
              <Typography variant="h6" className={classes.total}>
                {"161-000-234-231"}
              </Typography>
            </ListItem>

            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography
                variant="h6"
                className={classes.total}
                color="primary"
              >
                {"Rp. 200.000"}
              </Typography>
            </ListItem>
          </List>
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.cekPesanan}
        >
          Cek Pesanan
        </Button>
      </Paper>
    </div>
  );
};

export default Proses;
