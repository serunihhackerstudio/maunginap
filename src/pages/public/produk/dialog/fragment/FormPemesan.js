import React from "react";
import TextField from "@material-ui/core/TextField";

function FormPemesan({ form, error, isSubmitting, handleChange }) {
  return (
    <React.Fragment>
      <TextField
        id="namaKTP"
        name="namaKTP"
        label="Nama Lengkap (Sesuai KTP)"
        fullWidth
        required
        margin="normal"
        value={form.namaKTP}
        onChange={handleChange}
        helperText={error.namaKTP}
        error={error.namaKTP ? true : false}
        disabled={isSubmitting}
      />
      <TextField
        id="nomorKTP"
        name="nomorKTP"
        label="Nomor KTP"
        fullWidth
        required
        margin="normal"
        value={form.nomorKTP}
        onChange={handleChange}
        helperText={error.nomorKTP}
        error={error.nomorKTP ? true : false}
        disabled={isSubmitting}
      />
      <TextField
        id="jumlahKamar"
        name="jumlahKamar"
        label="Berapa Kamar ?"
        type="number"
        required
        fullWidth
        margin="normal"
        value={form.jumlahKamar}
        onChange={handleChange}
        helperText={error.jumlahKamar}
        error={error.jumlahKamar ? true : false}
        disabled={isSubmitting}
      />
    </React.Fragment>
  );
}

export default FormPemesan;
