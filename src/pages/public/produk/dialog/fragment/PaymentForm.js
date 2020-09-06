import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import { usePesanan } from "../../../../../components/PesananProvider";
import useStyles from "./style";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function PaymentForm({ form }) {
  const { akunBank } = usePesanan();
  const classes = useStyles();
  const [paymentBank, setPaymentBank] = useState("");
  const handleChange = (e) => {
    setPaymentBank(e.target.value);
  };
  form.paymentBank = paymentBank;

  return (
    <React.Fragment>
      <div>
        <Typography
          className={classes.paymentTitle}
          variant="body1"
          color="textSecondary"
          gutterBottom
        >
          Metode Pembayaran (Transfer Bank)
        </Typography>
        <Grid container>
          <Grid item>
            <FormControl className={classes.formControl} required>
              <InputLabel id="demo-simple-select-label">
                Pilih Bank Tujuan
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="jenisIuran"
                value={paymentBank}
                onChange={handleChange}
              >
                <MenuItem value={"Bank Mandiri"}>Bank Mandiri</MenuItem>
                <MenuItem value={"Bank BCA"}>Bank BCA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
