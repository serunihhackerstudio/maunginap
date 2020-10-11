import React, { useState, useEffect, useRef } from "react";
import { useFirebase } from "../../../components/FirebaseProvider";
import { usePesanan } from "../../../components/PesananProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import SwipeableTextMobileStepper from "../../../components/Slider";

// icon
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Skeleton from "@material-ui/lab/Skeleton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Chip from '@material-ui/core/Chip';


// import datanotfound from "../../../assets/datanotfound.png";

/*
Fitur untuk autoscroll view
@function body
const el = useRef(null);

@useEffect
el.current.scrollIntoView({ block: "end", behavior: "smooth" });

@HTML
  id={"el"}
  ref={el}
*/

function HomeProduk() {
  const { firestore } = useFirebase();
  const kotaOpt = [];
  const kotaData = [];
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  const kotaQuery = firestore.collection("kota");
  const [kotaSnapshot, kotaLoading] = useCollection(kotaQuery);

  const classes = useStyles();
  const defaultNumPage = 5;
  const [numPage, setNumPage] = useState(defaultNumPage);
  const dataDoc = firestore
    .collection(`penginapan`)
    .doc("data")
    .collection("produk")
    .orderBy("created", "desc")
    .limit(numPage);

  const dataDocMax = firestore
    .collection(`penginapan`)
    .doc("data")
    .collection("produk");
  const [snapshot, loading] = useCollection(dataDoc);
  const [produkItems, setProdukItems] = useState([]);
  const [valueKota, setKota] = React.useState("");
  const [valueJenisPenginapan, setJenisPenginapan] = React.useState("");
  const { jenisPenginapanOpt } = usePesanan();

  const [success, setSuccess] = React.useState(false);
  const [loadingBtn, setLoading] = React.useState(false);

  // hilangkan fab ketika tombol search diaktifkan
  const [searchingActivate, setSearchingActivate] = useState(false);

  const timer = React.useRef();

  const [form, setForm] = useState({
    kota: "",
    jenisPenginapan: "",
  });

  const el = useRef(null);
  const [isNextClicked, setNextClicked] = useState(false);

  useEffect(() => {
    if (snapshot) {
      setProdukItems(snapshot.docs);
      if (isNextClicked) {
        el.current.scrollIntoView({ block: "end", behavior: "smooth" });
      }

    
    }

    if (kotaSnapshot) {
      kotaSnapshot.docs.forEach((data) => {
        kotaData.push(data.data().kota);
        console.log(data.data().kota);
      });
      setOptions(kotaData);
    }
    clearTimeout(timer.current);
  }, [snapshot, isNextClicked, kotaSnapshot]);

  const [maxData, setMaxData] = useState(0);
  dataDocMax.get().then((data) => setMaxData(data.docs.length));

  const loadNextData = (e) => {
    e.preventDefault();
    setNextClicked(true);
    setNumPage(numPage + defaultNumPage);
  };

  // React.useEffect(() => {
  //   return () => {
  //     clearTimeout(timer.current);
  //   };
  // }, []);

  // if (loading) {
  //   return <AppPageLoading />;
  // }

  const handleSubmit = async (e) => {
    setSearchingActivate(true);
    e.preventDefault();
    if (!loadingBtn) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 1500);
    }
    if (produkItems !== "" || (value !== "" && valueJenisPenginapan !== "")) {
      await firestore
        .collection(`penginapan`)
        .doc("data")
        .collection("produk")
        .where("kota", "==", `${value}`)
        .where("jenisPenginapan", "==", `${valueJenisPenginapan}`)
        .get()
        .then((data) => setProdukItems(data.docs));
    }
    if (form.kota === "" && valueJenisPenginapan === "") {
      console.log("TANPA KOTA DAN JENIS");
      await firestore
        .collection(`penginapan`)
        .doc("data")
        .collection("produk")
        .orderBy("created", "desc")
        .limit(numPage)
        .get()
        .then((data) => setProdukItems(data.docs));
      setSearchingActivate(false);
    }

    if (form.kota !== "" && valueJenisPenginapan === "") {
      await firestore
        .collection(`penginapan`)
        .doc("data")
        .collection("produk")
        .where("kota", "==", `${form.kota}`)
        .get()
        .then((data) => setProdukItems(data.docs));
      form.kota = "";
    }
    if (form.kota === "" && valueJenisPenginapan !== "") {
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
      {loading ? (
        <Container className={classes.root}>
          <Skeleton animation="wave" height={260} width="100%" variant="rect" />
        </Container>
      ) : (
        <Container>
          <Card className={classes.root}>
            <CardActionArea>
              <SwipeableTextMobileStepper classMedia={classes.mediaPromotion} />
            </CardActionArea>
          </Card>
        </Container>
      )}

      <Container maxWidth="sm">
        {loading ? (
          <Skeleton animation="wave" height={100} width="100%" variant="text" />
        ) : (
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Maunginap ?
          </Typography>
        )}

        {loading ? (
          <>
            <Skeleton
              animation="wave"
              height={20}
              width="100%"
              variant="text"
            />
            <Skeleton
              animation="wave"
              height={20}
              width="100%"
              variant="text"
            />
            <Skeleton
              animation="wave"
              height={20}
              width="100%"
              variant="text"
            />
          </>
        ) : (
          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            paragraph
            className={classes.descPromotion}
          >
            Di mana aja pasti bisa nginap dong dengan maunginap.com. Mau nginap
            di kost-kotan, kontrakan, penginapan resmi ? mau yang bulanan,
            harian, tahunan ? nggak perlu report dan ribet, pake aja
            maungingap.com.
          </Typography>
        )}
        {loading ? (
          <Skeleton animation="wave" height={80} width="100%" />
        ) : (
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
                      setValue(newValue);
                      setForm({ kota: newValue });
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                      setForm({ kota: newInputValue });
                    }}
                    name="kota"
                    options={options}
                    getOptionLabel={(option) => option}
                    style={{ width: 200 }}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          name="kota"
                          label="Kota"
                          variant="outlined"
                        />
                      );
                    }}
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
                    disabled={loadingBtn}
                  >
                    {loadingBtn ? (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    ) : (
                      "Cari"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        )}
      </Container>

      {/* {produkItems.length === 0 && (
        <div className={classes.textNoFound}>
          <img src={datanotfound} width={350} alt="Data not found" />
        </div>
      )} */}
      {produkItems.length <= 0 && (
        <Grid container spacing={5} className={classes.gridContainer}>
          <Grid item={true} xs={12} xm={12} md={4} lg={4}>
            <Card className={classes.root}>
              <CardActionArea component={Link}>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  className={classes.media}
                />

                <CardContent>
                  <Skeleton animation="wave" height={35} width="100%" />

                  <Skeleton animation="wave" height={30} width="100%" />

                  <Skeleton animation="wave" height={35} width="100%" />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Skeleton animation="wave" height={35} width="30%" />
              </CardActions>
            </Card>
          </Grid>
          <Grid item={true} xs={12} xm={12} md={4} lg={4}>
            <Card className={classes.root}>
              <CardActionArea component={Link}>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  className={classes.media}
                />

                <CardContent>
                  <Skeleton animation="wave" height={35} width="100%" />

                  <Skeleton animation="wave" height={30} width="100%" />

                  <Skeleton animation="wave" height={35} width="100%" />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Skeleton animation="wave" height={35} width="30%" />
              </CardActions>
            </Card>
          </Grid>
          <Grid item={true} xs={12} xm={12} md={4} lg={4}>
            <Card className={classes.root}>
              <CardActionArea component={Link}>
                <Skeleton
                  animation="wave"
                  variant="rect"
                  className={classes.media}
                />

                <CardContent>
                  <Skeleton animation="wave" height={35} width="100%" />

                  <Skeleton animation="wave" height={30} width="100%" />

                  <Skeleton animation="wave" height={35} width="100%" />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Skeleton animation="wave" height={35} width="30%" />
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}

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
                    alt={`gambar-${produkDoc.id}`}
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
                  <Chip
                      icon={<FavoriteIcon />}
                      label={`${produkData.likes} likes`}
                    
                      variant="outlined"
                    />
                </CardActions>
              </Card>
            </Grid>
          );
        })}
        <Grid className={classes.fabGrid} id={"el"} ref={el}>
          {produkItems.length !== maxData && !searchingActivate ? (
            <Fab color="primary" className={classes.fab} onClick={loadNextData}>
              <ArrowForwardIcon />
            </Fab>
          ) : (
            <></>
          )}
          {/* {searchingActivate && <></>} */}
        </Grid>
      </Grid>
    </>
  );
}

export default HomeProduk;
