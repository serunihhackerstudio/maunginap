import React, { useState, useEffect } from "react";
import { useFirebase } from "../../../components/FirebaseProvider";
import { usePesanan } from "../../../components/PesananProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { currency } from "../../../utils/formatter";
// React router
import { Link } from "react-router-dom";
import useStyles from "./styles";

// component
import AppPageLoading from "../../../components/AppPageLoading";
// import SwipeableTextMobileStepper from "../../../components/Slider";

// icon
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function HomeProduk() {
  const classes = useStyles();
  const { firestore } = useFirebase();
  const dataDoc = firestore
    .collection(`penginapan`)
    .doc("data")
    .collection("produk");
  const [snapshot, loading] = useCollection(dataDoc);
  const [produkItems, setProdukItems] = useState([]);
  const [valueKota, setKota] = React.useState("");
  const [valueJenisPenginapan, setJenisPenginapan] = React.useState("");
  const { jenisPenginapanOpt, kotaOpt } = usePesanan();

  // STATUS SUKA
  //
  // const { jumlahPesanan2, setJumlahPesanan2 } = useState();

  const [form, setForm] = useState({
    kota: "",
    jenisPenginapan: "",
  });
  console.log(setForm);

  useEffect(() => {
    if (snapshot) {
      setProdukItems(snapshot.docs);
      console.log(snapshot.docs);
    }
  }, [snapshot]);

  if (loading) {
    return <AppPageLoading />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      produkItems !== "" ||
      (valueKota !== "" && valueJenisPenginapan !== "")
    ) {
      await firestore
        .collection(`penginapan`)
        .doc("data")
        .collection("produk")
        .where("kota", "==", `${valueKota}`)
        .where("jenisPenginapan", "==", `${valueJenisPenginapan}`)
        .get()
        .then((data) => setProdukItems(data.docs));
    }
    if (valueKota === "" && valueJenisPenginapan === "") {
      await firestore
        .collection(`penginapan`)
        .doc("data")
        .collection("produk")
        .get()
        .then((data) => setProdukItems(data.docs));
    }

    if (valueKota !== "" && valueJenisPenginapan === "") {
      await firestore
        .collection(`penginapan`)
        .doc("data")
        .collection("produk")
        .where("kota", "==", `${valueKota}`)
        .get()
        .then((data) => setProdukItems(data.docs));
    }
    if (valueKota === "" && valueJenisPenginapan !== "") {
      await firestore
        .collection(`penginapan`)
        .doc("data")
        .collection("produk")
        .where("jenisPenginapan", "==", `${valueJenisPenginapan}`)
        .get()
        .then((data) => setProdukItems(data.docs));
    }
  };

  return (
    <>
      {/* SLIDER */}
      {/* <Container>
        <Card className={classes.root}>
          <CardActionArea>
            <SwipeableTextMobileStepper classMedia={classes.mediaPromotion} />
          </CardActionArea>
        </Card>
      </Container> */}

      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Maunginap ?
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          paragraph
          className={classes.descPromotion}
        >
          Di mana aja pasti bisa nginap dong dengan maunginap.com. Mau nginap di
          kost-kotan, kontrakan, penginapan resmi ? mau yang bulanan, harian,
          tahunan ? nggak perlu report dan ribet, pake aja maungingap.com.
        </Typography>
        <form id="produk-form" onSubmit={handleSubmit} noValidate>
          <div className={classes.heroButtons}>
            <Grid
              container
              spacing={2}
              justify="center"
              className={classes.rootGrid}
            >
              <Grid item>
                <Autocomplete
                  className={classes.comboLokasi}
                  value={form.kota}
                  onChange={(event, newValue) => {
                    form.kota = newValue;
                  }}
                  inputValue={valueKota}
                  onInputChange={(event, newInputValue) => {
                    setKota(newInputValue);
                  }}
                  name="kota"
                  options={kotaOpt}
                  style={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Kota" variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  className={classes.comboLokasi}
                  value={form.jenisPenginapan}
                  onChange={(event, newValue) => {
                    form.jenisPenginapan = newValue;
                  }}
                  inputValue={valueJenisPenginapan}
                  onInputChange={(event, newInputValue) => {
                    setJenisPenginapan(newInputValue);
                  }}
                  name="jenisPenginapan"
                  options={jenisPenginapanOpt}
                  style={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Jenis Penginapan"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Button
                  size="large"
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className={classes.btn}
                >
                  Cari
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </Container>

      {produkItems.length <= 0 && <AppPageLoading />}

      <Grid container spacing={5} className={classes.gridContainer}>
        {produkItems.map((produkDoc) => {
          const produkData = produkDoc.data();
          return (
            <Grid key={produkDoc.id} item={true} xs={12} xm={12} md={4} lg={4}>
              <Card className={classes.root}>
                <CardActionArea
                  component={Link}
                  to={`/view/penginapan/${produkDoc.id}`}
                >
                  <CardMedia
                    className={classes.media}
                    image={produkData.foto}
                    title="Contemplative Reptile"
                    alt="testing"
                  />
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {produkData.namaPenginapan}
                    </Typography>
                    <Typography variant="h6" gutterBottom color="primary">
                      {currency(produkData.harga)}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {produkData.lokasi}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    startIcon={<ExpandMoreIcon />}
                    color="primary"
                    component={Link}
                    to={`/view/penginapan/${produkDoc.id}`}
                  >
                    More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default HomeProduk;
