import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
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
import { Link } from "react-router-dom";

import AppPageLoading from "../../../../components/AppPageLoading";

// styles
import useStyles from "./styles";
import { currency } from "../../../../utils/formatter";
import ID from "../../../../utils/idgenerator";

// rating
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

// snackbar
import { useSnackbar } from "notistack";

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import datanotfound from "../../../../assets/datanotfound.png";

// detect device
import { isBrowser } from "react-device-detect";

// send email
import { sendEmailJatuhTempo } from "../../../../config/mailserver";

function History({ match, history, location }) {

  const ratingId = ID();

  const { firestore, user } = useFirebase();

  const { enqueueSnackbar } = useSnackbar();

  const produkDoc = firestore
    .collection("pesanan")
    .where("userId", "==", user.uid);

  const idGenerator = ID();
  const notifData = firestore.collection("notification").doc(`${idGenerator}`);

  const [snapshot, loading] = useCollection(produkDoc);
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);
  const { setJumlahPesanan, setPesananId } = usePesanan();
  const [form, setForm] = useState({
    rating: "",
  });
  // const queryAll = firestore
  //   .collection("pesanan")
  //   .where("userId", "==", user.uid);

  // const [querySnapshot, queryLoading] = useCollection(queryAll);

  const [isNow, setNow] = useState(true);

  useEffect(() => {
    if (snapshot) {
      setState(snapshot.docs);
    }
  }, [snapshot]);

  setJumlahPesanan(state.length);

  const [open, setOpen] = React.useState(false);
  const [openBatalkanPesanan, setOpenBatalkanPesanan] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenBatalkanPesanan = () => {
    setOpenBatalkanPesanan(true);
  };

  const handleCloseBatalkanPesanan = () => {
    setOpenBatalkanPesanan(false);
  };

  const perpanjangCallback = (data) => (e) => {
    setPesananId(data.id);
    history.push(`/perpanjang/${data.id}`);
  };

  // batalkan pesanan handling callback
  const batalkanPesananCallback = (data) => async (e) => {
    // const total = parseInt(data.data().harga) + data.data().codeHarga;
    await firestore
      .collection("pesanan")
      .doc(`${data.id}`)
      .set({ statusPembatalan: true }, { merge: true });
    setOpenBatalkanPesanan(false);
    enqueueSnackbar("Pembatalan pesanan sedang diproses...", {
      variant: "info",
    });
  };

  const ratingHandling = (data) => async (e) => {
    setSubmitting(true);
    await firestore
      .collection("pesanan")
      .doc(`${data.id}`)
      .set({ ...form }, { merge: true });
    setOpen(false);

    // get data ratingA
    await firestore.collection("rating").doc(`${ratingId}`).set({
      rating: form.rating,
      penginapanId: data.data().penginapanId,
      id: ratingId,
    });
    enqueueSnackbar("Berhasil memberikan rating", { variant: "success" });
    setSubmitting(false);
  };

  if (loading) {
    return <AppPageLoading />;
  }

  return (
    <div>
      {state.length !== 0 ? (
        state.map((produk) => {
          const dataProduk = produk.data();
          const dateNow = new Date().toLocaleDateString();
          const diskon =
            dataProduk.harga - dataProduk.harga * (dataProduk.diskon / 100);
          if (
            dataProduk.approvalStatus &&
            dataProduk.tanggalBerakhir === dateNow &&
            isNow
          ) {
            notifData.set(
              {
                userId: user.uid,
                created: new Date(),
                status: "Jatuh tempo pembayaran",
                namaPenginapan: dataProduk.namaPenginapan,
                kodeBooking: dataProduk.kodeBooking,
              },
              { merge: false }
            );
            // kirim email saat jatuh tempo layanan
            sendEmailJatuhTempo(
              "Jatuh Tempo Pesanan",
              user.email,
              dataProduk.kodeBooking,
              dataProduk.namaPenginapan
            );
            setNow(false);
          }

          return (
            <Card className={classes.paper}>
              <Grid container className={classes.rowDivider} spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" color="textSecondary">
                    Kode booking
                  </Typography>
                  <Typography variant="body2" color="primary">
                    <strong>#{dataProduk.kodeBooking}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6} alignContent="center">
                  <Typography variant="body2" color="textSecondary">
                    Waktu ditempati
                  </Typography>
                  <Typography variant="body2" color="primary">
                    <strong>{dataProduk.tanggalPesan}</strong>
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
                  <ButtonBase
                    className={classes.image}
                    component={Link}
                    to={`/view/penginapan/${dataProduk.penginapanId}`}
                  >
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
                      <Typography
                        style={{ textDecoration: "none" }}
                        variant="body1"
                        color="primary"
                        component={Link}
                        to={`/view/penginapan/${dataProduk.penginapanId}`}
                      >
                        <strong>{dataProduk.namaPenginapan}</strong>
                      </Typography>
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
                                parseInt(dataProduk.harga) +
                                  dataProduk.codeHarga
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
                      <Dialog
                        disableBackdropClick={isSubmitting}
                        disableEscapeKeyDown={isSubmitting}
                        open={openBatalkanPesanan}
                        onClose={handleCloseBatalkanPesanan}
                        aria-labelledby="alert-dialog-batalkanPesanan"
                        aria-describedby="alert-dialog-batalkanPesanan-description"
                      >
                        <DialogTitle id="alert-dialog-batalkanPesanan">
                          {"Konfirmasi Pembatalan Pesanan"}
                        </DialogTitle>
                        <DialogContent>
                          <Typography
                            color="textSecondary"
                            varinat="body2"
                            align="justify"
                          >
                            Jika Anda membatalkan pesanan ini, maka kami akan
                            melakukan proses refund / pengembalian uang pesanan
                            Anda sesuai dengan nilai pesanan ke rekening Anda.
                            Apakah Anda tetap ingin refund / membatalkan pesanan
                            ini ?
                          </Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={batalkanPesananCallback(produk)}
                            color="primary"
                            autoFocus
                          >
                            Iya
                          </Button>
                          <Button
                            onClick={handleCloseBatalkanPesanan}
                            color="primary"
                            autoFocus
                          >
                            Tidak
                          </Button>
                        </DialogActions>
                      </Dialog>

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

                    {dataProduk.statusPembatalan ? (
                      <Grid container spacing={2}>
                        <Grid item>
                          <CircularProgress
                            disableShrink
                            color="secondary"
                            size={15}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Proses Refund...</strong>
                          </Typography>
                        </Grid>
                        <Grid item></Grid>
                      </Grid>
                    ) : dataProduk.statusPembatalanDesc ? (
                      <Typography variant="body1" color="secondary">
                        <font>
                          <strong>Refund Selesai</strong>
                        </font>
                      </Typography>
                    ) : (
                      <Typography variant="body1">
                        {dataProduk.approvalStatus ? (
                          <>
                            <font color="#016660">
                              <strong>
                                {dataProduk.approvalStatus &&
                                dataProduk.tanggalBerakhir === dateNow
                                  ? "Jatuh tempo"
                                  : "Siap ditempati"}
                              </strong>
                            </font>
                            <Typography variant="body2" color="secondary">
                              s/d. {dataProduk.tanggalBerakhir}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography variant="body2" color="textSecondary">
                              <Grid container spacing={2}>
                                <Grid item>
                                  <CircularProgress
                                    disableShrink
                                    color="primary"
                                    size={15}
                                  />
                                </Grid>
                                <Grid item>
                                  <strong>
                                    {dataProduk.statusPerpanjang
                                      ? "Menunggu perpanjangan..."
                                      : "Menunggu pembayaran..."}
                                  </strong>
                                </Grid>
                                <Grid item></Grid>
                              </Grid>
                            </Typography>
                          </>
                        )}
                      </Typography>
                    )}
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
                          disableBackdropClick={isSubmitting}
                          disableEscapeKeyDown={isSubmitting}
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
                                size="large"
                                name="rating-produk"
                                value={form.rating}
                                onChange={(event, newValue) => {
                                  setForm({ ...form, rating: newValue });
                                }}
                              />
                            </Box>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={ratingHandling(produk)}
                              color="primary"
                              autoFocus
                            >
                              Rating
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    ) : (
                      <Box
                        component="fieldset"
                        mb={2}
                        borderColor="transparent"
                      >
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
                      Actions
                    </Typography>
                    <Grid container>
                      <Grid item xs>
                        <Tooltip
                          title="Perpanjang pesanan"
                          aria-label="perpanjang"
                        >
                          <Button
                            className={classes.btn}
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={
                              dataProduk.approvalStatus &&
                              dataProduk.tanggalBerakhir === dateNow
                                ? false
                                : true
                            }
                            onClick={perpanjangCallback(produk)}
                          >
                            Perpanjang
                          </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item xs>
                        {dataProduk.approvalStatus &&
                        !dataProduk.statusPembatalanDesc && !(dataProduk.tanggalBerakhir === dateNow) ? (
                          <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            disabled={
                              dataProduk.statusPembatalan ? true : false
                            }
                            onClick={handleOpenBatalkanPesanan}
                          >
                            Refund
                          </Button>
                        ) : (
                          ""
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          );
        })
      ) : (
        <div>
          <Box display="flex" justifyContent="center" m={1} p={1}>
            <Box p={1}>
              <img src={datanotfound} width={350} height={250} alt="img history pesanan" />
            </Box>
          </Box>
        </div>
      )}
      {isBrowser ? (
        <Tooltip title="Kembali" aria-label="kembali">
          <Fab
            color="primary"
            className={classes.fab}
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBackIcon />
          </Fab>
        </Tooltip>
      ) : (
        ""
      )}
    </div>
  );
}

export default History;
