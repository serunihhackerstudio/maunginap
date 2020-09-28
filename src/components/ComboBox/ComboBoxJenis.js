/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBoxJenis() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={jenisPenginapan}
      getOptionLabel={(option) => option.jenis}
      style={{ width: 200 }}
      renderInput={(params) => (
        <TextField {...params} label="Jenis Penginapan" variant="outlined" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const jenisPenginapan = [
  { jenis: "Kost-kostan" },
  { jenis: "Kontrakan" },
  { jenis: "Hotel" },
  { jenis: "Apartement" },
];
