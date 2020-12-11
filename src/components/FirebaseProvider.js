import React, { useContext, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp(firebaseConfig);

const FirebaseContext = React.createContext();

export function useFirebase() {
  return useContext(FirebaseContext);
}

function FirebaseProvider(props) {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  /*
  jika ingin melakukan development, maka aktifkan ini
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV){
    firestore.settings({
      host: 'localhost:8080',
      ssl: false
  })
  }
  */  
  const storage = firebase.storage();
  const [user, loading, error] = useAuthState(auth);
  const [adminUser, setAdminUser] = useState("");
  const [amdinPass, setAdminPass] = useState("");
  return (
    <FirebaseContext.Provider
      value={{
        adminUser,
        amdinPass,
        setAdminUser,
        setAdminPass,
        auth,
        firestore,
        storage,
        user,
        loading,
        error,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
}

export default FirebaseProvider;
