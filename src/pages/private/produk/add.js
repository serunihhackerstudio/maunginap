import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogContent, TextField } from "@material-ui/core";
import { useFirebase } from "../../../components/FirebaseProvider";

import { withRouter } from "react-router-dom";

function AddDialog({ history, open, handleClose }) {
  const [namaPenginapan, setNamaPenginapan] = useState("");

  const [error, setError] = useState("");

  const { firestore } = useFirebase();

  const [isSubmitting, setSubmitting] = useState(false);

  const produkCol = firestore
    .collection("penginapan")
    .doc("data")
    .collection("produk");
  console.log(produkCol);

  const handleChange = (e) => {
    setError("");

    setNamaPenginapan(e.target.value);
  };

  const handleSimpan = async (e) => {
    setSubmitting(true);
    //
    try {
      if (!namaPenginapan) {
        throw new Error("Nama produk wajib diisi");
      }

      const produkBaru = await produkCol.add({ namaPenginapan });

      history.push(`produk/edit/${produkBaru.id}`);
    } catch (e) {
      setError(e.message);
    }
    setSubmitting(false);
  };
  return (
    <Dialog
      disableBackdropClick={isSubmitting}
      disableEscapeKeyDown={isSubmitting}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Tambah Data Kost / penginapan</DialogTitle>

      <DialogContent divides>
        <TextField
          id=""
          label="Nama Penginapan"
          fullWidth
          value={namaPenginapan}
          onChange={handleChange}
          helperText={error}
          error={error ? true : false}
          disabled={isSubmitting}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Batal</Button>
        <Button color="primary" disabled={isSubmitting} onClick={handleSimpan}>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withRouter(AddDialog);
