import React from "react";

// material-ui
import TextField from "@material-ui/core/TextField";

// css
import useStyles from "./styles/identitas";

function IdentitasAdmin() {
  const classes = useStyles();

  return (
    <div className={classes.pengaturanIdentitas}>
      <TextField
        name="nama"
        id="nama"
        label="Nama"
        value={"Super Admin"}
        fullWidth
        required
        margin="normal"
        disabled={true}
      />

      <TextField
        name="nomorWA"
        id="nomorWA"
        label="Nomor"
        value={"+62***********"}
        fullWidth
        required
        margin="normal"
        disabled={true}
      />

      <TextField
        name="alamat"
        id="alamat"
        label="Alamat"
        value={"Lombok, Nusa Tenggara Barat"}
        fullWidth
        require
        margin="normal"
        disabled={true}
      />

      <TextField
        name="posisi"
        id="posisi"
        label="Posisi / jabatan"
        value={"Platform Administrator"}
        fullWidth
        required
        margin="normal"
        disabled={true}
      />
    </div>
  );
}

export default IdentitasAdmin;
