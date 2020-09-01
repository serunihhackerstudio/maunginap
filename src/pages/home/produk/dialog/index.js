import React, { useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";

// firebase
import { useFirebase } from "../../../../components/FirebaseProvider";

// styles
import useStyles from "./styles";
import { useSnackbar } from "notistack";

// util
import ID from "../../../../utils/idgenerator";

// import context

const DialogBooking = ({
  history,
  open,
  handleClose,
  jenisIuran,
  namaPenginapan,
  harga,
  location,
  foto,
}) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const idGenerator = ID();
  const [form, setForm] = useState({
    namaKTP: "",
    nomorKTP: "",
    jumlahKamar: "",
    jenisIuran: jenisIuran,
  });

  const [error, setError] = useState({
    namaKTP: "",
    nomorKTP: "",
    jumlahKamar: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { firestore, user } = useFirebase();
  let pesanProduk;

  try {
    const userUid = user.uid;
    console.log("Ini dialog");
  } catch (e) {
    window.alert("Silahkan login dulu untuk dapat mengakses halaman ini");
    return (
      <Redirect
        to={{
          pathname: "/user/login",
          state: {
            from: location,
          },
        }}
      />
    );
  }

  pesanProduk = firestore.collection("pesanan").doc(`${user.uid}`);

  // memasukan data tambahan ke form
  form.namaPenginapan = namaPenginapan;
  form.jenisIuran = jenisIuran;
  form.harga = harga;
  form.kodeBooking = idGenerator;
  form.foto = foto;

  const handleChange = (e) => {
    setError({
      ...error,
      [e.target.name]: "",
    });
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    const newError = { ...error };
    if (!form.namaKTP) {
      newError.namaKTP = "Nama sesuai KTP wajib diisi";
    }
    if (!form.nomorKTP) {
      newError.nomorKTP = "Nomor KTP wajib diisi";
    }

    if (!form.jumlahKamar) {
      newError.jumlahKamar = "Jumlah kamar harus diisi";
    }
    return newError;
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const findError = validate();
    try {
      if (Object.values(findError).some((err) => err !== "")) {
        setError(findError);
      } else {
        const pesan = await pesanProduk.set({ ...form }, { merge: true });
        history.push(`/view/penginapan/${user.uid}/checkout`);
      }
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
      console.log("gagal terkirim");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <Dialog
        disableBackdropClick={isSubmitting}
        disableEscapeKeyDown={isSubmitting}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Pesan {namaPenginapan}</DialogTitle>
        <DialogContent divides>
          <DialogContentText id="alert-dialog-slide-description">
            Data yang Anda masukan sepenuhnya dilindungi oleh platform kami
            karena kemanan data Anda adalah prioritas kami
          </DialogContentText>
          <TextField
            id="namaKTP"
            name="namaKTP"
            label="Nama Lengkap (Sesuai KTP)"
            fullWidth
            required
            margin="normal"
            value={form.namaKTP}
            onChange={handleChange}
            helperText={error.namaKTP}
            error={error.namaKTP ? true : false}
            disabled={isSubmitting}
          />
          <TextField
            id="nomorKTP"
            name="nomorKTP"
            label="Nomor KTP"
            fullWidth
            required
            margin="normal"
            value={form.nomorKTP}
            onChange={handleChange}
            helperText={error.nomorKTP}
            error={error.nomorKTP ? true : false}
            disabled={isSubmitting}
          />
          <TextField
            id="jumlahKamar"
            name="jumlahKamar"
            label="Berapa Kamar ?"
            type="number"
            required
            fullWidth
            margin="normal"
            value={form.jumlahKamar}
            onChange={handleChange}
            helperText={error.jumlahKamar}
            error={error.jumlahKamar ? true : false}
            disabled={isSubmitting}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={handleSimpan}
          >
            Pesan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogBooking.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withRouter(DialogBooking);
