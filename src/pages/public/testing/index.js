import React from "react";
import Typography from "@material-ui/core/Typography";
import { useFirebase } from "../../../components/FirebaseProvider";
// import { useCollection } from "react-firebase-hooks/firestore";

function Testing() {
  const { firestore } = useFirebase();
  const [dataKota, setataKota] = React.useState([]);
  console.clear(setataKota)
  firestore
    .collection("kota")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        dataKota.push(doc.data());
      });
    });
  console.log(dataKota);

  // React.useEffect(() => {
  //   if (snapshot) {
  //     console.log(snapshot.docs);
  //   }
  // }, [snapshot]);

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
