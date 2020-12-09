import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { useFirebase } from "../../../../components/FirebaseProvider";
import { useDocument } from "react-firebase-hooks/firestore";

// react-router

import AppLoading from "../../../../components/AppLoading";

// styles
import useStyles from "./styles";

function Checkout({ match, history }) {
  const { firestore, user } = useFirebase();
  const produkDoc = firestore
    .collection("pesanan")
    .doc(`${match.params.checkoutId}`);
  const [snapshot, loading] = useDocument(produkDoc);
  const classes = useStyles();
  const [state, setState] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (snapshot) {
      setState(snapshot.data());
    }
  }, [snapshot]);

  function sleep(milliseconds) {
    setSubmitting(true);
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
    setSubmitting(false);
  }

  if (loading) {
    return <AppLoading message="Checkout" />;
  }
  const handleCheckout = async (e) => {
    e.preventDefault();

    await sleep(2000);

    history.push(`/view/penginapan/${user.uid}/checkout/bayar`);
  };

  return (
    <div>
      <TableContainer component={Paper} className={classes.paper}>
        <Typography variant="h5" color="textSecondary">
          Detail Pesanan
        </Typography>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell>Penginapan</TableCell>
              <TableCell align="center">Kode Booking</TableCell>
              <TableCell align="center">Jenis Iuran</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <img src={state.foto} width={150} alt="img2" />
              </TableCell>
              <TableCell component="th" scope="row">
                <Typography variant="body1">{state.namaPenginapan}</Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="body1">{state.kodeBooking}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">{state.jenisIuran}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">{state.harga}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Checkout;
