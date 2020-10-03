import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// react-hook
import { useFirebase } from "../../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import { usePesanan } from "../../../../components/PesananProvider";

// button
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// react-router
import { Link } from "react-router-dom";

import AppLoading from "../../../../components/AppLoading";

// styles
import useStyles from "./styles";
import { currency } from "../../../../utils/formatter";

function History({ match, history, location }) {
  const { firestore, user } = useFirebase();

  const produkDoc = firestore
    .collection("pesanan")
    .where("userId", "==", user.uid);

  const [snapshot, loading] = useCollection(produkDoc);
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const { setJumlahPesanan } = usePesanan();

  useEffect(() => {
    if (snapshot) {
      setState(snapshot.docs);
      console.log("datanya history = " + snapshot.docs);
    }
  }, [snapshot]);
  console.log(setSubmitting);
  setJumlahPesanan(state.length);

  // function sleep(milliseconds) {
  //   setSubmitting(true);
  //   const date = Date.now();
  //   let currentDate = null;
  //   do {
  //     currentDate = Date.now();
  //   } while (currentDate - date < milliseconds);
  //   setSubmitting(false);
  // }

  if (loading) {
    return <AppLoading message="Checkout" />;
  }
  // const handleCheckout = async (e) => {
  //   e.preventDefault();

  //   await sleep(2000);

  //   history.push(`/view/penginapan/${user.uid}/checkout/bayar`);
  // };

  console.log(isSubmitting);

  return (
    <div>
      <TableContainer component={Paper} className={classes.paper}>
        <Typography variant="h5" color="textSecondary">
          History Pesanan
        </Typography>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell>Penginapan</TableCell>
              <TableCell align="center">Tanggal Pesan</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Status Pembayaran</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((produk) => {
              const dataProduk = produk.data();
              const dateBooking = new Date(
                produk.data().tanggalPesan["seconds"] * 1000
              );
              return (
                <TableRow>
                  <TableCell align="center">
                    <a href={`${dataProduk.foto}`}>
                      <img
                        aria-hidden
                        alt={`image${dataProduk.namaPenginapan}`}
                        src={dataProduk.foto}
                        width={150}
                      />
                    </a>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="body1"
                      component={Link}
                      to={`/view/penginapan/${produk.data().penginapanId}`}
                    >
                      {dataProduk.namaPenginapan}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      {JSON.stringify(dateBooking.toLocaleString())}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      {currency(dataProduk.harga)} / {dataProduk.jenisIuran}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      {dataProduk.approvalStatus ? (
                        <Button color="primary" variant="outlined">
                          Siap Ditempati
                        </Button>
                      ) : (
                        <>
                          <Typography
                            color="textSecondary"
                            className={classes.waiting}
                          >
                            Menunggu Pembayaran...
                          </Typography>{" "}
                          <br /> <CircularProgress color="primary" />
                        </>
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIcon />
      </Fab>
    </div>
  );
}

export default History;
