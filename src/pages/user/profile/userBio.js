import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import isUrl from "validator/lib/isURL";
// styles
import useStyles from "./styles";

// import firebase hook
import { useFirebase } from "../../../components/FirebaseProvider";
import { useSnackbar } from "notistack";

// react firebase hooks
import { useDocument } from "react-firebase-hooks/firestore";

import AppPageLoading from "../../../components/AppPageLoading";

// react router
import { Prompt } from "react-router-dom";

function UserBio() {
  const classes = useStyles();

  const { firestore, user } = useFirebase();

  const tokoDoc = firestore.doc(`/userbio/${user.uid}`);

  const { enqueueSnackbar } = useSnackbar();

  const [snapshot, loading] = useDocument(tokoDoc);

  const [form, setForm] = useState({
    alamat: "",
    telepon: "",
    website: "",
  });

  const [error, setError] = useState({
    alamat: "",
    telepon: "",
    website: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const [isSomethingChange, setSomethingChange] = useState(false);
  useEffect(() => {
    if (snapshot) {
      setForm(snapshot.data());
    }
  }, [snapshot]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: "",
    });

    setSomethingChange(true);
  };

  const validate = () => {
    const newError = { ...error };
    if (!form.alamat) {
      newError.alamat = "Alamat wajib diisi";
    }
    if (!form.telepon) {
      newError.telepon = "Telepon wajib diisi";
    }
    if (!form.website) {
      newError.website = "Website wajib diisi";
    } else if (!isUrl(form.website)) {
      newError.website = "Website tidak valid";
    }

    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const findErrors = validate();
    if (Object.values(findErrors).some((err) => err !== "")) {
      setError(findErrors);
    } else {
      setSubmitting(true);
      try {
        await tokoDoc.set(form, { merge: true });
        setSomethingChange(false);
        enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
      } catch (e) {
        enqueueSnackbar(e.message, { variant: "error" });
      }
      setSubmitting(false);
    }
  };

  console.log(form);
  if (loading) {
    return <AppPageLoading />;
  }

  return (
    <div className={classes.pengaturanBio}>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          name="alamat"
          id="alamat"
          label="Alamat"
          margin="normal"
          required
          fullWidth
          rowsMax={3}
          multiline
          onChange={handleChange}
          value={form.alamat}
          disabled={isSubmitting}
          helperText={error.alamat}
          error={error.alamat ? true : false}
        />
        <TextField
          name="telepon"
          id="telepon"
          label="Nomor Telepon"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
          value={form.telepon}
          disabled={isSubmitting}
          helperText={error.telepon}
          error={error.telepon ? true : false}
        />
        <TextField
          name="website"
          id="website"
          label="Website"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
          value={form.website}
          disabled={isSubmitting}
          helperText={error.website}
          error={error.website ? true : false}
        />{" "}
        <Button
          disabled={!isSomethingChange || isSubmitting}
          type="submit"
          onClick={handleSubmit}
          className={classes.tombolSimpan}
          variant="contained"
          color="primary"
        >
          Simpan
        </Button>
      </form>

      <Prompt
        when={isSomethingChange}
        message="Terdapat perubahan yang belum disimpan, 
            apakah anda yakin ingin meninggalkan halaman ini ?"
      />
    </div>
  );
}

export default UserBio;
