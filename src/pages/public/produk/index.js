import React, { useState, useEffect } from "react";
import { useFirebase } from "../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import Typography from "@material-ui/core/Typography";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import { currency } from "../../../utils/formatter";
// React router
import { Link } from "react-router-dom";
import useStyles from "./styles";

// icon
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// component
import AppPageLoading from "../../../components/AppPageLoading";

function HomeProduk() {
  const classes = useStyles();
  const { firestore } = useFirebase();
  const dataDoc = firestore
    .collection(`penginapan`)
    .doc("data")
    .collection("produk");
  const [snapshot, loading] = useCollection(dataDoc);
  const [produkItems, setProdukItems] = useState([]);

  useEffect(() => {
    if (snapshot) {
      setProdukItems(snapshot.docs);
    }
  }, [snapshot]);

  if (loading) {
    return <AppPageLoading />;
  }

  return (
    <>
      {produkItems.length <= 0 && (
        <Typography>Belum ada data Kost-kostan / peninapan</Typography>
      )}

      <Grid container spacing={5}>
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
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {produkData.namaPenginapan}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {produkData.lokasi}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {currency(produkData.harga)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="medium"
                    color="primary"
                    component={Link}
                    to={`/view/penginapan/${produkDoc.id}`}
                  >
                    Lihat
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {/* <Fab color="primary" className={classes.fab}>
        <ShoppingCartIcon />
      </Fab> */}
    </>
  );
}

export default HomeProduk;
