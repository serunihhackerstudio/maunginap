import React, { useState, useEffect, useRef } from "react";
import { useFirebase } from "../../../components/FirebaseProvider";
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
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import TextField from "@material-ui/core/TextField";
import { currency } from "../../../utils/formatter";
// React router
import { Link } from "react-router-dom";
import useStyles from "./styles";

// component
import SwipeableTextMobileStepper from "../../../components/Slider";

// icon
import Skeleton from "@material-ui/lab/Skeleton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";

// asset
import homekontrakan from "../../../assets/homekontrakan.png";
import homekostan from "../../../assets/homekostan.png";
import ruko from "../../../assets/ruko.png";
import gallon from "../../../assets/gallon.png";
// import Divider from "@material-ui/core/Divider";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { blue } from "@material-ui/core/colors";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Tooltip from "@material-ui/core/Tooltip";
// import ComplexButton from "./component/complexButton"
// import datatidakditemukan from "../../../assets/datatidakditemukan.png";

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
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(options[0]);
  const kotaQuery = firestore.collection("kota");
  const [kotaSnapshot, kotaLoading] = useCollection(kotaQuery);

  const classes = useStyles();
  const defaultNumPage = 8;
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
  const [valueJenisPenginapan, setJenisPenginapan] = React.useState("");
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
    const kotaData = [];
    if (snapshot) {
      setProdukItems(snapshot.docs);
      if (isNextClicked) {
        el.current.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    }

    if (kotaSnapshot) {
      kotaSnapshot.docs.forEach((data) => {
        kotaData.push(data.data().kota);
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

  const clear = true;
  if (!clear) {
    console.clear(setJenisPenginapan, success);
    console.clear(kotaLoading, setValue, setForm, handleSubmit);
  }

  return (
    <>
      {/* SLIDER */}
      {/* <Image src="http://loremflickr.com/300/200"/> */}
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
        {/* {loading ? (
          <Skeleton animation="wave" height={100} width="100%" variant="text" />
        ) : (
          <Typography variant="h3" align="center" color="primary" gutterBottom>
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
            Di mana aja pasti bisa nginap dengan platform ini. Mau nginap di
            kost-kotan atau kontrakan ? mau yang bulanan atau tahunan ? nggak
            perlu repot dan ribet, pake aja maunginap.com
          </Typography>
        )} */}

        {/* ICON MENU JENIS PRODUK */}
        {loading ? (
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid
              item={true}
              xs={12}
              xm={12}
              md={3}
              lg={3}
              style={{ margin: "4" }}
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.media}
                  />
                </CardActionArea>
                <CardActions>
                  <Skeleton
                    animation="wave"
                    height={35}
                    width="30%"
                    className={classes.menuicon}
                  />
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item={true}
              xs={12}
              xm={12}
              md={3}
              lg={3}
              style={{ margin: "4" }}
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.media}
                  />
                </CardActionArea>
                <CardActions>
                  <Skeleton
                    animation="wave"
                    height={35}
                    width="30%"
                    className={classes.menuicon}
                  />
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item={true}
              xs={12}
              xm={12}
              md={3}
              lg={3}
              style={{ margin: "4" }}
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.media}
                  />
                </CardActionArea>
                <CardActions>
                  <Skeleton
                    animation="wave"
                    height={35}
                    width="30%"
                    className={classes.menuicon}
                  />
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item={true}
              xs={12}
              xm={12}
              md={3}
              lg={3}
              style={{ margin: "4" }}
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.media}
                  />
                </CardActionArea>
                <CardActions>
                  <Skeleton
                    animation="wave"
                    height={35}
                    width="30%"
                    className={classes.menuicon}
                  />
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item={true} xs={6} md={3}>
              <Card className={classes.root}>
                <CardActionArea
                  style={{ textAlign: "center" }}
                  component={Link}
                  to={"/filter/kost"}
                >
                  <img
                    src={homekostan}
                    className={classes.mediaiconMenu}
                    alt="img"
                  />
                </CardActionArea>
                <CardActions>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.menuicon}
                  >
                    Kost
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
            <Grid item={true} xs={6} md={3}>
              <Card className={classes.root}>
                <CardActionArea
                  component={Link}
                  style={{ textAlign: "center" }}
                  to={"/filter/kontrakan"}
                >
                  <img
                    src={homekontrakan}
                    className={classes.mediaiconMenu}
                    alt="img"
                  />
                </CardActionArea>
                <CardActions>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.menuicon}
                  >
                    Kontrakan
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
            <Grid item={true} xs={6} md={3}>
              <Card className={classes.root}>
                <CardActionArea
                  component={Link}
                  style={{ textAlign: "center" }}
                  to={"/filter/ruko"}
                >
                  <img src={ruko} className={classes.mediaiconMenu} alt="img" />
                </CardActionArea>
                <CardActions>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.menuicon}
                  >
                    Ruko
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
            <Grid item={true} xs={6} md={3}>
              <Card className={classes.root}>
                <CardActionArea
                  component={Link}
                  style={{ textAlign: "center" }}
                  to={"/pesan-air/detail"}
                >
                  <img
                    src={gallon}
                    className={classes.mediaiconMenu}
                    alt="img"
                  />
                </CardActionArea>
                <CardActions>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className={classes.menuicon}
                  >
                    Air isi ulang
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        )}

        {loading ? (
          <div className={classes.all}>
            <Skeleton
              animation="wave"
              height={40}
              width="100%"
              variant="text"
            />
          </div>
        ) : (
          <div className={classes.all}>
            {/* <Divider /> */}
            <Typography
              align="center"
              variant="h5"
              color="primary"
              className={classes.semuaPenginapan}
            >
              Semua Penginapan
            </Typography>
          </div>
        )}
      </Container>

      {/* {produkItems.length === 0 && (
        <div className={classes.textNoFound}>
          <img src={datanotfound} width={350} alt="Data not found" />
        </div>
      )} */}

      {loading && (
        <Grid container spacing={5} className={classes.gridContainer}>
          <Grid item={true} xs={12} xm={12} md={3} lg={3}>
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
          <Grid item={true} xs={12} xm={12} md={3} lg={3}>
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
          <Grid item={true} xs={12} xm={12} md={3} lg={3}>
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
          <Grid item={true} xs={12} xm={12} md={3} lg={3}>
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
      {produkItems.length === 0 && !loading ? (
        <div className={classes.textNoFound}>
          {/* <img src={datatidakditemukan} width={350} alt="Data not found" /> */}
        </div>
      ) : (
        <Grid container spacing={5} className={classes.gridContainer}>
          {produkItems.map((produkDoc) => {
            const produkData = produkDoc.data();
            return (
              <Grid
                key={produkDoc.id}
                direction="row"
                item={true}
                xs={12}
                xm={12}
                md={3}
                lg={3}
              >
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
                      <Typography variant="h6">
                        {produkData.namaPenginapan}
                      </Typography>
                      <Typography variant="body1" style={{ color: blue[500] }}>
                        {produkData.isTahunan &&
                        produkData.jenisPenginapan !== "Ruko"
                          ? "(Kost Tahunan)"
                          : ""}{" "}
                      </Typography>

                      <Typography variant="body1" gutterBottom color="primary">
                        {currency(produkData.harga)}
                        {/* {produkData.isTahunan ? currency(produkData.harga * 12) : currency(produkData.harga)}{" "} */}
                        {produkData.jenisPenginapan === "Kontrakan" ||
                        produkData.jenisPenginapan === "Ruko" ||
                        produkData.isTahunan
                          ? " / tahun"
                          : " / bulan"}
                      </Typography>

                      <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p"
                      >
                        {/* {produkData.lokasi} */}
                        {/* <Chip
                        icon={<LocationOnIcon />}
                        label={`mataram`}
                        size="small"
                        color="primary"
                      /> */}
                        {/* <LocationOnIcon /> Mataram */}
                      </Typography>
                      <Grid container>
                        <Grid item xs={1.8}>
                          <LocationOnIcon className={classes.ico} />
                        </Grid>
                        <Grid item xs>
                          {produkData.kota}
                        </Grid>
                      </Grid>

                      <Typography variant="body2" color="textSecondary">
                        {produkData.fasilitasUmum.ac ? <>ac &#183; </> : ""}
                        {produkData.fasilitasUmum.kamarMandiDalam ? (
                          <>k. mandi dlm &#183; </>
                        ) : (
                          ""
                        )}
                        {produkData.fasilitasUmum.kasur ? (
                          <>kasur &#183; </>
                        ) : (
                          ""
                        )}
                        {produkData.fasilitasUmum.lemari ? (
                          <>lemari &#183; </>
                        ) : (
                          ""
                        )}
                        {produkData.fasilitasUmum.listrikSendiri ? (
                          <>listrik sendiri &#183; </>
                        ) : (
                          ""
                        )}
                        {produkData.fasilitasUmum.meja ? <>meja &#183; </> : ""}
                        {produkData.fasilitasUmum.tempatJemur ? (
                          <>tempat jemur &#183; </>
                        ) : (
                          ""
                        )}
                        {produkData.fasilitasUmum.wifi ? <>wifi &#183; </> : ""}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Chip
                      icon={<FavoriteIcon />}
                      label={`${produkData.likes} likes`}
                      variant="outlined"
                      size="small"
                    />
                    {produkData.jenisPenginapan === "Ruko" ? (
                      <Tooltip title="Penyewaan Ruko">
                        <StorefrontIcon />
                      </Tooltip>
                    ) : (
                      ""
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Grid className={classes.fabGrid} id={"el"} ref={el}>
        {produkItems.length !== maxData && !searchingActivate ? (
          <Button
            variant="outlined"
            className={classes.fab}
            color="primary"
            onClick={loadNextData}
          >
            Load more data
          </Button>
        ) : (
          <></>
        )}
        {/* {searchingActivate && <></>} */}
      </Grid>
    </>
  );
}

export default HomeProduk;
