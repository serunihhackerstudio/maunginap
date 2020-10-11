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
  const [formBank, setFormBank] = React.useState({});
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

  // form Perpanjangan
  const [pesananId, setPesananId] = React.useState("");

  const progressPembayaran =
    "Terima kasih telah melakukan pemesanan. Silahkan lakukakan transaksi pembayarannya sesuai dengan informasi berikut ini. Setelah Anda transfer, silahkan kirim foto bukti transfer ke nomor WhatsApp kami.";
  const nomorWA = "085-123-456-789"
    const jenisPenginapanOpt = ["Kost-kostan", "Kontrakan"];
  const kotaOpt = ["Surabaya", "Mataram"];
  const [formPesanan, setFormPesanan] = React.useState({});
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
      }}
    >
      {props.children}
    </PesananContext.Provider>
  );
};

export default PesananProvider;
