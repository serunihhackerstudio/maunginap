import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { useFirebase } from "../FirebaseProvider";
import PropertyCard from "./PropertyCard";
import emptyImage from "../../assets/datatidakditemukan.png";

const PAGE_SIZE = 8;

const useStyles = makeStyles((theme) => ({
  grid: { marginTop: theme.spacing(1) },
  media: { height: 180 },
  more: { display: "flex", justifyContent: "center", margin: theme.spacing(4, 0) },
  empty: { textAlign: "center", padding: theme.spacing(8, 2), color: theme.palette.text.secondary },
  emptyImg: { width: "100%", maxWidth: 280, marginBottom: theme.spacing(2) },
}));

const cardGrid = { xs: 12, sm: 6, md: 4, lg: 3 };

/** Daftar penginapan per jenis (Kost-kostan / Kontrakan / Ruko) dengan "muat lebih banyak". */
function PropertyList({ jenis }) {
  const classes = useStyles();
  const { firestore } = useFirebase();
  const [limit, setLimit] = useState(PAGE_SIZE);

  const base = firestore
    .collection("penginapan")
    .doc("data")
    .collection("produk")
    .where("jenisPenginapan", "==", jenis);

  const [snapshot, loading] = useCollection(base.limit(limit));
  const [allSnapshot] = useCollection(base);

  const docs = snapshot ? snapshot.docs : [];
  const total = allSnapshot ? allSnapshot.size : 0;

  return (
    <>
      <Grid container spacing={3} className={classes.grid}>
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Grid item key={i} {...cardGrid}>
              <Card>
                <Skeleton animation="wave" variant="rect" className={classes.media} />
                <CardContent>
                  <Skeleton animation="wave" height={28} />
                  <Skeleton animation="wave" height={24} width="60%" />
                  <Skeleton animation="wave" height={20} width="40%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        {docs.map((doc, i) => (
          <Grid item key={doc.id} {...cardGrid}>
            <PropertyCard id={doc.id} data={doc.data()} index={i} />
          </Grid>
        ))}
      </Grid>

      {!loading && docs.length === 0 && (
        <div className={classes.empty}>
          <img src={emptyImage} className={classes.emptyImg} alt="Data tidak ditemukan" />
          <Typography variant="body1">Belum ada {jenis} yang tersedia.</Typography>
        </div>
      )}

      {docs.length > 0 && docs.length < total && (
        <div className={classes.more}>
          <Button variant="outlined" color="primary" onClick={() => setLimit(limit + PAGE_SIZE)}>
            Muat lebih banyak
          </Button>
        </div>
      )}
    </>
  );
}

export default PropertyList;
