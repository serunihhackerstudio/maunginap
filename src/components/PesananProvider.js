import React, {createContext, useContext} from 'react';

export const PesananContext = createContext()

export const usePesanan = () => {
    return useContext(PesananContext)
}

const PesananProvider = (props) => {
    const [formBooking, setFormBooking]  = React.useState({
        namaKTP:'',
        nomorKTP:'',
        jumlahKamar:'',
        namaPenginapan:'',
        harga:'',
        jenisIuran:''

    })

    
    return (
        <PesananContext.Provider value={{formBooking, setFormBooking}}>
            {props.children}
        </PesananContext.Provider>
    );
}

export default PesananProvider;

