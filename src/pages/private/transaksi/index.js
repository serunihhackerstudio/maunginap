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

function Transaksi() {
  const { enqueueSnackbar } = useSnackbar();
  const { firestore } = useFirebase();
  const query = firestore.collection("pesanan");
  const [snapshot, loading] = useCollection(query);
  const [produkItems, setProdukItems] = useState([]);
  const [jumlahKamar, setJumlahKamar] = useState(0);
  const [penginapanId, setPenginapanId] = useState("");
  const classes = useState();

  useEffect(() => {
    if (snapshot) {
      console.log(snapshot.docs);
      setProdukItems(snapshot.docs);
    }
  }, [snapshot]);

  const approveCallback = (produkdocId) => async () => {
    try {
      if (window.confirm("Apakah pesanan ini telah terkonfirmasi ? ")) {
        await firestore
          .collection("pesanan")
          .doc(`${produkdocId}`)
          .set({ approvalStatus: true }, { merge: true });
        enqueueSnackbar(`Pesanan terkonfirmasi`, {
          variant: "success",
        });
      }
    } catch (e) {}
  };

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
        enqueueSnackbar(`Berhasil`, {
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
        <Typography>Belum ada data Kost-kostan / peninapan</Typography>
      )}

      <Grid container spacing={5}>
        {produkItems.map((produkDoc) => {
          const produkData = produkDoc.data();
          return (
            <Grid key={produkDoc.id} item={true} xs={12} xm={12} md={4} lg={4}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={produkData.foto}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {produkData.namaPenginapan} ({currency(produkData.harga)})
                    </Typography>
                    <Typography variant="body1" color="primary" component="p">
                      <strong>Kode boking :</strong>
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {produkData.kodeBooking}
                    </Typography>
                    <Typography variant="body1" color="primary" component="p">
                      <strong>informasi tambahan :</strong>
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
                  <Button
                    disabled={produkData.approvalStatus ? true : false}
                    size="small"
                    color="primary"
                    variant="contained"
                    // onClick={}
                    onClick={approveCallback(produkDoc.id)}
                  >
                    {produkData.approvalStatus
                      ? "Siap ditempati"
                      : "Konfirmasi"}
                  </Button>

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
