import React from "react";
import Typography from "@material-ui/core/Typography";
import AppLoading from "../../../../components/AppLoading";
import { useFirebase } from "../../../../components/FirebaseProvider";
import { useDocument } from "react-firebase-hooks/firestore";
import Paper from "@material-ui/core/Paper";
import useStyles from "./style";
import { usePesanan } from "../../../../components/PesananProvider";
import Button from "@material-ui/core/Button";

const Proses = ({ match }) => {
  const classes = useStyles();
  const { firestore } = useFirebase();
  const dataQuery = firestore
    .collection("pesanan")
    .doc(`${match.params.penginapanId}`);
  const [snapshot, loading] = useDocument(dataQuery);
  const { progressPembayaran } = usePesanan();

  React.useEffect(() => {
    if (snapshot) {
      console.log(snapshot.data());
    }
  }, [snapshot]);

  if (loading) {
    return <AppLoading message="Memproses pesanan..." />;
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.headingCenter}>
          <Typography variant="h4" color="textSecondary">
            Pembayaran Berhasil
          </Typography>
        </div>
        <div>
          <Typography
            variant="body1"
            className={classes.deskripsi}
            align="justify"
          >
            {progressPembayaran}
          </Typography>
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.cekPesanan}
        >
          Cek Pesanan
        </Button>
      </Paper>
    </div>
  );
};

export default Proses;
