import React, { useRef, useState } from "react";

// material ui
import TextField from "@material-ui/core/TextField";
import { useFirebase } from "../../../components/FirebaseProvider";
import { useSnackbar } from "notistack";

// validator
import isEmail from "validator/lib/isEmail";
import useStyles from "./styles/admin";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function SuperAdmin() {
  const { adminUser, adminPass } = useFirebase();
  const classes = useStyles();
  return (
    <div className={classes.pengaturanPengguna}>
      <TextField
        name="displayName"
        id="displayName"
        label="Name"
        margin="normal"
        defaultValue="Super Admin"
        disabled={true}
      />

      <TextField
        id="email"
        name="email"
        label="Email"
        margin="normal"
        defaultValue={adminUser}
        disabled={true}
      />
      <TextField
        name="password"
        id="password"
        label="************"
        type="password"
        margin="normal"
        autoComplete="new-password"
        defaultValue={adminPass}
        disabled={true}
      />
    </div>
  );
}
export default SuperAdmin;
