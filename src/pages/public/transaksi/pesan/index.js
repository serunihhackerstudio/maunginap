import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

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
import useStyles from './styles'

function Pesan({match}) {
    // const {firestore,storage,user} = useFirebase()
    
    // const produkDoc = firestore.collection('penginapan').doc('data').collection('produk').doc(`${match.params.penginapanId}`)
    // const [snapshot, loading] = useDocument(produkDoc)
    // const [state, setstate] = React.useState({})
    // const classes = useStyles();    
    

    // React.useEffect(()=>{
    //     if (snapshot){
    //         setstate(snapshot.data())
    //     }
    // }, [snapshot])

    // if (loading){
    //     return <AppLoading />
    // }

    return (
        <div>            
            Detail Pesan
        </div>
    )
}
export default Pesan;