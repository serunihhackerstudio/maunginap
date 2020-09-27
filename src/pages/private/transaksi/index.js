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

// dialog/modal
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// styles
import useStyles from "./styles";
import { currency } from "../../../utils/formatter";
import { useSnackbar } from "notistack";
import { useFirebase } from "../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";

function Transaksi() {
  const { enqueueSnackbar } = useSnackbar();
  const { firestore, user } = useFirebase();
  const query = firestore.collection("pesanan");
  const [snapshot, loading] = useCollection(query);
  const [produkItems, setProdukItems] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const classes = useState();

  useEffect(() => {
    if (snapshot) {
      console.log(snapshot.docs);
      setProdukItems(snapshot.docs);
    }
  }, [snapshot]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const approveCallback = (pesananId) => async () => {
    try {
      await firestore
        .collection("pesanan")
        .doc(`${pesananId}`)
        .set({ approvalStatus: true }, { merge: true });
    } catch (e) {}
  };

  return (
    <>
      {produkItems.length <= 0 && (
        <Typography>Belum ada data Kost-kostan / peninapan</Typography>
      )}

      <Grid container spacing={5}>
        {produkItems.map((produkDoc) => {
          const produkData = produkDoc.data();
          console.log(produkData);
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
                    Approve
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
