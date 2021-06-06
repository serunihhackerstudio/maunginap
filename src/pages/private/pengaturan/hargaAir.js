import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles/diskon";
import { useSnackbar } from "notistack";
import { useFirebase } from "../../../components/FirebaseProvider";
import { useDocument } from "react-firebase-hooks/firestore";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { currency } from "../../../utils/formatter";

export default function HargaAir() {
  const { firestore } = useFirebase();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const queryData = firestore.collection(`hargaAir`).doc("hargaAirDoc2021");
  const [snapshot, loading] = useDocument(queryData);
  const [state, setState] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    hargaAir: 0,
  });

  // query/load data
  useEffect(() => {
    if (snapshot) {
      const data = snapshot.data();
      // console.log(data);
      setState(data);
    }
  }, [snapshot]);
  //   const loading = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await queryData.set(form, { merge: true });
    enqueueSnackbar("Harga diatur untuk semua produk", { variant: "default" });
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs>
        <div className={classes.pengaturanIdentitas}>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              name="hargaAir"
              id="hargaAir"
              label="Harga Air"
              type="number"
              value={form.diskon}
              fullWidth
              required
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              disabled={isSubmitting}
            />

            <Button
              className={classes.tombolSimpan}
              variant="contained"
              type="submit"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Set Harga"
              )}
            </Button>
          </form>
        </div>
      </Grid>
      <Grid item xs>
        <Typography variant="subtitle1" color="textSecondary">
          Settingan harga air saat ini :
        </Typography>
        <Typography variant="h4" color="primary">
          {loading ? <CircularProgress /> : `${currency(state.hargaAir)}`}
        </Typography>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
}
