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
import Grid from "@material-ui/core/Grid";
import { CardMedia, CardActionArea, Card } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";

// react-hook
import { useFirebase } from "../../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import { usePesanan } from "../../../../components/PesananProvider";

// button
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// react-router
import { Link, Redirect } from "react-router-dom";

import AppLoading from "../../../../components/AppLoading";

// styles
import useStyles from "./styles";
import { currency } from "../../../../utils/formatter";
import Skeleton from "@material-ui/lab/Skeleton";

function History({ match, history, location }) {
  const { firestore, user } = useFirebase();

  const produkDoc = firestore
    .collection("pesanan")
    .where("userId", "==", user.uid);

  const [snapshot, loading] = useCollection(produkDoc);
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const { setJumlahPesanan, setPesananId } = usePesanan();

  useEffect(() => {
    if (snapshot) {
      setState(snapshot.docs);
      console.log("datanya history = " + snapshot.docs);
    }
  }, [snapshot]);
  console.log(setSubmitting);
  setJumlahPesanan(state.length);

  const perpanjangCallback = (data) => (e) => {
    setPesananId(data);
    history.push(`/perpanjang/${data}`);
  };

  const dataProdukIdCallback = (produk) => async (e) => {
    await firestore
      .collection("pesanan")
      .where("userId", "==", user.uid)
      .where("kodeBooking", "==", produk.id)
      .set(
        {
          statusPerpanjang: produk.data().statusPerpanjang,
        },
        {
          merge: true,
        }
      );
  };

  if (loading) {
    return <AppLoading message="History Pesanan" />;
  }

  return (
    <div>
      {state.map((produk) => {
        const dataProduk = produk.data();
        const dateNow = new Date().toLocaleDateString();
        // if (dataProduk.tanggalBerakhir === dateNow){
        //   dataProduk.approvalStatus = false
        //   dataProduk.statusPerpanjang = false
        //   dataProdukIdCallback(produk)
        // }
        return (
          <Card className={classes.paper}>
            <Grid container className={classes.rowDivider} spacing={2}>
              <Grid item xs>
                <Typography variant="body2" color="primary">
                  <strong>{dataProduk.jenisPenginapan}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ({dataProduk.kodeBooking})
                </Typography>
              </Grid>
              <Grid item xs={6} alignContent="center">
                <Typography variant="body2" color="textSecondary">
                  Waktu ditempati
                </Typography>
                <Typography variant="body2" color="primary">
                  {dataProduk.tanggalPesan}
                </Typography>
              </Grid>
              <Grid item xs className={classes.totalBayar}>
                <Typography variant="body2" color="textSecondary">
                  Total Pembayaran
                </Typography>
                {dataProduk.statusPerpanjang ?  (
                    <Typography variant="body2" color="primary">
                      <strong>(IDR) {currency(
                              dataProduk.harga -
                                dataProduk.harga * (dataProduk.diskon / 100)
                            )}
                      </strong>
                  </Typography>
                ) : (
                  <Typography variant="body2" color="primary">
                    <strong>(IDR) {currency(dataProduk.harga)}</strong>
                  </Typography>
                )}
                
                
              </Grid>
            </Grid>
            <Grid className={classes.rowDivider}>
              <Divider />
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      className={classes.media}
                      src={dataProduk.foto}
                    />
                  </CardActionArea>
                </ButtonBase>
              </Grid>
              <Grid item sm container>
                <Grid item xs>
                  <Grid item xs>
                    <Typography variant="body1" color="primary">
                      <strong>{dataProduk.namaPenginapan}</strong>
                    </Typography>
                    {/* {currency(dataProduk.harga - (dataProduk.harga * (dataProduk.diskon / 100)))} */}
                    {!dataProduk.statusPerpanjang ? (
                      <Typography variant="body2" gutterBottom>
                        (IDR) {currency(dataProduk.harga)}
                        <Typography variant="body2" color="textSecondary">
                          / {dataProduk.jenisIuran}
                        </Typography>
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        <Tooltip title={`Diskon ${dataProduk.diskon}%`}>
                          <del>(IDR) {currency(dataProduk.harga)}</del>
                        </Tooltip>
                        
                        <Typography variant="body2">
                          <Chip label={`disc. ${dataProduk.diskon}%`} color="primary" size="small"/>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          / {dataProduk.jenisIuran}
                        </Typography>
                      </Typography>
                    )}

                    <Typography variant="body2" color="textSecondary">
                      {state.deskripsi}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    color="textSecondary"
                  >
                    Status
                  </Typography>
                  <Typography variant="body1">
                    {dataProduk.approvalStatus ? (
                      <>
                        <font color="#016660">
                          <strong>Siap ditempati</strong>
                        </font>
                        <Typography variant="body2" color="error">
                          s/d. {dataProduk.tanggalBerakhir}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant="body2" color="textSecondary">
                          <Grid container spacing={2}>
                            <Grid item>
                              <CircularProgress color="primary" size={15} />
                            </Grid>
                            <Grid item>
                              <strong>
                                Menunggu pembayaran{" "}
                                {dataProduk.statusPerpanjang
                                  ? "perpanjangan"
                                  : ""}
                                ...
                              </strong>
                            </Grid>
                            <Grid item></Grid>
                          </Grid>
                        </Typography>
                      </>
                    )}
                  </Typography>
                </Grid>
                <Grid item xs className={classes.actionBtn}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    color="textSecondary"
                  >
                    Action
                  </Typography>
                  <Tooltip title="Perpanjang pesanan" aria-label="perpanjang">
                    <Button
                      className={classes.btn}
                      variant="contained"
                      color="primary"
                      disabled={
                        dataProduk.approvalStatus &&
                        dataProduk.tanggalBerakhir === dateNow
                          ? false
                          : true
                      }
                      onClick={perpanjangCallback(produk.id)}
                    >
                      Perpanjang
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>

              <Grid item></Grid>
            </Grid>
          </Card>
        );
      })}
      <Tooltip title="Kembali" aria-label="kembali">
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => {
            // history.goBack();
            history.push("/");
          }}
        >
          <ArrowBackIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default History;

/*
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
                      {dateBooking.toLocaleString().toString()}
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
*/
