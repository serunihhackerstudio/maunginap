import React, {useState, useEffect} from "react";
import Divider from '@material-ui/core/Divider';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles/diskon";
import { useSnackbar } from "notistack";
import { useFirebase } from "../../../components/FirebaseProvider";
import AppPageLoading from "../../../components/AppPageLoading";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

export default function Diskon() {
  const {firestore} = useFirebase()
  const {enqueueSnackbar} = useSnackbar()
  const classes = useStyles();
  const queryData =   firestore.collection(`penginapan`).doc("data").collection("produk");
  const [snapshot, loading] = useCollection(queryData)
  const [state, setState] = useState([])
  const [isSubmitting, setSubmitting] = useState(false)
  const [diskon, setDiskon] = useState(0)
  const [form, setForm] = useState({
    diskon:0
  })
  
  // query/load data
  useEffect(() => {
    if (snapshot){
      const data = snapshot.docs
      setState(data)
      setDiskon(data[0].data().diskon)
    }
  }, [snapshot])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    for (let data of state){
      await queryData.doc(`${data.id}`).set({...form}, {merge:true})
      
    }
    enqueueSnackbar("Diskon diatur untuk semua produk", {variant:"success"})
    setSubmitting(false)
  }

  const handleChange = (e) => {
    setForm({
        ...form, 
        [e.target.name]:e.target.value
      })
  }

  return (
      <Grid container spacing={6}>
        <Grid item xs>
        <div className={classes.pengaturanIdentitas}>
          <form 
            onSubmit={handleSubmit} 
            noValidate>
            <TextField
              name="diskon"
              id="diskon"
              label="Set Diskon (%)"
              type="number"
              value={form.diskon}
              fullWidth
              required
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              disabled={isSubmitting}
            />

            <Button
              className={classes.tombolSimpan}
              variant="contained"
              type="submit"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress color="inherit" size={20}/>:"Set diskon"}
            </Button>
          </form>
          </div>
        </Grid>
        <Grid item xs>
        <Typography variant="subtitle1" color="textSecondary"> 
          Settingan diskon saat ini :
        </Typography>
        <Typography variant="h4" color="primary"> 
          {loading ? <CircularProgress /> : `${diskon} %`}
        </Typography>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    
  );
}
