import React from 'react';
import Typography from '@material-ui/core/Typography'
import AppLoading from '../../../../components/AppLoading'
const Proses = () => {
    let loading = true;
    function timeout(delay) {
        return new Promise( res => setTimeout(res =>  loading=false, delay)) }


    if (loading){
        return <AppLoading message="Memproses pesanan..."/>
    } else {
        
    }

    timeout(2000);
    loading=false;

    return (
        <div>
            
            <Typography variant="h4" color="textSecondary">PEMBAYARAN BERHASIL</Typography>
        </div>
    );
}

export default Proses;
