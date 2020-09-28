import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { usePesanan } from "../../../../../components/PesananProvider";
import useStyles from "./style";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
export default function PaymentForm({ form, setForm, error, setError }) {
  const { setFormBank } = usePesanan();
  const [isSubmitting, setSubmitting] = useState(false);
  const classes = useStyles();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "Bank Mandiri") {
      form.pilihBank = value;
      form.noRek = "161-0000-454-3980";
      form.atasNama = "Toufani Rizal Alfarisi";
      setFormBank({ ...form });
    }
    if (value === "Bank BCA") {
      form.pilihBank = value;
      form.noRek = "885-0000-9890-161";
      form.atasNama = "Toufani Rizal Alfarisi";
      setFormBank({ ...form });
    }
    setSubmitting(true);
  };

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
                name="pilihBank"
                value={form.pilihBank}
                onChange={handleChange}
              >
                <MenuItem value={"Bank Mandiri"}>
                  Bank Mandiri - 161-0000-454-3980
                </MenuItem>
                <MenuItem value={"Bank BCA"}>
                  Bank BCA - 885-0000-9890-161
                </MenuItem>
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
    </React.Fragment>
  );
}
