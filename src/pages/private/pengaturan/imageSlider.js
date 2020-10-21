import React, {useState, useEffect} from "react";
import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles/imageSlider";
import { useSnackbar } from "notistack";
import { useFirebase } from "../../../components/FirebaseProvider";
import AppPageLoading from "../../../components/AppPageLoading";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ID from "../../../utils/idgenerator"

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

export default function ImageSlider({ match }) {
  const {firestore, storage} = useFirebase()
  const {enqueueSnackbar} = useSnackbar()
  const classes = useStyles();
  const produkStorageRef = storage.ref(`promosi`);
  const produStorageItem = firestore.collection("promosi")
  const [snapshot, loading] = useCollection(produStorageItem)
  const [state, setState] = useState([])
  const [isSubmitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    form:""
  })

  const [error, setError] = useState({
    foto:""
  })
  
  // // query/load data
  useEffect(() => {
    if (snapshot){
      const data = snapshot.docs
      setState(data)
    }
  }, [snapshot])


  const deleteImgCallback = (data) => async (e) => {
    await produStorageItem
      .doc(`${data.id}`)
      .get()
      .then((doc) => {
        storage.refFromURL(doc.data().url).delete();
        doc.ref.delete();
      });
    enqueueSnackbar("Gambar terhapus", {
      variant: "success",
    });
  };

  const handleUploadFile = (e) => {
    setSubmitting(true);
    const file = e.target.files[0];
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
          firestore.collection("promosi").doc(`${idImg}`).set(
            {
              idImgPromosi: idImg,
              url: url,
            },
            { merge: true }
          );
        });

        const fotoUrl = await fotoSnapshot.ref.getDownloadURL();
        setForm({ foto: fotoUrl});
      };
      reader.readAsDataURL(file);
    
    enqueueSnackbar("Upload berhasil", {
      variant: "success",
    });
    setSubmitting(false);
  };

  return (
      <Grid container spacing={6} alignItems="center">
        <Grid item xs className={classes.root}>
        <div className={classes.pengaturanIdentitas}>
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
                startIcon={<CloudUploadIcon />}
              >
                Upload Foto 
              </Button>
            </label>
          </div>
        </Grid>
        <Grid item xs>
        <Typography variant="subtitle1" color="textSecondary"> 
          Gambar promosi saat ini :
        </Typography>
        <List className={classes.rootImg}>
          {loading ? (<AppPageLoading />) : (
              state.map((data, index) => {
                const counting = index + 1;
                const imgFile = data.data().url;
                return (
                  <div>
                    <ListItem key={data.id} role={undefined} dense button>
                      
                      <ListItemText className={classes.listAlign}>
                      <a href={"#"}>
                        <img
                          src={imgFile}
                          width={300}
                          height={100}
                          className={classes.imgThumb}
                        />
                      </a>
                      </ListItemText>
                      <ListItemSecondaryAction>
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
              })
          )}
              
            </List>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    
  );
}
