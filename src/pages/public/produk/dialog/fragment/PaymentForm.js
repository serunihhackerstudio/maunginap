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
import FormHelperText from "@material-ui/core/FormHelperText";
import { CSSTransition } from "react-transition-group";
export default function PaymentForm({ form, setForm, error, setError }) {
  const { akunBank, setFormBank } = usePesanan();
  const [isSubmitting, setSubmitting] = useState(false);
  const classes = useStyles();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value == "Bank Mandiri") {
      form.pilihBank = value;
      form.noRek = "161-0000-454-3980";
      form.atasNama = "Toufani Rizal Alfarisi";
      setFormBank({ ...form });
    }
    if (value == "Bank BCA") {
      form.pilihBank = value;
      form.noRek = "885-0000-9890-161";
      form.atasNama = "Toufani Rizal Alfarisi";
      setFormBank({ ...form });
    }
    setSubmitting(true);
  };

  return (
    <React.Fragment>
      <CSSTransition classNames="display" timeout={350}>
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
                  name="pilihBank"
                  value={form.pilihBank}
                  onChange={handleChange}
                >
                  <MenuItem value={"Bank Mandiri"}>Bank Mandiri</MenuItem>
                  <MenuItem value={"Bank BCA"}>Bank BCA</MenuItem>
                </Select>
                {!form.pilihBank && (
                  <FormHelperText error={true} disabled={isSubmitting}>
                    Harus diisi !
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
}
