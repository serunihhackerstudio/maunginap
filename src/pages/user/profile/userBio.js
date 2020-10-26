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

import { Typography } from "@material-ui/core";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import ID from "../../../utils/idgenerator";

function UserBio() {
  const classes = useStyles();

  const { firestore, user, storage } = useFirebase();

  const userBio = firestore.doc(`/userbio/${user.uid}`);

  const { enqueueSnackbar } = useSnackbar();

  const produkStorageRef = storage.ref(`penginapan/data/user/profile_pict/${user.uid}`);

  const [snapshot, loading] = useDocument(userBio);

  const [form, setForm] = useState({
    foto:"",
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
      // console.log(snapshot.data())
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
    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setSubmitting(true);
      try {
        await userBio.set(form, { merge: true });
        setSomethingChange(false);
        enqueueSnackbar("Data berhasil disimpan", { variant: "success" });
      } catch (e) {
        enqueueSnackbar(e.message, { variant: "error" });
      }
      setSubmitting(false);
  };

  if (loading) {
    return <AppPageLoading />;
  }

  const handleUploadFile = async (e) => {
    if (form.foto){
      userBio.get().then(doc => {
        storage.refFromURL(doc.data().foto).delete()
      })
    }
    setSomethingChange(true)
    const file = e.target.files[0]
    const idImg = ID();
      const reader = new FileReader();
      if (!["image/png", "image/jpeg", "image/jpg"]) {
        setError((error) => ({
          ...error,
          foto: `Tipe file tidak didukung ${file.type}`,
        }));

        reader.onabort = () => {
          setError((error) => ({
            ...error,
            foto: "File tidak bisa dibaca",
          }));
        };
        
      }
      reader.onload = async () => {
        const fotoExt = file.name.substring(file.name.lastIndexOf("."));
        const fotoRef = await produkStorageRef.child(`${idImg}${fotoExt}`);
        const fotoSnapshot = await fotoRef.putString(reader.result, "data_url");
        const fotoUrl = await fotoSnapshot.ref.getDownloadURL();
        setForm((currentForm) => ({
          ...currentForm,
          foto: fotoUrl,
        }));
      };
      reader.readAsDataURL(file);
      enqueueSnackbar("Foto berhasil diupload", {
        variant: "info",
      });
  }



  return (
    <div className={classes.pengaturanBio}>
      
      <form onSubmit={handleSubmit} noValidate>
      <div className={classes.uploadFotoProduk}>
        {form.foto ? (
          <img src={form.foto} width={150} className={classes.profilePict}/>
        ) : ("")}
      
            <input
              className={classes.hideInputFile}
              type="file"
              id="upload-foto-produk"
              accept="image/jpeg, image/jpeg, image/png"
              onChange={handleUploadFile}
            />
            <label htmlFor="upload-foto-produk">
            <Button
            disabled={isSubmitting}
            variant="outlined"
            margin="normal"
            component="span"
            startIcon={<AccountCircleIcon />}
          >Profile
          </Button>
            </label>
            {error.foto && <Typography color="error">{error.foto}</Typography>}
          </div>
        <TextField
          name="alamat"
          id="alamat"
          label="Alamat"
          margin="normal"
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
          label="Nomor Telepon / WA"
          margin="normal"
          fullWidth
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
