import React, { useState, useEffect } from "react";

// material ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useFirebase } from "../../../components/FirebaseProvider";
import { usePesanan } from "../../../components/PesananProvider";

import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import AppPageLoading from "../../../components/AppPageLoading";
import { useSnackbar } from "notistack";
import useStyles from "./styles/edit";

// icon
import UploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";

// component
import { Prompt } from "react-router-dom";
import ID from "../../../utils/idgenerator";

function EditProduk({ match }) {
  // stylesheet
  const classes = useStyles();

  const [isSomethingChange, setSomethingChange] = useState(false);

  // const {firestore} = useFirebase();
  const { firestore, storage } = useFirebase();
  const produkDoc = firestore.doc(
    `penginapan/data/produk/${match.params.produkId}`
  );
  const queryImgThumbnail = firestore
    .collection("imgthumbnail")
    .where("penginapanId", "==", `${match.params.produkId}`);
  const [imgSnapshot, imgLoading] = useCollection(queryImgThumbnail);
  const [listImage, setListImage] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [snapshot, loading] = useDocument(produkDoc);
  const produkStorageRef = storage.ref(`penginapan/data/produk`);

  const [form, setForm] = useState({
    namaPenginapan: "",
    harga: "",
    lokasi: "",
    jumlahKamar: "",
    fasilitas: "",
    deskripsi: "",
    kota: "",
    jenisPenginapan: "",
  });

  const [error, setError] = useState({
    namaPenginapan: "",
    harga: "",
    lokasi: "",
    jumlahKamar: "",
    fasilitas: "",
    deskripsi: "",
    kota: "",
    jenisPenginapan: "",
  });
  const { jenisPenginapanOpt } = usePesanan();

  const [valueKota, setKota] = React.useState("");
  const [valueJenisPenginapan, setJenisPenginapan] = React.useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [fotoHandler, setFotoHandler] = useState("");

  useEffect(() => {
    if (snapshot) {
      setForm((currentForm) => ({
        ...currentForm,
        ...snapshot.data(),
      }));
    }
    if (imgSnapshot) {
      setListImage(imgSnapshot.docs);
    }
  }, [snapshot, imgSnapshot]);

  // QUERY DATA KOTA
  // const [kotaOpt, setataKota] = React.useState([]);
  const kotaOpt = [];
  firestore
    .collection("kota")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        kotaOpt.push(doc.data().kota);
      });
    });

  // filter duplicate data
  kotaOpt.filter((a, b) => kotaOpt.indexOf(a) === b);
  const imgThumbStore = [];
  queryImgThumbnail.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      imgThumbStore.push(doc.data().url);
    });
  });
  imgThumbStore.filter((a, b) => imgThumbStore.indexOf(a) === b);
  console.log(imgThumbStore);

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

  if (loading) {
    return <AppPageLoading />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some((err) => err !== "")) {
      setError(findErrors);
    } else {
      setSubmitting(true);

      try {
        await produkDoc.set(form, { merge: true });
        enqueueSnackbar("Data penginapan berhasil ditambahkan", {
          variant: "success",
        });
        setSomethingChange(false);
      } catch (e) {
        enqueueSnackbar(e.message, { variant: "error" });
      }
      setSubmitting(false);
    }
  };

  const validate = () => {
    const newError = { ...error };

    if (!form.namaPenginapan) {
      newError.namaPenginapan = "Nama penginapan wajib diisi!";
    }

    if (!form.harga) {
      newError.harga = "Harga wajib diisi!";
    }

    if (!form.lokasi) {
      newError.lokasi = "Lokasi wajib diisi";
    }

    if (!form.jumlahKamar) {
      newError.jumlahKamar = "Stok wajib diisi";
    }

    if (!form.fasilitas) {
      newError.fasilitas = "Fasilitas wajib diisi";
    }

    if (!form.deskripsi) {
      newError.deskripsi = "Deskripsi wajib diisi";
    }
    if (!form.kota) {
      newError.kota = "kota wajib diisi";
    }
    // if (!form.jenisPenginapan) {
    //   newError.jenisPenginapan = "Jenis penginapan wajib diisi";
    // }

    return newError;
  };

  // console.log(form.namaPenginapan);
  const storageStore = [];

  const handleUploadFile = (e) => {
    const fotos = e.target.files;
    setSubmitting(true);
    for (let file of fotos) {
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
        await fotoSnapshot.ref.getDownloadURL().then((url) => {
          firestore.collection("imgthumbnail").doc(`${idImg}`).set(
            {
              penginapanId: match.params.produkId,
              idImgThumbnail: idImg,
              url: url,
            },
            { merge: true }
          );
        });

        const fotoUrl = await fotoSnapshot.ref.getDownloadURL();
        setForm((currentForm) => ({
          ...currentForm,
          foto: fotoUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
    setSubmitting(false);
  };

  return (
    <Paper className={classes.papperPadding}>
      <Typography variant="h5" component="h1">
        Edit Informasi Penignapan : {form.namaPenginapan}
      </Typography>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} sm={6}>
          <form id="produk-form" onSubmit={handleSubmit} noValidate>
            <TextField
              id="nama"
              name="nama"
              label="Nama Penginapan"
              margin="normal"
              fullWidth
              required
              value={form.namaPenginapan}
              onChange={handleChange}
              error={error.namaPenginapan ? true : false}
              helperText={error.namaPenginapan}
              disabled={isSubmitting}
            />
            <TextField
              id="harga"
              name="harga"
              label="Harga / Biaya Penginapan"
              margin="normal"
              type="number"
              fullWidth
              value={form.harga}
              onChange={handleChange}
              error={error.harga ? true : false}
              helperText={error.harga}
              disabled={isSubmitting}
            />

            <TextField
              id="lokasi"
              name="lokasi"
              label="Lokasi Penginapan"
              margin="normal"
              fullWidth
              required
              value={form.lokasi}
              onChange={handleChange}
              error={error.lokasi ? true : false}
              helperText={error.lokasi}
              disabled={isSubmitting}
            />

            <Autocomplete
              className={classes.comboLokasi}
              value={form.kota}
              onChange={(event, newValue) => {
                form.kota = newValue;
              }}
              inputValue={valueKota}
              onInputChange={(event, newInputValue) => {
                setKota(newInputValue);
                setSomethingChange(true);
              }}
              name="kota"
              options={kotaOpt}
              disabled={isSubmitting}
              style={{ width: 300 }}
              renderInput={(params) => {
                console.log(error.kota);
                return (
                  <TextField
                    {...params}
                    name="kota"
                    label="Kota"
                    variant="outlined"
                    disabled={isSubmitting}
                  />
                );
              }}
            />

            <Autocomplete
              className={classes.comboLokasi}
              value={form.jenisPenginapan}
              onChange={(event, newValue) => {
                form.jenisPenginapan = newValue;
              }}
              inputValue={valueJenisPenginapan}
              onInputChange={(event, newInputValue) => {
                setJenisPenginapan(newInputValue);
                setSomethingChange(true);
              }}
              name="jenisPenginapan"
              options={jenisPenginapanOpt}
              disabled={isSubmitting}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Jenis Penginapan"
                  variant="outlined"
                  disabled={isSubmitting}
                />
              )}
            />

            <TextField
              id="jumlahKamar"
              name="jumlahKamar"
              label={
                form.jenisPenginapan === "Kontrakan"
                  ? "Jumlah Rumah Kontrakan"
                  : "Jumlah Kamar"
              }
              margin="normal"
              type="number"
              fullWidth
              value={
                form.jenisPenginapan === "Kontrakan"
                  ? (form.jumlahKamar = 1)
                  : form.jumlahKamar
              }
              onChange={handleChange}
              error={error.jumlahKamar ? true : false}
              helperText={error.jumlahKamar}
              disabled={
                form.jenisPenginapan === "Kontrakan" ? true : isSubmitting
              }
            />

            <TextField
              id="fasilitas"
              name="fasilitas"
              label="Fasilitas Penginapan"
              margin="normal"
              fullWidth
              required
              value={form.fasilitas}
              onChange={handleChange}
              error={error.fasilitas ? true : false}
              helperText={error.fasilitas}
              disabled={isSubmitting}
            />
            <TextField
              id="deskripsi"
              name="deskripsi"
              label="Deskripsi Penginapan"
              margin="normal"
              fullWidth
              rowsMax={3}
              value={form.deskripsi}
              onChange={handleChange}
              error={error.deskripsi ? true : false}
              helperText={error.deskripsi}
              disabled={isSubmitting}
            />

            <div className={classes.actionButton}>
              <Button
                form="produk-form"
                type="submit"
                color="primary"
                disabled={isSubmitting || !isSomethingChange}
                variant="contained"
              >
                <SaveIcon className={classes.iconLeft} /> Simpan
              </Button>
            </div>
          </form>
        </Grid>

        <Grid item xs={6} sm={6}>
          <Grid className={classes.center}>
            {listImage.map((data) => {
              const imgFile = data.data().url;
              return (
                <a href={"#"}>
                  <img
                    src={imgFile}
                    width={150}
                    height={100}
                    className={classes.imgThumb}
                  />
                </a>
              );
            })}
            {imgLoading && <AppPageLoading />}
          </Grid>
          <div className={classes.uploadFotoProduk}>
            <input
              className={classes.hideInputFile}
              type="file"
              id="upload-foto-produk"
              accept="image/jpeg, image/jpeg, image/png"
              onChange={handleUploadFile}
              multiple
            />
            <label htmlFor="upload-foto-produk">
              <Button
                disabled={isSubmitting}
                variant="outlined"
                margin="normal"
                component="span"
              >
                Upload Foto <UploadIcon className={classes.iconRight} />
              </Button>
            </label>
            {error.foto && <Typography color="error">{error.foto}</Typography>}
          </div>
        </Grid>
      </Grid>
      <Prompt
        when={isSomethingChange}
        message="Terdapat perubahan yang belum disimpan, 
                apakah Anda yakin ingin meninggalkan halaman ini ?"
      />
    </Paper>
  );
}
export default EditProduk;

// if (!["image/png", "image/jpeg", "image/jpg"]) {
//   setError((error) => ({
//     ...error,
//     foto: `Tipe file tidak didukung ${file.type}`,
//   }));
// } else if (file.size >= 1000000) {
//   setError((error) => ({
//     ...error,
//     foto: `Ukuran file terlalu besar > 1MB`,
//   }));
// } else {
//   const reader = new FileReader();
//   reader.onabort = () => {
//     setError((error) => ({
//       ...error,
//       foto: "File tidak bisa dibaca",
//     }));
//   };
//   reader.onload = async () => {
//     setError((error) => ({
//       ...error,
//       foto: "",
//     }));

//     setSubmitting(true);
//     try {
//       const fotoExt = file.name.substring(file.name.lastIndexOf("."));

//       const fotoRef = produkStorageRef.child(
//         `${match.params.produkId}${fotoExt}`
//       );

//       const fotoSnapshot = await fotoRef.putString(
//         reader.result,
//         "data_url"
//       );
//       const fotoUrl = await fotoSnapshot.ref.getDownloadURL();
//       setForm((currentForm) => ({
//         ...currentForm,
//         foto: fotoUrl,
//       }));
//       setSomethingChange(true);
//     } catch (e) {
//       setError((error) => ({
//         ...error,
//         foto: e.message,
//       }));
//     }
//     setSubmitting(false);
//   };

//   reader.readAsDataURL(file);
// }
