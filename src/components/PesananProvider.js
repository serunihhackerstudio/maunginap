import React, { createContext, useContext } from "react";
import ID from "../utils/idgenerator";

export const PesananContext = createContext();

export const usePesanan = () => {
  return useContext(PesananContext);
};

const PesananProvider = (props) => {
  const idGenerator = ID();
  const [formBooking, setFormBooking] = React.useState({
    namaKTP: "",
    nomorKTP: "",
    jumlahKamar: "",
    namaPenginapan: "",
    harga: "",
    jenisIuran: "",
  });
  const [needLogin, setNeedLogin] = React.useState(false);
  const [jumlahPesanan, setJumlahPesanan] = React.useState(0);
  const [akunBank, setAkunBank] = React.useState([
    {
      fotoBank:
        "https://statik.tempo.co/data/2018/02/06/id_682386/682386_720.jpg",
      bank: "Mandiri",
      noRek: "164-0000-9823-94820",
      atasNama: "Toufani Rizal Alfarisi",
      id: `${idGenerator}?mandiri`,
      button: "Pilih Mandiri",
    },
    {
      fotoBank:
        "https://bursadesain.com/wp-content/uploads/2016/08/VECTOR-LOGO-BANK-BCA.jpg",
      bank: "BCA",
      noRek: "998-875-956-0989",
      atasNama: "Toufani Rizal Alfarisi",
      id: `${idGenerator}?bca`,
      button: "Pilih BCA",
    },
  ]);

  const progressPembayaran =
    "Terima kasih telah melakukan pemesanan. Silahkan lakukakan transaksi pembayarannya sesuai dengan informasi berikut ini : ";

  return (
    <PesananContext.Provider
      value={{
        formBooking,
        setFormBooking,
        akunBank,
        progressPembayaran,
        needLogin,
        setNeedLogin,
        jumlahPesanan,
        setJumlahPesanan,
      }}
    >
      {props.children}
    </PesananContext.Provider>
  );
};

export default PesananProvider;
