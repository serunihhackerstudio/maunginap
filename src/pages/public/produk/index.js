import React, { useState, useEffect } from "react";
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
import { currency } from "../../../utils/formatter";
// React router
import { Link } from "react-router-dom";
import useStyles from "./styles";

// component
import AppPageLoading from "../../../components/AppPageLoading";
import SwipeableTextMobileStepper from "../../../components/Slider";
import ComboBoxLokasi from "../../../components/ComboBox/ComboBoxLokasi";
import ComboBoxJenis from "../../../components/ComboBox/ComboBoxJenis";

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

  // STATUS SUKA
  //
  // const { jumlahPesanan2, setJumlahPesanan2 } = useState();

  useEffect(() => {
    if (snapshot) {
      setProdukItems(snapshot.docs);
      console.log(snapshot.docs);
    }
  }, [snapshot]);

  if (loading) {
    return <AppPageLoading />;
  }

  return (
    <>
      <Container>
        <Card className={classes.root}>
          <CardActionArea>
            <SwipeableTextMobileStepper classMedia={classes.mediaPromotion} />
          </CardActionArea>
        </Card>
      </Container>

      {/* <Container>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.mediaPromotion}
              image={
                "https://firebasestorage.googleapis.com/v0/b/maunginap-bc894.appspot.com/o/promosi%2Fbenner%20baru%20kos.jpg?alt=media&token=6daab7ec-e6b1-4df1-a3b1-fadf32c2cb74"
              }
              title="Contemplative Reptile"
              alt="testing"
            />
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
        <div className={classes.heroButtons}>
          <Grid
            container
            spacing={2}
            justify="center"
            className={classes.rootGrid}
          >
            <Grid item>
              <ComboBoxLokasi />
            </Grid>
            <Grid item>
              <ComboBoxJenis />
            </Grid>
            <Grid item>
              <Button
                size="large"
                variant="outlined"
                color="primary"
                className={classes.btn}
              >
                Cari
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>

      {produkItems.length <= 0 && <Typography>Loading...</Typography>}

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
