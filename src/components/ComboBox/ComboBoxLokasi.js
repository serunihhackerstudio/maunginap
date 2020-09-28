/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBoxLokasi() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={lokasi}
      getOptionLabel={(option) => option.nama}
      style={{ width: 150 }}
      renderInput={(params) => (
        <TextField {...params} label="Lokasi" variant="outlined" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const lokasi = [
  { nama: "Surabaya" },
  { nama: "Jakarta" },
  { nama: "Bandung" },
  { nama: "Makasar" },
  { nama: "Denpasar" },
];
