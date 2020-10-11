import React, { useState, useEffect } from "react";

// material-ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import { useSnackbar } from "notistack";

// firebase
import { useFirebase } from "../../../components/FirebaseProvider";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";

// css
import useStyles from "./styles/identitas";

// component
import AppPageLoading from "../../../components/AppPageLoading";
import ID from "../../../utils/idgenerator";

// LIST
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';




function Kota() {
  const { firestore, user } = useFirebase();
  const genId = ID();
  const dataDoc = firestore.collection("kota").doc(`${genId}`);
  const [queryDataItems, setQueryDataItems] = useState([])
  const queryData = firestore.collection("kota")
  const [snapshot, loading] = useCollection(queryData)
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    kota: "",
  });
  form.kota = form.kota.toUpperCase()

  const [error, setError] = useState({
    kota: "",
  });

  React.useEffect(()=> {
    if (snapshot){
      setQueryDataItems(snapshot.docs)
    }
  }, [snapshot])

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

  const deleteCallback = (data) => async (e) => {
    console.log("CLICKED")
    console.log(data)
    await firestore.collection("kota").doc(`${data}`)
    .delete().then(() => console.log("BERHASIL DIHAPUS"))
    .catch(error => console.log(e.message))
  }

  return (
    <div className={classes.pengaturanIdentitas}>
      <Grid container spacing={6}>
        <Grid item xs>
        <form onSubmit={handleSubmit} noValidate>
        <TextField
          name="kota"
          id="kota"
          label="Masukan Nama Kota"
          value={form.kota}
          fullWidth
          required
          variant="outlined"
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
          Tambah
        </Button>
      </form>
      <Divider orientation="vertical" flexItem />
        </Grid>
      
        <Grid item xs>
          {loading ? <AppPageLoading /> : (
            <List className={classes.root}>
            {queryDataItems.map(data => {
              const kota = data.data().kota
              return (
                <ListItem key={data.id} role={undefined} dense button>
                <ListItemText primary={`${kota}`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={deleteCallback(data.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              )
            })}
          </List>
          )}
        
        </Grid>

      </Grid>
      
    </div>
  );
}

export default Kota;
