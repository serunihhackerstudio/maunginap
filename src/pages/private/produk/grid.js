import React, { useState, useEffect } from "react";

// material ui
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";

// tombol button produk
// import IconButton from '@material-ui/core/IconButton'
// import EditIcon from '@material-ui/icons/Edit'
// import DeleteIcon from '@material-ui/icons/Delete';

// styles
import useStyles from "./styles/grid";

// page component
import AddDialog from "./add";
import { useFirebase } from "../../../components/FirebaseProvider";
import AppPageLoading from "../../../components/AppPageLoading";
import AppLoading from "../../../components/AppLoading";
import { useCollection } from "react-firebase-hooks/firestore";

// utils mata uang ke rupiah
import { currency } from "../../../utils/formatter";

// react router
import { Link } from "react-router-dom";

function GridProduk() {
  const classes = useStyles();

  const { firestore, storage } = useFirebase();

  const [openAddDialog, setOpenAddDialog] = useState(false);

  const produkCol = firestore.collection(`penginapan/data/produk`);

  const [snapshot, loading] = useCollection(produkCol);

  const [produkItems, setProdukItems] = useState([]);

  useEffect(() => {
    if (snapshot) {
      setProdukItems(snapshot.docs);
    }
  }, [snapshot]);

  if (loading) {
    return <AppPageLoading />;
  }

  const handleFab = (e) => {
    setOpenAddDialog(true);
  };

  const handleDelete = (produkDoc) => async (e) => {
    try {
      if (window.confirm("Apakah Anda yakin ingin menghapus item ini ? ")) {
        await produkDoc.ref.delete();
        const fotoUrl = produkDoc.data().foto;
        await firestore
          .collection("imgthumbnail")
          .where("penginapanId", "==", `${produkDoc.id}`)
          .get()
          .then((item) => {
            item.docs.forEach((doc) => {
              doc.ref.delete();
              storage.refFromURL(doc.data().url).delete();
            });
            console.log("delete image thumbnail berhasil");
          });

        if (fotoUrl) {
          await storage.Storage.refFromUrl(fotoUrl).delete();
          console.log("delete berhasil");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {produkItems.length <= 0 && (
        <AppLoading message="Tidak ada data ditemukan..." />
      )}

      <Grid container spacing={5}>
        {produkItems.map((produkDoc) => {
          const produkData = produkDoc.data();
          console.log(produkData);
          return (
            <Grid key={produkDoc.id} item={true} xs={12} xm={12} md={3} lg={3}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={produkData.foto}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {produkData.namaPenginapan}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {produkData.lokasi}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {currency(produkData.harga)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/bWF1bmdpbmFwLmNvbS13ZWNhbm1ha2VpdDIwMjAtc3Vrc2VzJmJlcmhhc2ls/produk/edit/${produkDoc.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleDelete(produkDoc)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Fab color="primary" onClick={handleFab} className={classes.fab}>
        <AddIcon />
      </Fab>
      <AddDialog
        open={openAddDialog}
        handleClose={() => {
          setOpenAddDialog(false);
        }}
      />
    </>
  );
}
export default GridProduk;
