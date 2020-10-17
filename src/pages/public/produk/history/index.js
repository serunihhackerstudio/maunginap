import React, { useState, useEffect, useRef } from "react";
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
import ID from "../../../../utils/idgenerator";
import Skeleton from "@material-ui/lab/Skeleton";

// rating
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

// snackbar
import { useSnackbar } from "notistack";

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function History({ match, history, location }) {
  const ratingRef = useRef();

  const ratingId = ID()

  const { firestore, user } = useFirebase();

  const { enqueueSnackbar } = useSnackbar();

  const produkDoc = firestore
    .collection("pesanan")
    .where("userId", "==", user.uid);

  const [snapshot, loading] = useCollection(produkDoc);
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const { setJumlahPesanan, setPesananId } = usePesanan();
  const [form, setForm] = useState({
    rating: "",
  });

  // const [querySnapshot, queryLoading] = useCollection(queryAll);

  useEffect(() => {
    if (snapshot) {
      setState(snapshot.docs);
    }
  }, [snapshot]);
  setJumlahPesanan(state.length);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const ratingArray = []
  const [ratingArrayLs, setRatingArrayLs] = useState(0);
  const [ratingCount, setRatingCount] = useState(0)
  const ratingHandling = (data) => async (e) => {
    await firestore
      .collection("pesanan")
      .doc(`${data.id}`)
      .set({ ...form }, { merge: true });
    setOpen(false);

    // get data ratingA
    await firestore.collection("rating").doc(`${ratingId}`).set({
      rating:form.rating,
      penginapanId:data.data().penginapanId,
      id:ratingId
    })

    // .doc(`${data.data().penginapanId}`)
    // .get().then(data => {
    //   setRatingArrayLs(data.data().rating)
    //   setRatingCount(data.data().ratingCount)
    // })

    // // update data ratingA
    // await firestore.collection("penginapan").doc("data").collection("produk")
    // .doc(`${data.data().penginapanId}`)
    // .set({rating:form.rating + ratingArrayLs, ratingCount:ratingCount+1}, {merge:true})
    

    enqueueSnackbar("Berhasil memberikan rating", { variant: "success" });

  };

  // const queryRating = (pesananId) => async (e) => {
  //   await firestore
  //     .collection("pesanan")
  //     .doc(`${pesananId}`)
  //     .get()
  //     .then((data) => setForm({ rating: data.data().rating }));
  // };

  if (loading) {
    return <AppLoading message="History Pesanan" />;
  }

  return (
    <div>
      {state.map((produk) => {
        const dataProduk = produk.data();
        const dateNow = new Date().toLocaleDateString();
        const diskon =
          dataProduk.harga - dataProduk.harga * (dataProduk.diskon / 100);

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
                {dataProduk.statusPerpanjang ? (
                  <Typography variant="body2" color="primary">
                    <strong>
                      (IDR) {currency(diskon + dataProduk.codeHarga)}
                    </strong>
                  </Typography>
                ) : (
                  <Typography variant="body2" color="primary">
                    <strong>
                      (IDR){" "}
                      {currency(
                        parseInt(dataProduk.harga) + dataProduk.codeHarga
                      )}
                    </strong>
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
                        (IDR){" "}
                        {currency(
                          parseInt(dataProduk.harga) + dataProduk.codeHarga
                        )}
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
                          <del>
                            (IDR){" "}
                            {currency(
                              parseInt(dataProduk.harga) + dataProduk.codeHarga
                            )}
                          </del>
                        </Tooltip>

                        <Typography variant="body2">
                          <Chip
                            label={`disc. ${dataProduk.diskon}%`}
                            color="primary"
                            size="small"
                          />
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
                <Grid item>
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
                <Grid item xs className={classes.rating}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    color="textSecondary"
                  >
                    Berikan rating
                  </Typography>
                  {dataProduk.rating === 0 ? (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClickOpen}
                      >
                        Rate !
                      </Button>
                      <Dialog
                        // disableBackdropClick={isSubmitting}
                        // disableEscapeKeyDown={isSubmitting}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Berikan Rating"}
                        </DialogTitle>
                        <DialogContent>
                          <Box
                            component="fieldset"
                            mb={2}
                            borderColor="transparent"
                          >
                            <Rating
                              name="rating-produk"
                              value={form.rating}
                              onChange={(event, newValue) => {
                                setForm({ ...form, rating: newValue });
                              }}
                              // onCl
                            />
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={ratingHandling(produk)}
                            color="primary"
                            autoFocus
                          >
                            Berikan rating
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  ) : (
                    <Box component="fieldset" mb={2} borderColor="transparent">
                      <Rating
                        name="rating-produk"
                        value={dataProduk.rating}
                        readOnly
                      />
                    </Box>
                  )}
                  <div className={classes.rating}>{/* dialog */}</div>
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
