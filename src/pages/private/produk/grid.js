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
import { usePesanan } from "../../../components/PesananProvider";
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
    // produkDoc itu adalah sebuah data bukan list
    // e.preventDefault()
    // const konfirmasi = ;
    try {
      if (window.confirm("Apakah Anda yakin ingin menghapus item ini ? ")) {
        await produkDoc.ref.delete();
        const fotoUrl = produkDoc.data().foto();
        if (fotoUrl) {
          await storage.setFromUrl(fotoUrl).delete();
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
            <Grid key={produkDoc.id} item={true} xs={12} xm={12} md={4} lg={4}>
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
