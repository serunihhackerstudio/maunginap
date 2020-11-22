import React from "react";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import SendIcon from "@material-ui/icons/Send";
import ButtonBase from "@material-ui/core/ButtonBase";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import AppPageLoading from "../../../../components/AppPageLoading";
import { currency } from "../../../../utils/formatter";
import { useSnackbar } from "notistack";

// import dialog booking
import { CardMedia, CardActionArea, Card } from "@material-ui/core";
// import context
import { useFirebase } from "../../../../components/FirebaseProvider";
import { usePesanan } from "../../../../components/PesananProvider";

// dialog;
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";

// shimmer
// import {DetailShimmer} from "../../../../components/Skeleton"
import Skeleton from "@material-ui/lab/Skeleton";

// CHECKBOX UNTUK FASILITAS UMUM
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

// rating
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

// list
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { green, red, blue, orange, yellow } from "@material-ui/core/colors";
import AirlineSeatFlatSharpIcon from "@material-ui/icons/AirlineSeatFlatSharp";
import GradeIcon from "@material-ui/icons/Grade";

// icon
import BathtubIcon from "@material-ui/icons/Bathtub";
import WifiIcon from "@material-ui/icons/Wifi";
import PowerIcon from "@material-ui/icons/Power";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import DnsIcon from "@material-ui/icons/Dns";
import HotelIcon from "@material-ui/icons/Hotel";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import InfoIcon from "@material-ui/icons/Info";
import Chip from "@material-ui/core/Chip";
import DirectionsIcon from "@material-ui/icons/Directions";
import ChatIcon from '@material-ui/icons/Chat';

function DetailProduk({ match, history, location }) {
  const [expanded, setExpanded] = React.useState(false);

  const [open, setOpen] = React.useState(false);
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

  const queryImages = firestore
    .collection("imgthumbnail")
    .where("penginapanId", "==", `${match.params.penginapanId}`);
  const [listImage, setListImage] = React.useState([]);
  const [dialogImg, setDialogImg] = React.useState("");
  const [imgSnapshot, imgLoading] = useCollection(queryImages);
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

  // like button handler
  const [likeNum, setLikeNum] = React.useState(0);

  // Fitur fasilitas umum
  const [fasilitas, setFasilitas] = React.useState({
    kamarMandiDalam: false,
    wifi: false,
    listrikSendiri: false,
    ac: false,
    meja: false,
    lemari: false,
    kasur: false,
    tempatJemur: false,
  });
  const {
    kamarMandiDalam,
    wifi,
    listrikSendiri,
    ac,
    meja,
    lemari,
    kasur,
    tempatJemur,
  } = fasilitas;

  // rating
  const queryRating = firestore
    .collection("rating")
    .where("penginapanId", "==", `${match.params.penginapanId}`);
  const [snapshotRating, loadingRating] = useCollection(queryRating);
  const [ratingItems, setRatingItems] = React.useState([]);
  const [ratingValue, setRatingValue] = React.useState(0);
  React.useEffect(() => {
    const items = [];
    if (snapshotRating) {
      setRatingItems(snapshotRating.docs);
      snapshotRating.docs.forEach((item) => {
        items.push(item.data().rating);
      });
      setRatingValue(items.reduce((a, b) => a + b, 0) / items.length);
    }

    if (snapshot) {
      const data = snapshot.data();
      setstate(data);
      setLikeNum(data.likes);
      setFasilitas({
        kamarMandiDalam: data.fasilitasUmum.kamarMandiDalam,
        wifi: data.fasilitasUmum.wifi,
        listrikSendiri: data.fasilitasUmum.listrikSendiri,
        ac: data.fasilitasUmum.ac,
        meja: data.fasilitasUmum.meja,
        lemari: data.fasilitasUmum.lemari,
        kasur: data.fasilitasUmum.kasur,
        tempatJemur: data.fasilitasUmum.tempatJemur,
      });
    }
    if (snapshotSuka) {
      try {
        setSuka(snapshotSuka.docs[0].data());
        setIdSuka(snapshotSuka.docs[0].id);
      } catch (e) {
        console.log(e.message);
      }
    }
    if (snapshotReserved) {
      setReserved(snapshotReserved.data());
    }

    if (imgSnapshot) {
      setListImage(imgSnapshot.docs);
    }
  }, [snapshot, snapshotSuka, snapshotReserved, imgSnapshot, snapshotRating]);

  // // const handleFasilitas = (event) => {
  // //   setFasilitas({ ...fasilitas, [event.target.name]: event.target.checked });
  // // };

  const handleOpenDialog = () => {
    if (state.jenisPenginapan === "Kontrakan" || state.isTahunan) {
      const harga = state.harga;
      setFormPesanan({
        jenisIuran:"Penginapan Tahunan",
        namaPenginapan: state.namaPenginapan,
        harga,
        codeHarga: Math.floor(Math.random() * 1000),
        foto: state.foto,
      });
      history.push(`/view/penginapan/${match.params.penginapanId}/checkout`);
    } else {
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
          codeHarga: Math.floor(Math.random() * 1000),
          foto: state.foto,
        });
        history.push(`/view/penginapan/${match.params.penginapanId}/checkout`);
      }
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
        await produkDoc.set({ likes: likeNum + 1 }, { merge: true });
      } catch (e) {
        enqueueSnackbar(e.message, { variant: "error" });
      }
  };

  const handleDisLikeButton = async (e) => {
    // fungsi untuk menambah data suka pada produk
    try {
      await dataLikePath.doc(idSuka).delete();
      await produkDoc.set({ likes: likeNum - 1 }, { merge: true });
      setSuka(false);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  const handleClickOpen = (file) => (e) => {
    e.preventDefault();
    setOpen(true);
    setDialogImg(file);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const value = ratingValue.toFixed(1);
  const adminNumber = "+6281990321358";
  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          avatar={
            loading ? (
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
            ) : (
              <Tooltip title="Kembali" aria-label="kembali">
                <IconButton
                  aria-label="Back icon"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Tooltip>
            )
          }
          action={
            loading ? (<Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
              style={{margin:10}}
            />) : (
              <a href={`https://wa.me/${adminNumber}`}>
              <IconButton aria-label="chatAdmdin">
                <ChatIcon/>
              </IconButton>
              </a>
            )
          }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            ) : (
              state.namaPenginapan
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              `(IDR) ${currency(state.harga)} ${
                state.jenisPenginapan === "Kontrakan" || state.isTahunan ? " / tahun" : "/ bulan"
              }`
            )
          }
        />

        {loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
          <CardMedia
            className={classes.media}
            image={state.foto}
            title="Foto Utama"
          />
        )}

        <CardContent>
          {loading ? (
            <Skeleton
              animation="wave"
              height={50}
              className={classes.imgThumb}
            />
          ) : (
            <>
              <Grid className={classes.center} direction="row">
                {listImage.slice(0, 4).map((data) => {
                  const imgFile = data.data().url;
                  return (
                    <a href={"#"} onClick={handleClickOpen(imgFile)}>
                      <img
                        src={imgFile}
                        width={70}
                        height={50}
                        className={classes.imgThumb}
                      />
                    </a>
                  );
                })}
              </Grid>
              {/* <Typography variant="h6" color="inherit" component="p">
                Rating
              </Typography> */}
            </>
          )}
          {loading ? (
            <>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={40}
                      height={40}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <Skeleton animation="wave" height={20} width="30%" />
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={40}
                      height={40}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <Typography variant="body2" color="textSecondary">
                            <Skeleton
                              animation="wave"
                              height={15}
                              width="15%"
                            />
                          </Typography>
                          <Typography color="primary">
                            <Skeleton
                              animation="wave"
                              height={20}
                              width="80%"
                            />
                          </Typography>
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={40}
                      height={40}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <Typography variant="body2" color="textSecondary">
                            <Skeleton
                              animation="wave"
                              height={15}
                              width="15%"
                            />
                          </Typography>
                          <Typography color="primary">
                            <Skeleton
                              animation="wave"
                              height={20}
                              width="30%"
                            />
                          </Typography>
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </>
          ) : (
            <>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: orange[500] }}>
                      <GradeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <Tooltip title="Rating" aria-label="rating">
                            <div className={classes.ratingRoot}>
                              <Rating
                                className={classes.ratingDiv}
                                name="rating-produk"
                                value={value}
                                precision={0.5}
                                readOnly
                              />
                              {value === "NaN" ? "0.0" : value}
                            </div>
                          </Tooltip>
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#016660" }}>
                      <LocationOnIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <Typography variant="body2" color="textSecondary">
                            Lokasi
                          </Typography>
                          <Typography color="inherit">
                            {state.lokasi ? state.lokasi : "-"}
                          </Typography>
                          <Typography>
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${state.lokasi}`}
                              style={{textDecoration:"none"}}
                              target="_blank"
                            >
                              <Chip
                                size="small"
                                icon={<DirectionsIcon />}
                                label="Tunjukan lokasi"
                                clickable
                                style={{ backgroundColor: blue[500] }}
                                color="secondary"
                              />
                            </a>
                          </Typography>
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem>
                  {state.jenisPenginapan === "Kontrakan" ? (
                    <ListItemAvatar>
                      <Avatar style={state.jumlahKamar === 0 ? {backgroundColor:red[500]} : {backgroundColor:blue[500]}}>
                        <InfoIcon />
                      </Avatar>
                    </ListItemAvatar>
                  ) : (
                    <ListItemAvatar>
                      <Avatar style={state.jumlahKamar === 0 ? {backgroundColor:red[500]} : {backgroundColor:blue[500]}}>
                        <InfoIcon />
                      </Avatar>
                    </ListItemAvatar>
                  )}

                  {state.jenisPenginapan === "Kontrakan" ? (
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            <Typography variant="body2" color="textSecondary">
                              Ketersediaan kontrakan
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              style={state.jumlahKamar === 0 ? {color:red[500]} : {color:blue[500]}}
                            >
                              {state.jumlahKamar === 0 ? ("Kontakan telah terbooking") : ("Kontrakan tersedia")}
                            </Typography>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  ) : (
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            <Typography variant="body2" color="textSecondary">
                              Ketersediaan kamar
                            </Typography>
                            <Typography variant="subtitle1" color={state.jumlahKamar === 0 ? "error" : "inherit"}>
                              Sisa {state.jumlahKamar} kamar
                            </Typography>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  )}
                </ListItem>
              </List>
            </>
          )}
        </CardContent>

        {loading ? (
          <div className={classes.contentSkeleton}>
            <Skeleton animation="wave" height={25} width="100%" />
          </div>
        ) : (
          <div>
            <CardActions disableSpacing>
              {!isSuka && (
                <Tooltip title="Like" aria-label="like">
                  <IconButton
                    aria-label="add to favorites"
                    onClick={handleLikeButton}
                  >
                    <FavoriteIcon color="disable" />
                  </IconButton>
                </Tooltip>
              )}
              {isSuka && (
                <Tooltip title="Dislike" aria-label="dislike">
                  <IconButton
                    aria-label="add to favorites"
                    onClick={handleDisLikeButton}
                  >
                    <FavoriteIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Pesan sekarang" aria-label="booking">
                <Button
                  onClick={handleOpenDialog}
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  disabled={state.jumlahKamar === 0 ? true : false}
                >
                  {isReserved ? "Soldout" : "Pesan"}
                </Button>
              </Tooltip>
              {state.jenisPenginapan === "Kontrakan" || state.isTahunan ? (
                <div></div>
              ) : (
                <Tooltip title="Bulanan / tahunan" aria-label="jenisIuran">
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
                </Tooltip>
              )}

              <Tooltip title="Info lebih detail" aria-label="detail">
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </div>
        )}

        {/* LIKE BUTTON */}

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6">Fasilitas</Typography>
            <Typography paragraph align="justify" color="textSecondary">
              <List>
                {fasilitas.kamarMandiDalam ? (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#016660" }}>
                        <BathtubIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            <Typography>Kamar mandi dalam</Typography>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ) : (
                  <></>
                )}
                {fasilitas.wifi ? (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#016660" }}>
                        <WifiIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            <Typography>WIFI</Typography>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ) : (
                  <></>
                )}
                {fasilitas.listrikSendiri ? (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#016660" }}>
                        <PowerIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            <Typography>Listrik sendiri</Typography>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ) : (
                  <></>
                )}
                {fasilitas.ac ? (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#016660" }}>
                        <AcUnitIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            <Typography>AC</Typography>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ) : (
                  <></>
                )}
                {fasilitas.lemari ? (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#016660" }}>
                        <DnsIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            <Typography>Lemari</Typography>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ) : (
                  <></>
                )}
                {fasilitas.kasur ? (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#016660" }}>
                        <HotelIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            <Typography>Kasur</Typography>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ) : (
                  <></>
                )}
                {fasilitas.tempatJemur ? (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#016660" }}>
                        <WbSunnyIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textSecondary"
                          >
                            <Typography>Tempat jemur</Typography>
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ) : (
                  <></>
                )}
                <ListItem>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#016660" }}>
                      <MoreVertIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          <Typography variant="body2" color="textSecondary">
                            Fasilitas lainnya
                          </Typography>
                          <Typography align="justify" color="textSecondary">
                            {state.fasilitas}
                          </Typography>
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>

              {/* GRID FASILIAS */}
              {/* <Grid container direction="column">
                <Grid item xs>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormGroup>
                      {fasilitas.kamarMandiDalam ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={fasilitas.kamarMandiDalam}
                              name="kamarMandiDalam"
                              color="primary"
                            />
                          }
                          label="Kamar mandi dalam"
                        />
                      ) : (
                        <></>
                      )}

                      {fasilitas.wifi ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={fasilitas.wifi}
                              name="wifi"
                              color="primary"
                            />
                          }
                          label="WIFI"
                        />
                      ) : (
                        <></>
                      )}

                      {fasilitas.listrikSendiri ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={fasilitas.listrikSendiri}
                              name="listrikSendiri"
                              color="primary"
                            />
                          }
                          label="Listrik sendiri (prabayar)"
                        />
                      ) : (
                        <></>
                      )}

                      {fasilitas.ac ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={fasilitas.ac}
                              name="ac"
                              color="primary"
                            />
                          }
                          label="AC"
                        />
                      ) : (
                        <></>
                      )}

                      {fasilitas.meja ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={fasilitas.meja}
                              name="meja"
                              color="primary"
                            />
                          }
                          label="Meja"
                        />
                      ) : (
                        <></>
                      )}

                      {fasilitas.lemari ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={fasilitas.lemari}
                              name="lemari"
                              color="primary"
                            />
                          }
                          label="Lemari"
                        />
                      ) : (
                        <></>
                      )}

                      {fasilitas.kasur ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={fasilitas.kasur}
                              name="kasur"
                              color="primary"
                            />
                          }
                          label="Kasur"
                        />
                      ) : (
                        <></>
                      )}

                      {fasilitas.tempatJemur ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={fasilitas.tempatJemur}
                              name="tempatJemur"
                              color="primary"
                            />
                          }
                          label="Tempat Jemur"
                        />
                      ) : (
                        <></>
                      )}
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs className={classes.fasilitas}>
                  <Typography variant="h6">Lainnya</Typography>
                  <Typography paragraph align="justify" color="textSecondary">
                    {state.fasilitas}
                  </Typography>
                </Grid>
              </Grid> */}
            </Typography>
            <Typography variant="h6">Deskripsi</Typography>
            <Typography paragraph align="justify" color="textSecondary">
              {state.deskripsi}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {loading ? (
                <AppPageLoading />
              ) : (
                <img src={dialogImg} className={classes.imgThumb} width={800} />
              )}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
}
export default DetailProduk;
