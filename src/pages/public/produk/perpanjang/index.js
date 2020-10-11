import React from "react";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";


import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { usePesanan } from "../../../../components/PesananProvider";
import { useDocument } from "react-firebase-hooks/firestore";
import { useFirebase } from "../../../../components/FirebaseProvider";
import { useSnackbar } from "notistack";
import useStyles from "./styles"
import Skeleton from "@material-ui/lab/Skeleton";

export default function Perpanjang({ history, match }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [expanded, setExpanded] = React.useState(false);
  const { akunBank, pesananId } = usePesanan();
  const { firestore } = useFirebase();
  const query = firestore
    .collection("pesanan")
    .doc(`${match.params.penginapanId}`);
  const [snapshot, loading] = useDocument(query);
  const [form, setForm] = React.useState({
    namaKTP: "",
    nomorKTP: "",
    jenisIuran: "",
    tanggalPesan: new Date().toLocaleDateString(),
    tanggalBerakhir: "",
    bank: "",
    noRek: "",
    approvalStatus:false,
    updated: new Date(),
  });

  React.useEffect(() => {
    if (snapshot) {
      setForm(snapshot.data());
    }
  }, [snapshot]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (form.jenisIuran === "Bulanan") {
      const daysInOneMonth = 30;
      const bulanan = new Date().getTime() + daysInOneMonth * 24 * 60 * 60 * 1000;
      const outBulanan = new Date(bulanan).toLocaleDateString();
      form.tanggalBerakhir = outBulanan;
    } else {
      const daysInOneYear = 365;
      const tahunan = new Date().getTime() + daysInOneYear * 24 * 60 * 60 * 1000;
      const outTahunan = new Date(tahunan).toLocaleDateString();
      form.tanggalBerakhir = outTahunan;
    }
  };

  const handlePerpanjang = async () => {
    try {
      await query.set(form, { merge: true });
      history.push(`/perpanjang/${match.params.penginapanId}/proses`);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    }
  };

  const handleChangeBank = (e) => {
    const value = e.target.value;
    if (value === "Mandiri") {
      form.pilihBank = value;
      form.noRek = "161-0000-454-3980";
      form.atasNama = "Toufani Rizal Alfarisi";
      setForm({ ...form });
    }
    if (value === "BCA") {
      form.pilihBank = value;
      form.noRek = "885-0000-9890-161";
      form.atasNama = "Toufani Rizal Alfarisi";
      setForm({ ...form });
    }
    // setSubmitting(true);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Tooltip title="Kembali" aria-label="kembali">
              <IconButton
                aria-label="Back icon"
                onClick={() => {
                  history.goBack();
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={loading ? (<Skeleton animation="wave" height={20} width="60%"/>) :form.namaPenginapan}
          subheader={loading ? (<Skeleton animation="wave" height={20} width="40%"/>) : "s/d. " + form.tanggalBerakhir}
        />
        {loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
          <CardMedia className={classes.media} image={form.foto} />
        )}
        
        <CardContent>
          <TextField
            id="namaKTP"
            name="namaKTP"
            label="Nama Lengkap"
            fullWidth
            margin="normal"
            value={form.namaKTP}
            disabled={true}
          />
          <TextField
            id="nomorKTP"
            name="nomorKTP"
            label="Nomor KTP"
            fullWidth
            margin="normal"
            value={form.nomorKTP}
            disabled={true}
          />

          <FormControl variant="standard" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Bank Tujuan Transfer
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={form.pilihBank}
              onChange={handleChangeBank}
              label="Age"
            >
              <MenuItem value={"Mandiri"}>
                Bank Mandiri (161-0000-454-3980)
              </MenuItem>
              <MenuItem value={"BCA"}>Bank BCA (885-0000-9890-161)</MenuItem>
            </Select>
          </FormControl>

          <Grid container>
            <Grid item xs={1}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                Dengan ini Anda setuju untuk memperpanjang durasi penginapan
                untuk{" "}
                <strong>
                  <font color="#016660">1 {form.jenisIuran.slice(0, -2)} selanjutnya</font>
                </strong>{" "}
                sesuai dengan pesanan sebelumnya
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="contained"
            color="primary"
            className={classes.btnLeft}
            type="submit"
            disabled={!checked}
            onClick={handlePerpanjang}
          >
            Perpanjang
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
