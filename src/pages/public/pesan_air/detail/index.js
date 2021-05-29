import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper, TextField } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import useStyles from "./styles";

export default function DetailProdukAir() {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Hidden mdDown>
        <Grid item xs={12} md={1}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height={50}
                image="https://images.bisnis-cdn.com/thumb/posts/2020/12/14/1330791/depo-air-isi-ulang.jpg?w=744&h=465"
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Card>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={6} className={classes.root}>
        <Paper>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="400"
                image="https://images.bisnis-cdn.com/thumb/posts/2020/12/14/1330791/depo-air-isi-ulang.jpg?w=744&h=465"
                title="Contemplative Reptile"
              />
            </CardActionArea>
          </Card>
        </Paper>
      </Grid>
      <Grid item xs={12} md={5} spacing={3}>
        <Card className={classes.mypaper}>
          <CardContent>
            <Typography variant="h5">Rp. 10.000</Typography>
            <Typography
              className={classes.text}
              variant="body2"
              color="primary"
            >
              Total = 10.000
            </Typography>
            <Typography variant="body2">Siapkan galonnya, kami antarkan air isi ulangnnya ke tempat Anda</Typography>
          </CardContent>
          <CardActions>
            <TextField
              variant="outlined"
              label="jumlah (galon):"
              size="small"
              type="number"
            />
            <Button variant="contained" color="primary" disableElevation>
              Pesan Air
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
