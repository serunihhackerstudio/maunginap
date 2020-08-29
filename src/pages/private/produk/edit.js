import React, {useState, useEffect} from 'react';

// material ui
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


import { useFirebase } from '../../../components/FirebaseProvider';
import { useDocument } from 'react-firebase-hooks/firestore';
import AppPageLoading from '../../../components/AppPageLoading';
import { useSnackbar } from 'notistack';
import useStyles from './styles/edit';

// icon
import UploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save'

// component
import {Prompt} from 'react-router-dom';

function EditProduk({match}){

    // stylesheet
    const classes = useStyles();

    const [isSomethingChange, setSomethingChange] = useState(false);

    // const {firestore} = useFirebase();
    const {firestore,storage,user} = useFirebase()
    const produkDoc = firestore.doc(`penginapan/data/produk/${match.params.produkId}`);
    const {enqueueSnackbar} = useSnackbar()
    const [snapshot, loading] = useDocument(produkDoc)
    const produkStorageRef = storage.ref(`penginapan/data/produk`)

    const [form, setForm] = useState({
        namaPenginapan:'',
        harga:'',
        lokasi:'',
        jumlahKamar:'',
        fasilitas:'',
        deskripsi:''
    })

    const [error, setError] = useState({
        namaPenginapan:'',
        harga:'',
        lokasi:'',
        jumlahKamar:'',
        fasilitas:'',
        deskripsi:''
    })

    const [isSubmitting, setSubmitting] = useState(false);


    useEffect(() => {
        if (snapshot){
            // setForm( {
            //     ...form,
            //     ...snapshot.data()
            // })
            setForm( currentForm =>(
                {
                    ...currentForm,
                    ...snapshot.data()
                }
            ))
        }
    }, [snapshot]);

    const handleChange = (e) => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value
        })

        setError({
            ...error,
            [e.target.name]:''
        })

        setSomethingChange(true);
    }

    if (loading){
        return <AppPageLoading />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const findErrors = validate();

        if (Object.values(findErrors).some(err=>err !== '')){
            setError(findErrors)
        } else {

            setSubmitting(true);

            try {

                await produkDoc.set(form, {merge:true})
                enqueueSnackbar("Data penginapan berhasil ditambahkan", {variant:"success"})
                setSomethingChange(false)
                
            } catch (e){

                enqueueSnackbar(e.message, {variant:"error"})

            }
            setSubmitting(false);
        }

    }

    const validate = ()=> {
        const newError = {...error};

        if (!form.namaPenginapan){
            newError.namaPenginapan = "Nama penginapan wajib diisi!";
        }

        if (!form.harga){
            newError.harga = "Harga wajib diisi!";
        }

        if (!form.lokasi){
            newError.lokasi = "Lokasi wajib diisi"
        }

        if (!form.jumlahKamar){
            newError.jumlahKamar = "Stok wajib diisi"
        }

        if (!form.fasilitas){
            newError.fasilitas = "Fasilitas wajib diisi"
        }

        if (!form.deskripsi){
            newError.deskripsi = "Deskripsi wajib diisi"
        }

        return newError;
    }

    console.log(form.namaPenginapan)

    const handleUploadFile = (e) => {
        const file = e.target.files[0];

        if (!['image/png', 'image/jpeg', 'image/jpg']){
            setError(error => ({
                ...error,
                foto:`Tipe file tidak didukung ${file.type}`
            }))
        }

        else if (file.size >= 512000){
            setError(error => ({
                ...error,
                foto:`Ukuran file terlalu besar > 512kb`
            }))
        }

        else {
            const reader = new FileReader();
            reader.onabort = ()=> {
                setError(error => ({
                    ...error, 
                    foto: 'File tidak bisa dibaca'
                }))
            }
            reader.onload = async () => {
                setError(error => ({
                    ...error, 
                    foto: ''
                }))

                setSubmitting(true);
                try {
                    const fotoExt = file.name.substring(
                        file.name.lastIndexOf('.')
                    ) ; 

                    const fotoRef = produkStorageRef.child(
                        `${match.params.produkId}${fotoExt}`
                    );

                    const fotoSnapshot = await fotoRef.putString(reader.result, 'data_url');
                    const fotoUrl = await fotoSnapshot.ref.getDownloadURL();
                    setForm(currentForm=>({
                        ...currentForm,
                        foto:fotoUrl
                    }))
                    setSomethingChange(true);

                } catch (e) {
                    setError(error => ({
                        ...error,
                        foto: e.message
                    }))
                }
                setSubmitting(false)
            }

            

            reader.readAsDataURL(file);
            
        }

        
    }

    return(
        <Paper className={classes.papperPadding}>
            <Typography variant="h5" component="h1">
                    Edit Informasi Penignapan : {form.namaPenginapan}
            </Typography>
            <Grid container alignItems="center" justify="center">
                <Grid item xs={12} sm={6}>
                
                    <form id="produk-form" onSubmit={handleSubmit} noValidate>
                        <TextField 
                            id="nama"
                            name="nama"
                            label="Nama Penginapan"
                            margin="normal"
                            fullWidth
                            required
                            value={form.namaPenginapan}
                            onChange={handleChange}
                            error={error.namaPenginapan?true:false}
                            helperText={error.namaPenginapan}
                            disabled={isSubmitting}
                            
                        />
                        <TextField 
                            id="harga"
                            name="harga"
                            label="Harga / Biaya Penginapan"
                            margin="normal"
                            type="number"
                            fullWidth
                            value={form.harga}
                            onChange={handleChange}
                            error={error.harga?true:false}
                            helperText={error.harga}
                            disabled={isSubmitting}
                            
                        />

                        <TextField 
                            id="jumlahKamar"
                            name="jumlahKamar"
                            label="Jumlah Kamar"
                            margin="normal"
                            type="number"
                            fullWidth
                            value={form.jumlahKamar}
                            onChange={handleChange}
                            error={error.jumlahKamar?true:false}
                            helperText={error.jumlahKamar}
                            disabled={isSubmitting}
                            
                        />
                        <TextField 
                            id="lokasi"
                            name="lokasi"
                            label="Lokasi Penginapan"
                            margin="normal"
                            fullWidth
                            required
                            value={form.lokasi}
                            onChange={handleChange}
                            error={error.lokasi?true:false}
                            helperText={error.lokasi}
                            disabled={isSubmitting}
                        />

                        <TextField 
                            id="fasilitas"
                            name="fasilitas"
                            label="Fasilitas Penginapan"
                            margin="normal"
                            fullWidth
                            required
                            value={form.fasilitas}
                            onChange={handleChange}
                            error={error.fasilitas?true:false}
                            helperText={error.fasilitas}
                            disabled={isSubmitting}
                            
                        />
                        <TextField 
                            id="deskripsi"
                            name="deskripsi"
                            label="Deskripsi Penginapan"
                            margin="normal"
                            fullWidth
                            rowsMax={3}
                            value={form.deskripsi}
                            onChange={handleChange}
                            error={error.deskripsi?true:false}
                            helperText={error.deskripsi}
                            disabled={isSubmitting}
                            
                        />
                        <div className={classes.actionButton}>
                    <Button 
                        form="produk-form"
                        type="submit"
                        color="primary" 
                        disabled={isSubmitting || !isSomethingChange}
                        variant="contained">
                        <SaveIcon className={classes.iconLeft}/> Simpan
                    </Button>
                    </div>
                
                    </form>
                </Grid>
                <Grid item xs={12} sm={6}>
                        {
                            form.foto &&
                            <div className={classes.uploadFotoProduk}><
                                img src={form.foto}  className={classes.previewFotoProduk} alt="foto produk" />
                            </div>
                        }
                        <div className={classes.uploadFotoProduk}>
                        <input className={classes.hideInputFile} 
                            type="file"
                            id="upload-foto-produk"
                            accept="image/jpeg, image/jpeg, image/png"
                            onChange={handleUploadFile}
                        />
                        <label htmlFor="upload-foto-produk">
                        <Button 
                            disabled={isSubmitting}
                            variant="outlined"
                            margin="normal"
                            component="span">
                            Upload Foto <UploadIcon  className={classes.iconRight}/>
                        </Button>
                        </label>
                        {
                            error.foto && 
                            <Typography color="error">
                                {error.foto}
                            </Typography>
                        }
                        </div>                            
                </Grid>
                

                {/* <Grid item xs={12}>
                    <div className={classes.actionButton}>
                    <Button 
                        form="produk-form"
                        type="submit"
                        color="primary" 
                        disabled={isSubmitting || !isSomethingChange}
                        variant="contained">
                        <SaveIcon className={classes.iconLeft}/> Simpan
                    </Button>
                    </div>
                </Grid> */}
            </Grid>
            <Prompt when={isSomethingChange}
                message="Terdapat perubahan yang belum disimpan, 
                apakah Anda yakin ingin meninggalkan halaman ini ?"
             />
        </Paper>
    )
}
export default EditProduk;