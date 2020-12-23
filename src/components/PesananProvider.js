import React, { createContext, useContext } from "react";

// // image assets
// import bank_mandiri from "../assets/bank_mandiri.jpg"
// import bank_bca from "../assets/bank_bca.jpg"

import bank_mandiri_syariah from "../assets/bank_mandiri_syariah.jpg";
import bank_bri from "../assets/bank_bri.png";
export const PesananContext = createContext();

export const usePesanan = () => {
  return useContext(PesananContext);
};

const PesananProvider = (props) => {
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
  const [formBank, setFormBank] = React.useState({});
  const [akunBank, setAkunBank] = React.useState([
    {
      namaBank:"Bank BRI",
      noRek:"4692-01-032593-53-9",
      atasNama:"Raden Khaerul Peratama",
      pict:bank_bri
    },
    {
      namaBank:"Bank Mandiri Syariah",
      noRek:"709-671-279-5",
      atasNama:"Raden Khaerul Peratama",
      pict:bank_mandiri_syariah
    },

  ]);

  // form Perpanjangan
  const [pesananId, setPesananId] = React.useState("");

  const progressPembayaran =
    "Terima kasih telah melakukan pemesanan. Silahkan lakukakan transaksi pembayarannya sesuai dengan informasi berikut ini. Tiga digit terakhir dari nilai transaksi ini untuk memudahkan kami dalam mengkonfirmasi pesanan Anda. Setelah Anda transfer, silahkan kirim foto bukti transfer ke nomor WhatsApp kami.";
  const nomorWA = "081-990-321-358";
    const jenisPenginapanOpt = ["Kost-kostan", "Kontrakan", "Ruko"];
  const kotaOpt = ["Surabaya", "Mataram"];
  const [formPesanan, setFormPesanan] = React.useState({});
  const [telepon, setTelepon] = React.useState("");
  const [detailParam, setDetailParam] = React.useState("");
  const [searchText, setSearchText] = React.useState([])
  return (
    <PesananContext.Provider
      value={{
        searchText, 
        setSearchText,
        setDetailParam,
        detailParam,
        nomorWA,
        pesananId,
        setPesananId,
        jenisPenginapanOpt,
        kotaOpt,
        formBooking,
        setFormBooking,
        akunBank,
        progressPembayaran,
        needLogin,
        setNeedLogin,
        jumlahPesanan,
        setJumlahPesanan,
        formBank,
        setFormBank,
        formPesanan,
        setFormPesanan,
        setAkunBank,
        telepon, 
        setTelepon,
      }}
    >
      {props.children}
    </PesananContext.Provider>
  );
};

export default PesananProvider;
