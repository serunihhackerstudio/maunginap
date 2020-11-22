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
import Divider from '@material-ui/core/Divider';
import bank_mandiri_syariah from "../../../../../assets/bank_mandiri_syariah.jpg";
import bank_bri from "../../../../../assets/bank_bri.png";

export default function PaymentForm({ form, setForm, error, setError }) {
  const { setFormBank } = usePesanan();
  const [isSubmitting, setSubmitting] = useState(false);
  const classes = useStyles();

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "Bank BRI") {
      form.pilihBank = value;
      form.noRek = "4692-01-032593-53-9";
      form.atasNama = "Raden Khaerul Peratama";
      setFormBank({ ...form });
    }
    if (value === "Bank Mandiri Syariah") {
      form.pilihBank = value;
      form.noRek = "709-671-279-5";
      form.atasNama = "Raden Khaerul Peratama";
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
                Bank Tujuan
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="pilihBank"
                value={form.pilihBank}
                onChange={handleChange}
              >
                <MenuItem value={"Bank Mandiri Syariah"}>
                  <img width={85} alt="MandiriSyariah" src={bank_mandiri_syariah}/>
                </MenuItem>
                <Divider />
                <MenuItem value={"Bank BRI"}>
                  <img width={85} alt="BRI" src={bank_bri} />
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
