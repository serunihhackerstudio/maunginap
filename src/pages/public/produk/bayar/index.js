import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
// React router
import { Link } from "react-router-dom";
import useStyles from "./style";

// component
// import AppPageLoading from '../../../../components/AppPageLoading'

// PesananProvider
import { usePesanan } from "../../../../components/PesananProvider";

function Bayar({ match }) {
  const classes = useStyles();
  const { akunBank } = usePesanan();

  return (
    <div>
      <Grid className={classes.heading}>
        <Typography variant="h5">Pilih metode pembayaran</Typography>
      </Grid>
      <Grid className={classes.headline}>
        <Typography variant="body1" component="p" color="textSecondary">
          Silahkan klik salah satu data di bawah ini untuk konfirmasi
          transfer/transaksi
        </Typography>
      </Grid>

      <Grid container spacing={5}>
        {akunBank.map((produkDoc) => {
          return (
            <Grid key={produkDoc.id} item={true} xs={12} xm={12} md={4} lg={4}>
              <Card className={classes.root}>
                <CardActionArea
                  component={Link}
                  to={`/view/penginapan/${match.params.checkoutId}/proses/${produkDoc.id}`}
                >
                  <CardMedia
                    className={classes.media}
                    image={produkDoc.fotoBank}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {produkDoc.bank}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      component="p"
                    >
                      {produkDoc.noRek}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      a/n {produkDoc.atasNama}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="medium"
                    color="primary"
                    component={Link}
                    to={`/view/penginapan/${match.params.checkoutId}/proses/${produkDoc.id}`}
                  >
                    {produkDoc.button}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Bayar;
