fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi/${idProvinsi}`)
.then((resp) => resp.json())
.then((data) =>
    // setDataFetch({
    //     provinsi: data
    // })
);

// kabupaten
fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvinsi}`)
.then((resp) => resp.json())
.then((data) =>
    // setDataFetch({
    //     kabupaten: data
    // })
);

  // kecamatan
fetch(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=3214`)
.then((resp) => resp.json())
.then((data) =>
// setDataFetch({
// kabupaten: data
// })
);

// kelurahan
fetch(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=3214010`)
.then((resp) => resp.json())
.then((data) =>
// setDataFetch({
// kabupaten: data
// })
);