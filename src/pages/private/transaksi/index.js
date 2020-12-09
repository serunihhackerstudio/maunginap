import React, { useEffect, useState } from "react";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";

// styles
import { currency } from "../../../utils/formatter";
import { useSnackbar } from "notistack";
import { useFirebase } from "../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";

// component
import AppPageLoading from "../../../components/AppPageLoading";
import AppLoading from "../../../components/AppLoading";
import ID from "../../../utils/idgenerator"
import {sendEmailRefund} from "../../../config/mailserver";

function Transaksi() {
  const { enqueueSnackbar } = useSnackbar();
  const idGenerator = ID();
  const { firestore, user } = useFirebase();
  const query = firestore.collection("pesanan").orderBy("created", "desc");
  const [snapshot, loading] = useCollection(query);
  const [produkItems, setProdukItems] = useState([]);
  const classes = useState();
  const notifData = firestore.collection("notification").doc(`${idGenerator}`)
    // const [msgNotif, setMsgNotif] = React.useState([]);

  useEffect(() => {
    if (snapshot) {
      console.log(snapshot.docs);
      setProdukItems(snapshot.docs);
    }
  }, [snapshot]);

  const approveCallback = (produk) => async () => {
    try {
      if (window.confirm("Apakah pesanan ini telah terkonfirmasi ? ")) {
        
        if (produk.data().statusPerpanjang === true){
          await firestore
          .collection("pesanan")
          .doc(`${produk.id}`)
          .set({ statusPerpanjang: true }, { merge: true });
          await notifData.set({
              userId : user.uid,
              created: new Date(),
              status:"Berhasil diperpanjang",
              namaPenginapan:produk.data().namaPenginapan,
              kodeBooking:produk.data().kodeBooking
            })
          enqueueSnackbar(`Pesanan diperpanjang`, {
            variant: "success",
          });

        } else {
          await notifData.set({
            userId : user.uid,
            created: new Date(),
            status:"Siap ditempati",
            namaPenginapan:produk.data().namaPenginapan,
            kodeBooking:produk.data().kodeBooking
          })
        }
          await firestore
            .collection("pesanan")
            .doc(`${produk.id}`)
            .set({ approvalStatus: true, statusPerpanjang: false }, { merge: true });
      }

      enqueueSnackbar(`Pesanan terkonfirmasi`, {
        variant: "success",
      });

    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: "error",
      });
    }
  };

  const perpanjangCallback = (produkDoc) => async () => {
    try {
      if (window.confirm("Apakah pesanan ini telah dikonfirmasi untuk perpanjangan ? ")) {
        await firestore
          .collection("pesanan")
          .doc(`${produkDoc.id}`)
          .set({ statusPerpanjang: true }, { merge: true });
        await notifData.set({
            userId : user.uid,
            created: new Date(),
            status:"Berhasil diperpanjang",
            namaPenginapan:produkDoc.data().namaPenginapan,
            kodeBooking:produkDoc.data().kodeBooking
          })
        enqueueSnackbar(`Pesanan diperpanjang`, {
          variant: "success",
        });
      }
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: "error",
      });
  }
}

const refundCallback = (produkDoc) => async () => {
  try {
    if (window.confirm("Apakah uang telah direfund ? ")) {
      await firestore
        .collection("pesanan")
        .doc(`${produkDoc.id}`)
        .set({ statusPembatalan: false, statusPembatalanDesc: true }, { merge: true });
      await notifData.set({
          userId : user.uid,
          created: new Date(),
          status:"Pengembalian dana selesai",
          namaPenginapan:produkDoc.data().namaPenginapan,
          kodeBooking:produkDoc.data().kodeBooking
        })
      
      // email pengembalian dana
      let total;
      if (!produkDoc.data().statusPerpanjang){
        total = parseInt(produkDoc.data().harga) + produkDoc.data().codeHarga
      } else {
        const diskon = produkDoc.data().harga - produkDoc.data().harga * (produkDoc.data().diskon / 100)
        total = diskon+produkDoc.data().codeHarga
      }
      sendEmailRefund(
        "Refund", 
        produkDoc.data().userEmail, 
        produkDoc.data().kodeBooking, 
        total
      )

      enqueueSnackbar(`Refund selesai`, {
        variant: "success",
      });
    }
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: "error",
    });
}
}

  const quitApproval = (produkdocId) => async () => {
    try {
      if (window.confirm("Konfirmasi pemesan meninggalkan penginapan ? ")) {
        await firestore
          .collection("pesanan")
          .doc(`${produkdocId}`)
          .get()
          .then((res) => {
            firestore
              .collection("penginapan")
              .doc("data")
              .collection("produk")
              .doc(res.data().penginapanId)
              .get()
              .then((child) => {
                firestore
                  .collection("penginapan")
                  .doc("data")
                  .collection("produk")
                  .doc(`${res.data().penginapanId}`)
                  .set(
                    { jumlahKamar: child.data().jumlahKamar + 1 },
                    { merge: true }
                  );
              });
          });

        await firestore.collection("pesanan").doc(`${produkdocId}`).delete();
        // await firestore.collection("notification").doc(`${produkdocId}`).delete();
        enqueueSnackbar(`Layanan selesai`, {
          variant: "success",
        });
      }
    } catch (e) {}
  };

  if (loading) {
    return <AppPageLoading />;
  }

  return (
    <>
      {produkItems.length <= 0 && (
        <AppLoading message="Tidak ada data ditemukan..." />
      )}

      <Grid container spacing={5}>
        {produkItems.map((produkDoc) => {
          const produkData = produkDoc.data();
          const dateBooking = produkData.tanggalPesan
          // const hargaMula = parseInt(produkData.harga) + produkData.codeHarga
          const diskon = produkData.harga - produkData.harga * (produkData.diskon / 100)
          return (
            <Grid key={produkDoc.id} item={true} xs={12} xm={12} md={3} lg={3}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={produkData.foto}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {produkData.namaPenginapan} ({!produkData.statusPerpanjang ? currency(parseInt(produkData.harga) + produkData.codeHarga) : currency(diskon+produkData.codeHarga)})
                    </Typography>
                    <Typography variant="body1" color="primary" component="p">
                      <strong>Kode boking :</strong>
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      #{produkData.kodeBooking} ({produkData.jenisPenginapan})
                    </Typography>
                    <Typography variant="body1" color="primary" component="p">
                      <strong>Tanggal booking :</strong>
                    </Typography>

                    <Typography variant="body1" color="textSecondary" component="p">
                      {dateBooking.toLocaleString()}
                    </Typography>

                    <Typography variant="body1" color="primary" component="p">
                      <strong>Informasi tambahan :</strong>
                    </Typography>

                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {produkData.namaKTP}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {produkData.userEmail}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      KTP. {produkData.nomorKTP}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      HP/WA. {produkData.nomorHpWa}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      Transfer ke {produkData.pilihBank}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {produkData.noRek}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                {produkData.statusPembatalan ? (
                  <Button size="small" color="secondary" variant="contained" onClick={refundCallback(produkDoc)}>Refund</Button>
                ) : produkData.statusPembatalanDesc ? (
                  <Button size="small" color="secondary" variant="contained" disabled="true">Refunded</Button>
                ) : (
                  ""
                ) }
                
                {produkData.approvalStatus ? (
                    <Button
                    disabled={!produkData.statusPerpanjang ? true : false}
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={perpanjangCallback(produkDoc)}
                  >
                    Perpanjang
                  </Button>
                  ) : (
                    <Button
                      disabled={false}
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={approveCallback(produkDoc)}
                    >
                      {produkData.statusPerpanjang ? "Perpanjang" : "Konfirmasi "}
                    </Button>
                  )
        }
                
                  <Button
                    disabled={!produkData.approvalStatus ? true : false}
                    size="small"
                    color="primary"
                    variant="contained"
                    // onClick={}
                    onClick={quitApproval(produkDoc.id)}
                  >
                    {!produkData.approvalStatus ? "Keluar" : "Keluar"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Transaksi;
