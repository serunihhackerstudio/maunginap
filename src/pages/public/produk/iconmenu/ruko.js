import React, { useState, useEffect, useRef } from "react";
import { useFirebase } from "../../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import { currency } from "../../../../utils/formatter";
// React router
import { Link } from "react-router-dom";
import useStyles from "./styles";
import Skeleton from "@material-ui/lab/Skeleton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";

// button
import LocationOnIcon from "@material-ui/icons/LocationOn";
// import { isBrowser } from "react-device-detect";
import { blue } from "@material-ui/core/colors";
import StorefrontIcon from '@material-ui/icons/Storefront';
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import datatidakditemukan from "../../../../assets/datatidakditemukan.png";

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

function Ruko({ history }) {
  const { firestore } = useFirebase();
  const [options, setOptions] = React.useState([]);
  const kotaQuery = firestore.collection("kota");
  const [kotaSnapshot, kotaLoading] = useCollection(kotaQuery);
  const classes = useStyles();
  const defaultNumPage = 8;
  const [numPage, setNumPage] = useState(defaultNumPage);
  const dataDoc = firestore
    .collection(`penginapan`)
    .doc("data")
    .collection("produk")
    .where("jenisPenginapan", "==", "Ruko").limit(numPage);

  const dataDocMax = firestore
    .collection(`penginapan`)
    .doc("data")
    .collection("produk").where("jenisPenginapan", "==", "Ruko");
  const [snapshotDataDocMax, loadingDataDocMax] = useCollection(dataDocMax)
  const [snapshot, loading] = useCollection(dataDoc);
  const [produkItems, setProdukItems] = useState([]);
  // hilangkan fab ketika tombol search diaktifkan
  const timer = React.useRef();  
  const el = useRef(null);
  const [isNextClicked, setNextClicked] = useState(false);
  const [maxData, setMaxData] = useState(0);
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

    if (snapshotDataDocMax){
      setMaxData(snapshotDataDocMax.docs.length)
    }

  }, [snapshot, isNextClicked, kotaSnapshot, snapshotDataDocMax]);
  const loadNextData = (e) => {
    e.preventDefault();
    setNextClicked(true);
    setNumPage(numPage + defaultNumPage);
  };
  
  
  const clear = true;
  if (!clear){
    console.clear(maxData)
    console.clear(setNextClicked)
    console.clear(loading)
    console.clear(setNumPage)
    console.clear(kotaLoading,options, numPage, loadingDataDocMax)
  }



  return (
    <>
      
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
          <img src={datatidakditemukan} width={350} alt="Data not found" />
        </div>
      ) : (

        <>
           <Grid container spacing={5} className={classes.gridContainer}>
        {produkItems.map((produkDoc) => {
          const produkData = produkDoc.data();
          return (
            <Grid key={produkDoc.id} item={true} xs={12} xm={12} md={3} lg={3}>
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
                      {produkData.isTahunan && produkData.jenisPenginapan !== "Ruko" ? "(Kost Tahunan)" : ""}{" "}
                    </Typography>
                    <Typography variant="body1" gutterBottom color="primary">
                      {currency(produkData.harga)}
                      {/* {produkData.isTahunan ? currency(produkData.harga * 12) : currency(produkData.harga)}{" "} */}
                      {produkData.jenisPenginapan === "Ruko" ||
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
                      {produkData.fasilitasUmum.kasur ? <>kasur &#183; </> : ""}
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
                      {produkData.fasilitasUmum.tempatJemur ? <>tempat jemur &#183; </> : ""}
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
                  {produkData.jenisPenginapan === "Ruko" ? <Tooltip title="Penyewaan Ruko"><StorefrontIcon /></Tooltip> : ""}
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Grid className={classes.fabGrid} id={"el"} ref={el}>
          {produkItems.length !== maxData ? (
            <Button
              variant="outlined"
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

      )}
     
    </>
  );
}

export default Ruko;
