import React from "react"
import { useFirebase } from "../../../components/FirebaseProvider";
import AppPageLoading from "../../../components/AppPageLoading";
import {Redirect} from "react-router-dom"
import { Typography } from "@material-ui/core";
import { usePesanan } from "../../../components/PesananProvider";

export default function Transition({history}){
    const {telepon} = usePesanan();
    const {user, loading, firestore} = useFirebase()
    const userIdQuery = firestore.collection("userbio").doc(`${user.uid}`)
    userIdQuery.set({userUid:user.uid, foto:"", telepon}, {merge:true})
    console.log(user.uid)
    if (user) {
        history.push("/")
      }

    return (
        <>
        <Typography>
            TRANSITION PAGE
        </Typography>
        </>
    )
    
}