import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import useStyles from '../dialog/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useFirebase } from '../../../../components/FirebaseProvider';
import { useDocument } from 'react-firebase-hooks/firestore';
import SendIcon from '@material-ui/icons/Send';
import ButtonBase from '@material-ui/core/ButtonBase';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// react-router

import AppLoading from '../../../../components/AppLoading'
import {currency} from '../../../../utils/formatter'

function DetailProduk({match}) {
    const {firestore,storage,user} = useFirebase()
    
    const produkDoc = firestore.collection('penginapan').doc('data').collection('produk').doc(`${match.params.penginapanId}`)
    const [snapshot, loading] = useDocument(produkDoc)
    const [state, setstate] = React.useState({})
    const classes = useStyles();    
    

    React.useEffect(()=>{
        if (snapshot){
            setstate(snapshot.data())
        }
    }, [snapshot])

    if (loading){
        return <AppLoading />
    }

    return (
        <div>
            
            <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={state.foto} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography  variant="h5" color="primary">
                  {state.namaPenginapan}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {currency(state.harga)}
                </Typography>
                <Button startIcon={<SendIcon />} className={classes.btn} variant="contained" color="primary">
                    Pesan 
                </Button>
                <ButtonBase>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Jenis iuran</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    // onChange={handleChange}
                    >
                    <MenuItem value={10}>Bulanan</MenuItem>
                    <MenuItem value={20}>Tahunan</MenuItem>
                    </Select>
                </FormControl>
                </ButtonBase>
                <Typography variant="body2" gutterBottom color="textSecondary">
                  {state.lokasi}
                </Typography>
                <Typography variant="body2">Deskripsi : </Typography>
                <Typography variant="body2" color="textSecondary">
                  {state.deskripsi}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
              <IconButton aria-label="add to favorites">
              <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="add to favorites">
              <ShareIcon />
              </IconButton>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

            
        </div>
    )
}
export default DetailProduk;