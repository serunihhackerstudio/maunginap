import React from "react";
import Typography from "@material-ui/core/Typography";
import { useFirebase } from "../../../components/FirebaseProvider";
// import { useCollection } from "react-firebase-hooks/firestore";

function Testing() {
  const { firestore } = useFirebase();
  const query = firestore
    .collection("penginapan")
    .doc("data")
    .collection("produk")
    .where("kota", "==", "Surabaya");

  // React.useEffect(() => {
  //   if (snapshot) {
  //     console.log(snapshot.docs);
  //   }
  // }, [snapshot]);

  // if (loading) {
  //   return <AppPageLoading />;
  // }

  query.get().then((data) => console.log(data));

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
