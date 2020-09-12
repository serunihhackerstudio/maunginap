import React from "react";
import { Redirect } from "react-router-dom";
import { useFirebase } from "../../components/FirebaseProvider";
import AppLoading from "../../components/AppLoading";
function CheckUser() {
  const { user } = useFirebase();
  try {
    const check = user.uid;
  } catch (e) {
    return (
      <Redirect
        to={{
          pathname: "user/login",
        }}
      />
    );
  }
  return (
    <div>
      <AppLoading message="Memuat user..." />
    </div>
  );
}

export default CheckUser;
