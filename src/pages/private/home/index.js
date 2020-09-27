import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useFirebase } from "../../../components/FirebaseProvider";

function Home() {
  const { auth } = useFirebase();

  return (
    <>
      <Typography variant="h5">Dashboard</Typography>
    </>
  );
}

export default Home;
