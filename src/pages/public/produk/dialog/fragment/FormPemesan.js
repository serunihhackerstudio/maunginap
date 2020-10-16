import React from "react";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";

function FormPemesan({ form, error, isSubmitting, handleChange }) {
  const [selectedDate, handleDateChange] = React.useState(new Date());
  form.tanggalPesan = new Date(selectedDate).toLocaleDateString();
  if (form.jenisIuran === "Bulanan") {
    const daysInOneMonth = 30;
    const bulanan =
      new Date(selectedDate).getTime() + daysInOneMonth * 24 * 60 * 60 * 1000;
    const outBulanan = new Date(bulanan).toLocaleDateString();
    form.tanggalBerakhir = outBulanan;
  } else {
    const daysInOneYear = 365;
    const tahunan =
      new Date(selectedDate).getTime() + daysInOneYear * 24 * 60 * 60 * 1000;
    const outTahunan = new Date(tahunan).toLocaleDateString();
    form.tanggalBerakhir = outTahunan;
  }
  return (
    <React.Fragment>
      <TextField
        id="namaKTP"
        name="namaKTP"
        label="Nama Lengkap"
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
        type="number"
        fullWidth
        required
        margin="normal"
        value={form.nomorKTP}
        onChange={handleChange}
        helperText={error.nomorKTP}
        error={error.nomorKTP ? true : false}
        disabled={isSubmitting}
      />

      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          format="DD/MM/YYYY"
          margin="normal"
          label="Kapan ?"
          helperText={error.tanggalPesan}
          error={error.tanggalPesan ? true : false}
        />
      </MuiPickersUtilsProvider>
      <TextField
        id="nomorHpWa"
        name="nomorHpWa"
        label="Nomor HP / WA"
        type="number"
        required
        fullWidth
        margin="normal"
        value={form.nomorHpWa}
        onChange={handleChange}
        helperText={error.nomorHpWa}
        error={error.nomorHpWa ? true : false}
        disabled={isSubmitting}
      />
    </React.Fragment>
  );
}

export default FormPemesan;
