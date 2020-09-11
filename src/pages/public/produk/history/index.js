import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { useFirebase } from "../../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import { usePesanan } from "../../../../components/PesananProvider";
// react-router

import AppLoading from "../../../../components/AppLoading";

// styles
import useStyles from "./styles";
import { currency } from "../../../../utils/formatter";

function History({ match, history, location }) {
  const { firestore, user } = useFirebase();

  const produkDoc = firestore
    .collection("user")
    .doc(`${user.uid}`)
    .collection("pesanan");

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
              <TableCell align="center">Jenis Iuran</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Status Pembayaran</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.map((produk) => {
              const dataProduk = produk.data();
              return (
                <TableRow>
                  <TableCell align="center">
                    <img
                      alt={`image${dataProduk.namaPenginapan}`}
                      src={dataProduk.foto}
                      width={150}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1">
                      {dataProduk.namaPenginapan}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      {dataProduk.jenisIuran}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      {currency(dataProduk.harga)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">Menunggu pembayaran</Typography>
                  </TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default History;
