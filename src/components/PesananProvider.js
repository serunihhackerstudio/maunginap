import React, { createContext, useContext } from "react";
import ID from "../utils/idgenerator";

// image assets
import bank_mandiri from "../assets/bank_mandiri.jpg"
import bank_bca from "../assets/bank_bca.jpg"

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
  const [formBank, setFormBank] = React.useState({});
  const [akunBank, setAkunBank] = React.useState([
    {
      fotoBank:bank_mandiri,
      bank: "Mandiri",
      noRek: "164-0000-9823-94820",
      atasNama: "Toufani Rizal Alfarisi",
      id: `${idGenerator}?mandiri`,
      button: "Pilih Mandiri",
    },
    {
      fotoBank:bank_bca,
      bank: "BCA",
      noRek: "998-875-956-0989",
      atasNama: "Toufani Rizal Alfarisi",
      id: `${idGenerator}?bca`,
      button: "Pilih BCA",
    },
  ]);

  // form Perpanjangan
  const [pesananId, setPesananId] = React.useState("");

  const progressPembayaran =
    "Terima kasih telah melakukan pemesanan. Silahkan lakukakan transaksi pembayarannya sesuai dengan informasi berikut ini. Tiga digit terakhir dari nilai transaksi ini untuk memudahkan kami dalam mengkonfirmasi pesanan Anda. Setelah Anda transfer, silahkan kirim foto bukti transfer ke nomor WhatsApp kami.";
  const nomorWA = "085-123-456-789"
    const jenisPenginapanOpt = ["Kost-kostan", "Kontrakan"];
  const kotaOpt = ["Surabaya", "Mataram"];
  const [formPesanan, setFormPesanan] = React.useState({});
  const [telepon, setTelepon] = React.useState("")
  return (
    <PesananContext.Provider
      value={{
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
        setTelepon
      }}
    >
      {props.children}
    </PesananContext.Provider>
  );
};

export default PesananProvider;
