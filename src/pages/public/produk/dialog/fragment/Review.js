import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { currency } from "../../../../../utils/formatter";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({ form }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Ringkasan Pesanan
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem} key={form.namaPenginapan}>
          <ListItemText
            primary={form.namaPenginapan}
            secondary={`${form.jenisIuran} - ${form.jumlahKamar} kamar`}
          />
          <Typography variant="body2">
            {form.jenisIuran === "Tahunan"
              ? currency(form.harga / 12)
              : currency(form.harga)}
          </Typography>
        </ListItem>

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {currency(form.harga)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Pemesan
          </Typography>
          <Typography variant="body1" gutterBottom>
            {form.namaKTP}
          </Typography>
          {/* <Typography gutterBottom>{addresses.join(", ")}</Typography> */}
          {/* <Typography variant="body1" gutterBottom>
            {form.nomorKTP}
          </Typography> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Bank Tujuan
          </Typography>
          <Typography variant="body1" gutterBottom>
            {form.pilihBank}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
