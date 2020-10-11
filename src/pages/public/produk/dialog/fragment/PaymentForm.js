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
                Bank Tujuan
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="pilihBank"
                value={form.pilihBank}
                onChange={handleChange}
              >
                <MenuItem value={"Bank Mandiri"}>
                  <img width={85} src={"https://1.bp.blogspot.com/-epxOcwo446g/Vxw_q2mS5VI/AAAAAAAAXCs/md15WqOgYdMNg5zK0sYoe91Q9EYlSJySQCLcB/s1600/Bank%2BMandiri%2BLogo.png"}/>
                </MenuItem>
                <Divider />
                <MenuItem value={"Bank BCA"}>
                  <img width={85} src={"https://i.pinimg.com/originals/fc/cb/47/fccb47aa81d86e25433c93d24147896d.png"} />
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
