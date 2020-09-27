import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useDocument } from "react-firebase-hooks/firestore";
import SendIcon from "@material-ui/icons/Send";
import ButtonBase from "@material-ui/core/ButtonBase";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import AppLoading from "../../../../components/AppLoading";
import { currency } from "../../../../utils/formatter";
import { useSnackbar } from "notistack";

// import dialog booking
import { CardMedia, CardActionArea, Card } from "@material-ui/core";
// import context
import { useFirebase } from "../../../../components/FirebaseProvider";
import { usePesanan } from "../../../../components/PesananProvider";

function DetailProduk({ match, history, location }) {
  const { firestore } = useFirebase();
  const produkDoc = firestore
    .collection("penginapan")
    .doc("data")
    .collection("produk")
    .doc(`${match.params.penginapanId}`);
  const [snapshot, loading] = useDocument(produkDoc);
  const [state, setstate] = React.useState({});
  const [jenisIuran, setJenisIuran] = React.useState("");
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { setFormPesanan } = usePesanan();

  // variable untuk membuat logic tombol suka
  const [isSuka, setSuka] = React.useState(false);
  const [idSuka, setIdSuka] = React.useState("");
  const { user } = useFirebase();
  const dataLikePath = firestore.collection("user");

  const isDataLikePath = firestore
    .collection("user")
    .where("user", "==", user.uid)
    .where("penginapanId", "==", match.params.penginapanId);

  const [snapshotSuka, loadingSuka] = useDocument(isDataLikePath);
  // const likeDb = firestore.collection("datastore").doc("suka");
  //

  // status reserveed
  const [isReserved, setReserved] = React.useState(false);
  const dataReserved = firestore
    .collection("user")
    .doc(`${user.uid}`)
    .collection("pesanan")
    .doc(`${match.params.penginapanId}`);
  const [snapshotReserved, loadingReserved] = useDocument(dataReserved);

  console.log(loadingSuka, loadingReserved);
  React.useEffect(() => {
    if (snapshot) {
      setstate(snapshot.data());
    }
    if (snapshotSuka) {
      try {
        setSuka(snapshotSuka.docs[0].data());
        setIdSuka(snapshotSuka.docs[0].id);
        console.log(snapshotSuka.docs[0]);
      } catch (e) {
        console.log(e.message);
      }
    }
    if (snapshotReserved) {
      setReserved(snapshotReserved.data());
    }
  }, [snapshot, snapshotSuka, snapshotReserved]);

  if (loading) {
    return <AppLoading message="Memuat Data..." />;
  }

  const handleOpenDialog = () => {
    if (jenisIuran === "") {
      enqueueSnackbar("'Jenis iuran' tidak boleh kosong ", {
        variant: "error",
      });
    } else {
      const harga = jenisIuran === "Tahunan" ? state.harga * 12 : state.harga;
      setFormPesanan({
        jenisIuran,
        namaPenginapan: state.namaPenginapan,
        harga,
        foto: state.foto,
      });
      history.push(`/view/penginapan/${match.params.penginapanId}/checkout`);
    }
  };

  const handleChange = (e) => {
    setJenisIuran(e.target.value);
  };

  // handling untuk tombol like
  const handleLikeButton = async (e) => {
    // fungsi untuk menambah data suka pada produk
    if (user)
      try {
        await dataLikePath.add({
          suka: true,
          penginapanId: match.params.penginapanId,
          user: user.uid,
        });
      } catch (e) {
        enqueueSnackbar(e.message, { variant: "error" });
      }
  };

  const handleDisLikeButton = async (e) => {
    // fungsi untuk menambah data suka pada produk
    try {
      await dataLikePath.doc(idSuka).delete();
      setSuka(false);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  console.log(isSuka);

  return (
    <div>
      <Card className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <CardMedia image={state.foto} />
              <CardActionArea>
                <CardMedia
                  component="img"
                  className={classes.media}
                  src={state.foto}
                />
              </CardActionArea>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5" color="primary">
                  {state.namaPenginapan}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {currency(state.harga)}
                  <Typography variant="body1" color="textSecondary">
                    / bulan
                  </Typography>
                </Typography>

                <Button
                  onClick={handleOpenDialog}
                  startIcon={<SendIcon />}
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  disabled={isReserved ? true : false}
                >
                  {isReserved ? "Soldout" : "Pesan"}
                </Button>
                <ButtonBase>
                  <FormControl className={classes.formControl} required>
                    <InputLabel id="demo-simple-select-label">
                      Jenis iuran
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="jenisIuran"
                      value={jenisIuran}
                      onChange={handleChange}
                    >
                      <MenuItem value={"Bulanan"}>Bulanan</MenuItem>
                      <MenuItem value={"Tahunan"}>Tahunan</MenuItem>
                    </Select>
                  </FormControl>
                </ButtonBase>
                <Typography variant="body2" gutterBottom color="textSecondary">
                  {state.lokasi}
                </Typography>
                <Typography variant="body2">Deskripsi : </Typography>
                <Typography variant="body2" color="textSecondary">
                  {state.deskripsi}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              {/* <h2>{JSON.stringify(userId)}</h2> */}
              <Typography variant="subtitle1">
                {!isSuka && (
                  <IconButton
                    aria-label="add to favorites"
                    onClick={handleLikeButton}
                  >
                    <FavoriteIcon color="disable" />
                  </IconButton>
                )}
                {isSuka && (
                  <IconButton
                    aria-label="add to favorites"
                    onClick={handleDisLikeButton}
                  >
                    <FavoriteIcon color="secondary" />
                  </IconButton>
                )}

                <IconButton aria-label="add to favorites">
                  <ShareIcon />
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIcon />
      </Fab>

      {/* <DialogBooking
        open={aktivasiDialog}
        handleClose={handleCloseDialog}
        jenisIuran={jenisIuran}
        namaPenginapan={state.namaPenginapan}
        harga={jenisIuran === "Tahunan" ? state.harga * 12 : state.harga}
        jenisIursan={jenisIuran}
        foto={state.foto}
      /> */}
    </div>
  );
}
export default DetailProduk;
