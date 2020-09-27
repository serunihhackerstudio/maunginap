import React from "react";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";

function FormPemesan({ form, error, isSubmitting, handleChange }) {
  const [selectedDate, setSelectDate] = React.useState(new Date());
  const handleDateChange = (e) => {
    setSelectDate(e);
  };
  console.log(selectedDate);
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
        id="kamarNo"
        name="kamarNo"
        label="Nomor Kamar "
        type="number"
        required
        fullWidth
        margin="normal"
        value={form.kamarNo}
        onChange={handleChange}
        helperText={error.kamarNo}
        error={error.kamarNo ? true : false}
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
    </React.Fragment>
  );
}

export default FormPemesan;
