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

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
  const [fasilitas, setFasilitas] = React.useState({
    kamarMandiDalam: false,
    wifi: false,
    listrikSendiri: false,
    ac: false,
    meja: false,
    lemari: false,
    kasur: false,
    tempatJemur: false,
  });

  const handleFasilitas = (event) => {
    setFasilitas({ ...fasilitas, [event.target.name]: event.target.checked });
  };

  const [form, setForm] = useState({
    id: match.params.produkId,
    namaPenginapan: "",
    namaPemilik: "",
    harga: "",
    lokasi: "",
    lat: 0,
    long: 0,
    jumlahKamar: "",
    fasilitas: "",
    fasilitasUmum: {},
    deskripsi: "",
    kota: "",
    jenisPenginapan: "",
    likes: 0,
    diskon: 0,
    rating: 0,
    isTahunan: false,
    intJenisPenginapan: 0,
  });

  form.fasilitasUmum = fasilitas;

  const [error, setError] = useState({
    namaPenginapan: "",
    namaPemilik: "",
    harga: "",
    lokasi: "",
    jumlahKamar: "",
    fasilitas: "",
    deskripsi: "",
    kota: "",
    jenisPenginapan: "",
  });

  const { jenisPenginapanOpt } = usePesanan();
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [valueJenisPenginapan, setJenisPenginapan] = React.useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const kotaQuery = firestore.collection("kota");
  const [kotaSnapshot, kotaLoading] = useCollection(kotaQuery);
  console.clear(value, kotaLoading);

  // koordinat
  const [isKoordinat, setKoordinat] = React.useState(false);

  // radio button untuk pemilihan main image
  const [selectedValue, setSelectedValue] = React.useState(0);
  const [radioLabel, setRadioLabel] = React.useState("");
  console.clear(radioLabel);

  useEffect(() => {
    const kotaData = [];
    const listGambar = [];
    if (snapshot) {
      const data = snapshot.data();
      setForm((currentForm) => ({
        ...currentForm,
        ...snapshot.data(),
      }));
      setFasilitas({
        kamarMandiDalam: data.fasilitasUmum.kamarMandiDalam,
        wifi: data.fasilitasUmum.wifi,
        listrikSendiri: data.fasilitasUmum.listrikSendiri,
        ac: data.fasilitasUmum.ac,
        meja: data.fasilitasUmum.meja,
        lemari: data.fasilitasUmum.lemari,
        kasur: data.fasilitasUmum.kasur,
        tempatJemur: data.fasilitasUmum.tempatJemur,
      });
    }
    if (imgSnapshot) {
      setListImage(imgSnapshot.docs);
      listGambar.push(imgSnapshot.docs);
    }

    if (kotaSnapshot) {
      kotaSnapshot.docs.forEach((data) => {
        kotaData.push(data.data().kota);
      });
      setOptions(kotaData);
    }
  }, [snapshot, imgSnapshot, kotaSnapshot]);

  // kondisi untuk mengklasifikasikan numJenisPenginapan
  if (
    form.jenisPenginapan === "Kontrakan" ||
    form.jenisPenginapan === "Kost-kostan"
  ) {
    form.intJenisPenginapan = 0;
  } else {
    form.intJenisPenginapan = 1;
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    form.kota = form.kota.toUpperCase();

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
    const idKota = ID();
    const findErrors = validate();

    if (Object.values(findErrors).some((err) => err !== "")) {
      setError(findErrors);
    } else {
      setSubmitting(true);

      try {
        if (!options.includes(form.kota)) {
          kotaQuery.doc(`${idKota}`).set({ kota: form.kota }, { merge: true });
        }
        await produkDoc.set(form, { merge: true });
        enqueueSnackbar("Data penginapan berhasil ditambahkan", {
          variant: "default",
        });
        setSomethingChange(false);
      } catch (e) {
        enqueueSnackbar(e.message, { variant: "default" });
      }
      setSubmitting(false);
    }
  };

  const validate = () => {
    const newError = { ...error };

    if (!form.namaPenginapan) {
      newError.namaPenginapan = "Nama penginapan wajib diisi!";
    }

    if (!form.namaPemilik) {
      newError.namaPemilik = "Nama pemilik wajib diisi!";
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

    return newError;
  };

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
    enqueueSnackbar("Upload berhasil", {
      variant: "default",
    });
    setSubmitting(false);
  };

  const deleteImgCallback = (data) => async (e) => {
    await firestore
      .collection("imgthumbnail")
      .doc(`${data.id}`)
      .get()
      .then((doc) => {
        storage.refFromURL(doc.data().url).delete();
        doc.ref.delete();
      });
    enqueueSnackbar("Gambar terhapus", {
      variant: "default",
    });
  };

  const handleRadioChange = async (event) => {
    const id = parseInt(event.target.value) - 1;
    console.log(listImage[id].data().url);
    setSelectedValue(event.target.value);
    await produkDoc.set({ foto: listImage[id].data().url }, { merge: true });
    setRadioLabel("Gambar Utama");
    enqueueSnackbar("Gambar terpilih", {
      variant: "default",
    });
  };

  const handleKoordinat = (event) => {
    setKoordinat(event.target.checked);
    if (!event.target.checked) {
      form.lat = 0;
      form.long = 0;
    }
  };

  const handleIsTahunan = (event) => {
    setSomethingChange(true);
    setForm({ ...form, [event.target.name]: event.target.checked });
  };

  return (
    <Paper className={classes.papperPadding}>
      <Grid container alignItems="center" justify="center" spacing={2}>
        <Grid item xs={12} sm={6}>
          <form id="produk-form" onSubmit={handleSubmit} noValidate>
            <TextField
              id="nama"
              name="nama"
              label="Nama Produk"
              margin="normal"
              fullWidth
              required
              value={form.namaPenginapan}
              onChange={handleChange}
              error={error.namaPenginapan ? true : false}
              helperText={error.namaPenginapan}
              disabled={isSubmitting}
              variant="outlined"
            />

            <TextField
              id="namaPemilik"
              name="namaPemilik"
              label="Nama Pemilik"
              margin="normal"
              fullWidth
              required
              value={form.namaPemilik}
              onChange={handleChange}
              error={error.namaPemilik ? true : false}
              helperText={error.namaPemilik}
              disabled={isSubmitting}
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isKoordinat}
                    onChange={handleKoordinat}
                    name="koordinat"
                  />
                }
                label="Isi koordinat (latitude dan longitude) juga ?"
              />
            </FormGroup>

            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                <TextField
                  id="lat"
                  name="lat"
                  label="Latitude (LAT)"
                  margin="normal"
                  type="number"
                  fullWidth
                  required
                  value={form.lat}
                  onChange={handleChange}
                  error={error.lat ? true : false}
                  helperText={error.lat}
                  disabled={!isKoordinat || isSubmitting}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="long"
                  name="long"
                  label="longitude (LONG)"
                  margin="normal"
                  type="number"
                  fullWidth
                  required
                  value={form.long}
                  onChange={handleChange}
                  error={error.long ? true : false}
                  helperText={error.long}
                  disabled={!isKoordinat || isSubmitting}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Autocomplete
              className={classes.comboLokasi}
              value={form.kota}
              onChange={(event, newValue) => {
                setValue(newValue);
                form.kota = newValue;
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                form.kota = newInputValue;
                setSomethingChange(true);
              }}
              name="kota"
              options={options}
              getOptionLabel={(option) => option}
              disabled={isSubmitting}
              style={{ width: 300 }}
              renderInput={(params) => {
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
            {valueJenisPenginapan === "Kost-kostan" ? (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.isTahunan}
                      onChange={handleIsTahunan}
                      name="isTahunan"
                    />
                  }
                  label="kostan menerapkan iuran tahunan ?"
                />
              </FormGroup>
            ) : (
              ""
            )}

            <TextField
              id="jumlahKamar"
              name="jumlahKamar"
              label={
                form.jenisPenginapan === "Kontrakan"
                  ? "Jumlah Rumah Kontrakan"
                  : form.jenisPenginapan === "Ruko"
                  ? "Jumlah Ruko"
                  : "Jumlah Kamar"
              }
              margin="normal"
              type="number"
              fullWidth
              value={
                form.jenisPenginapan === "Kontrakan" ||
                form.jenisPenginapan === "Ruko"
                  ? (form.jumlahKamar = 1)
                  : form.jumlahKamar
              }
              onChange={handleChange}
              error={error.jumlahKamar ? true : false}
              helperText={error.jumlahKamar}
              disabled={
                form.jenisPenginapan === "Kontrakan" ||
                form.jenisPenginapan === "Ruko"
                  ? true
                  : isSubmitting
              }
              variant="outlined"
            />

            {/* FASILITAS */}
            <Grid container direction="column">
              <Grid item xs>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Fasilitas Secara Umum
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.fasilitasUmum["kamarMandiDalam"]}
                          onChange={handleFasilitas}
                          name="kamarMandiDalam"
                        />
                      }
                      label="Kamar mandi dalam"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.fasilitasUmum["wifi"]}
                          onChange={handleFasilitas}
                          name="wifi"
                        />
                      }
                      label="WIFI"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.fasilitasUmum["listrikSendiri"]}
                          onChange={handleFasilitas}
                          name="listrikSendiri"
                        />
                      }
                      label="Listrik sendiri (prabayar)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.fasilitasUmum["ac"]}
                          onChange={handleFasilitas}
                          name="ac"
                        />
                      }
                      label="AC"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.fasilitasUmum["meja"]}
                          onChange={handleFasilitas}
                          name="meja"
                        />
                      }
                      label="Meja"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.fasilitasUmum["lemari"]}
                          onChange={handleFasilitas}
                          name="lemari"
                        />
                      }
                      label="Lemari"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.fasilitasUmum["kasur"]}
                          onChange={handleFasilitas}
                          name="kasur"
                        />
                      }
                      label="Kasur"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.fasilitasUmum["tempatJemur"]}
                          onChange={handleFasilitas}
                          name="tempatJemur"
                        />
                      }
                      label="Tempat Jemur"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs>
                <TextField
                  id="fasilitas"
                  name="fasilitas"
                  label="Fasilitas Lainnya"
                  fullWidth
                  value={form.fasilitas}
                  onChange={handleChange}
                  error={error.fasilitas ? true : false}
                  helperText={error.fasilitas}
                  disabled={isSubmitting}
                  className={classes.fasilitas}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <TextField
              id="deskripsi"
              name="deskripsi"
              label="Deskripsi Penginapan"
              margin="normal"
              fullWidth
              multiline
              rows={5}
              value={form.deskripsi}
              onChange={handleChange}
              error={error.deskripsi ? true : false}
              helperText={error.deskripsi}
              disabled={isSubmitting}
              variant="outlined"
            />

            <div className={classes.actionButton}>
              <Button
                form="produk-form"
                type="submit"
                color="primary"
                disabled={isSubmitting || !isSomethingChange}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Simpan
              </Button>
            </div>
          </form>
        </Grid>

        <Grid item xs={6} sm={6}>
          <Grid className={classes.uploadItemFotoProduk}>
            <List className={classes.rootImg}>
              {listImage.map((data, index) => {
                const counting = index + 1;
                const imgFile = data.data().url;
                return (
                  <div>
                    <ListItem key={data.id} role={undefined} dense button>
                      <img
                        src={imgFile}
                        width={80}
                        height={80}
                        className={classes.imgThumb}
                        alt="img"
                      />
                      <ListItemText className={classes.listAlign}>
                        <Typography color="primary" variant="subtitle1">
                          <strong>
                            {selectedValue === `${counting}`
                              ? "Gambar Utama"
                              : ""}
                          </strong>
                        </Typography>
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <Radio
                          checked={selectedValue === `${counting}`}
                          onChange={handleRadioChange}
                          value={`${counting}`}
                          name="radio-button-demo"
                        />
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={deleteImgCallback(data)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
            </List>
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
                color="primary"
                startIcon={<UploadIcon />}
              >
                Upload Foto
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
