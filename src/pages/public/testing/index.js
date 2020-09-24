import React from "react";
import Typography from "@material-ui/core/Typography";
import { useFirebase } from "../../../components/FirebaseProvider";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import AppPageLoading from "../../../components/AppPageLoading";

function Testing() {
  const { user, firestore } = useFirebase();
  // const [snapshot, loading] = useCollection(query);
  const [state, setState] = React.useState([]);

  firestore
    .collection("user")
    .get()
    .then((snap) => {
      snap.map((data) => {
        console.log(data);
      });
    });

  // if (loading) {
  //   return <AppPageLoading />;
  // }

  return (
    <div>
      <Typography variant="h5">TESTING</Typography>
      {/* {state.map((produk) => {
        const produkData = produk.data();
        return <p key={produk.id}>{produkData.nomorKTP}</p>;
      })} */}
    </div>
  );
}

export default Testing;
