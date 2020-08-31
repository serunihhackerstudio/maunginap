import React, { useState, useEffect } from "react";

// material-ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";

// firebase
import { useFirebase } from "../../../components/FirebaseProvider";
import { useDocument } from "react-firebase-hooks/firestore";

// css
import useStyles from "./styles/identitas";

// component
import AppPageLoading from "../../../components/AppPageLoading";

function Identitas() {
  const { firestore, user } = useFirebase();
  const dataDoc = firestore.doc(`/user/${user.uid}`);
  const [snapshot, loading] = useDocument(dataDoc);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    nama: "",
    nomorWA: "",
    alamat: "",
    posisi: "",
  });

  const [error, setError] = useState({
    nama: "",
    nomorWA: "",
    alamat: "",
    posisi: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (snapshot) {
      setForm((currentForm) => ({
        ...form,
        ...snapshot.data(),
      }));
    }
  }, [snapshot]);

  if (loading) {
    return <AppPageLoading />;
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newError = { ...error };
    if (!form.nama) {
      newError.nama = "Nama tidak ada";
    }
    if (!form.nomorWA) {
      newError.nomorWA = "Nomor WA tidak ada";
    }
    if (!form.alamat) {
      newError.alamat = "Alamat tidak ada";
    }
    if (!form.posisi) {
      newError.posisi = "Posisi tidak ada";
    }
    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const findErros = validate();
    setSubmitting(true);
    if (Object.values(findErros).some((err) => err !== "")) {
      setError(findErros);
    } else {
      try {
        await dataDoc.set(form, { merge: true });
        enqueueSnackbar("Berhasil menyimpan data", { variant: "success" });
      } catch (e) {
        enqueueSnackbar(e.message, { variant: "error" });
      }

      setSubmitting(false);
    }
  };

  return (
    <div className={classes.pengaturanIdentitas}>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          name="nama"
          id="nama"
          label="Nama Admin"
          value={form.nama}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
          helperText={error.nama}
          error={error.nama ? true : false}
          disabled={isSubmitting}
        />

        <TextField
          name="nomorWA"
          id="nomorWA"
          label="Nomor WA"
          value={form.nomorWA}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
          helperText={error.nomorWA}
          error={error.nomorWA ? true : false}
          disabled={isSubmitting}
        />

        <TextField
          name="alamat"
          id="alamat"
          label="Alamat"
          value={form.alamat}
          fullWidth
          require
          margin="normal"
          onChange={handleChange}
          helperText={error.alamat}
          error={error.alamat ? true : false}
          disabled={isSubmitting}
        />

        <TextField
          name="posisi"
          id="posisi"
          label="Posisi / jabatan"
          value={form.posisi}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
          helperText={error.posisi}
          error={error.posisi ? true : false}
          disabled={isSubmitting}
        />
        <Button
          className={classes.tombolSimpan}
          variant="contained"
          type="submit"
          color="primary"
        >
          Simpan
        </Button>
      </form>
    </div>
  );
}

export default Identitas;
