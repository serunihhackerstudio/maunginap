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
import Divider from "@material-ui/core/Divider";

export default function PaymentForm({ form, setForm, error, setError }) {
  const { setFormBank, akunBank } = usePesanan();
  const [isSubmitting, setSubmitting] = useState(false);
  const classes = useStyles();
  const bri = akunBank[0];
  const bsm = akunBank[1];
  const handleChange = (e) => {
    const value = e.target.value;

    if (value === bri.namaBank) {
      form.pilihBank = value;
      form.noRek = bri.noRek;
      form.atasNama = bri.atasNama;
      setFormBank({ ...form });
    }
    if (value === bsm.namaBank) {
      form.pilihBank = value;
      form.noRek = bsm.noRek;
      form.atasNama = bsm.atasNama;
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
              <InputLabel id="demo-simple-select-label">Bank Tujuan</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="pilihBank"
                value={form.pilihBank}
                onChange={handleChange}
              >
                <MenuItem value={"Bank Mandiri Syariah"}>
                  <img width={85} alt="MandiriSyariah" src={bsm.pict} />
                </MenuItem>
                <Divider />
                <MenuItem value={"Bank BRI"}>
                  <img width={85} alt="BRI" src={bri.pict} />
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
