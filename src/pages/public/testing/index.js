import React from "react";
import Typography from "@material-ui/core/Typography";
import { useFirebase } from "../../../components/FirebaseProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import AppPageLoading from "../../../components/AppPageLoading";

function Testing() {
  const { user, firestore } = useFirebase();
  const query = firestore.collection("pesanan").where("userId", "==", user.uid);
  const [snapshot, loading] = useCollection(query);

  React.useEffect(() => {
    if (snapshot) {
      console.log(snapshot.docs);
    }
  }, [snapshot]);

  if (loading) {
    return <AppPageLoading />;
  }

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
