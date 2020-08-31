import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

import { useFirebase } from '../../../../components/FirebaseProvider';
import { useDocument } from 'react-firebase-hooks/firestore';

// react-router

import AppLoading from '../../../../components/AppLoading'
import {currency} from '../../../../utils/formatter'

// styles
import useStyles from './styles'

// pesanan provider
import {usePesanan} from '../../../../components/PesananProvider'


function Checkout({match, history}) {
    const {firestore,user} = useFirebase()
    const produkDoc = firestore.collection('pesanan').doc(`${match.params.checkoutId}`)
    const [snapshot, loading] = useDocument(produkDoc)
    const classes = useStyles();    
    const [state, setState] = useState({})
    const [isSubmitting, setSubmitting] = useState(false)
  

    useEffect(() => {
        if (snapshot){
          setState(snapshot.data())
        }
    }, [snapshot])

    function sleep(milliseconds) {
      setSubmitting(true)
      const date = Date.now();
      let currentDate = null;
      do {
        currentDate = Date.now();
      } while (currentDate - date < milliseconds);
      setSubmitting(false)  
    }

    if (loading){
      return <AppLoading message="Checkout"/>
    }
    const handleCheckout = async (e) => {
      e.preventDefault()
      
      await sleep(2000)  
      
      history.push(`/view/penginapan/${user.uid}/checkout/bayar`)    
      
    }

    console.log(isSubmitting)

    return (
        <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Penginapan</TableCell>
                    <TableCell align="right">Jenis Iuran</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <strong>{state.namaPenginapan}</strong>
                      </TableCell>
                      <TableCell align="right">{state.jenisIuran}</TableCell>
                      <TableCell align="right">{state.harga}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                      </TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                          <Button disabled={isSubmitting} variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        </div>
    )
}

export default Checkout;








  
    
  

