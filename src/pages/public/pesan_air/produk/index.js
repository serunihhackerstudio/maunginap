import { Typography } from "@material-ui/core";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import useStyles from "./styles";
import Button from "@material-ui/core/Button";

function ProdukAir() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  Isi Ulang Air Minum
                </Typography>
                <Typography
                  className={classes.spaceBtn}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  Kami melayani isi ulang air minum bagi para pelanggan setia
                  kami yang sudah mendaftarkan diri sebagai user maunginap.com
                </Typography>
                <Button
                  fullWidth
                  className={classes.spaceBtn}
                  variant="outlined"
                  color="primary"
                >
                  Pesan Sekarang
                </Button>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={
                  "https://image.freepik.com/free-photo/white-clouds-blue-background_23-2148964575.jpg"
                }
                title={"ini adalah gambar"}
              />
            </Hidden>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  Air Dus Gelasan
                </Typography>
                <Typography
                  className={classes.spaceBtn}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  Kami melayani pesan antar air minum gelasan bagi para
                  pelanggan setia kami yang sudah mendaftarkan diri sebagai user
                  maunginap.com
                </Typography>
                <Button
                  fullWidth
                  className={classes.spaceBtn}
                  variant="outlined"
                  color="primary"
                >
                  Pesan Sekarang
                </Button>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia
                className={classes.cardMedia}
                image={
                  "https://image.freepik.com/free-photo/white-clouds-blue-background_23-2148964575.jpg"
                }
                title={"ini adalah gambar"}
              />
            </Hidden>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProdukAir;
