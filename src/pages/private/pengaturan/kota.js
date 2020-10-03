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
import ID from "../../../utils/idgenerator";

function Kota() {
  const { firestore, user } = useFirebase();
  const genId = ID();
  const dataDoc = firestore.collection("kota").doc(`${genId}`);
  //   const [snapshot, loading] = useDocument(dataDoc);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    kota: "",
  });

  const [error, setError] = useState({
    kota: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

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
    if (!form.kota) {
      newError.kota = "kota tidak ada";
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
          name="kota"
          id="kota"
          label="Masukan Nama Kota"
          value={form.kota}
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
          helperText={error.kota}
          error={error.kota ? true : false}
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

export default Kota;
