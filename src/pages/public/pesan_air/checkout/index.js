import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// styles
import useStyles from './styles';

// icons
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@material-ui/icons/IndeterminateCheckBoxRounded';
import IconButton from '@material-ui/core/IconButton';

// import component context provider
import { usePesanan } from '../../../../components/PesananProvider';

// import currency
import { currency } from '../../../../utils/formatter';
import ID from '../../../../utils/idgenerator';

// import firebase package
import { useFirebase } from '../../../../components/FirebaseProvider';
import AlamatDialog from './distrik';
// import { useCollection } from 'react-firebase-hooks/firestore';

// import dialog untuk input alamat
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {lotim, lobar, mataram, ntb, loteng, kab} from "./distrik"

function CheckoutAir(props) {
  const [ provinsi, setProvinsi ] = React.useState('');
  const [ kabupaten, setKabupaten ] = React.useState('');
  const [ kecamatan, setKecamatan ] = React.useState('');
  
  // refer to https://github.com/emsifa/api-wilayah-indonesia

	const classes = useStyles();

	// Generate Random ID
	const dataId = ID();

	// submit process
	const [isSubmitting, setSubmitting] = React.useState(false)

	// buat database untuk menyimpan data pesanan
	const { firestore, user } = useFirebase();
	const payload = firestore.collection('airIsiUlang').doc(`${dataId}`);

	// variable untuk dialog view
	const [ open, setOpen ] = React.useState(false);

	// import data dari pesanan provider / context api
	const { airIsiUlangForm, setAirIsiUlangForm, hargaAirIsiUlang } = usePesanan();

	// inisialisasi state dan variable pendukung untuk handle alamat
	const [alamatLengkap, setAlamatLengkap] = React.useState("");
	const [isAlamat, setAlamat] = React.useState(false)

	// ketika COD belum diklik, maka tombol checkout masih disable guna mencegah 
	// eksekusi sebelum menentukan metode pembayaran / delivery
	// maka digunakan useEffect untuk memanipulasi dom secara real time
	React.useEffect(() => {
		if (!airIsiUlangForm.cod){
			setSubmitting(true)
		} else {
			setSubmitting(false)
		}
	},[airIsiUlangForm.cod])

	const handleChange = (event) => {
		// setState({ ...state, [event.target.name]: event.target.checked });
		setAirIsiUlangForm({
			...airIsiUlangForm,
			[event.target.name]: event.target.checked
		});
	};

	// logic untuk mencegah web mereload halaman ini kembali ketika user refresh
	// yang menyebabkan variable state globalnya bernilai null atau kosong
	if (!airIsiUlangForm.total) {
		props.history.push('/pesan-air/detail');
	}

	// set function to memanggil dialog
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	}

	// handle tambah alamat detail
	const handleAlamatLengkap = (e) => {
		e.preventDefault()
		setAlamatLengkap(e.target.value)
	}
	const handleTambahAlamat = (e) => {
		e.preventDefault()
		setAirIsiUlangForm({
			...airIsiUlangForm,
			provinsi,
			kabupaten,
			kecamatan,
			alamatLengkap
		})
		setAlamat(true)
		setOpen(false);
	};

	// handle penambahan volume
	const handleUp = (e) => {
		e.preventDefault()
		setAirIsiUlangForm({
			...airIsiUlangForm,
			jumlahGln:airIsiUlangForm.jumlahGln + 1,
			total:(airIsiUlangForm.jumlahGln + 1) * hargaAirIsiUlang
		})
	}

	// handle pengurangan volume
	const handleDown = (e) => {
		e.preventDefault()
		setAirIsiUlangForm({
			...airIsiUlangForm,
			jumlahGln:airIsiUlangForm.jumlahGln - 1,
			total:(airIsiUlangForm.jumlahGln - 1) * hargaAirIsiUlang
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setSubmitting(true)
		payload.set(airIsiUlangForm, {merge:true})
	}

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={8}>
				{/* Tabel */}
				<TableContainer component={Paper} className={classes.mypaper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell />
								<TableCell>Produk</TableCell>
								<TableCell align="center">Harga</TableCell>
								<TableCell align="center">Jumlah</TableCell>
								<TableCell align="center">Total</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell align="right">
									<img
										src="https://images.bisnis-cdn.com/thumb/posts/2020/12/14/1330791/depo-air-isi-ulang.jpg?w=744&h=465"
										width={50}
										height={50}
										alt="img preview"
									/>
								</TableCell>
								<TableCell align="left">Air minum isi ulang</TableCell>
								<TableCell align="center">Rp10.000</TableCell>
								<TableCell align="right">
									<Grid container style={{ textAlign: 'left' }}>
										<Grid item>
											<IconButton color="primary" aria-label="Tambah" component="span" onClick={handleDown}>
												<IndeterminateCheckBoxRoundedIcon />
											</IconButton>
										</Grid>
										<Grid item style={{ margin: 14 }}>
											{airIsiUlangForm.jumlahGln}
										</Grid>
										<Grid item>
											<IconButton color="primary" aria-label="Kurangi" component="span" onClick={handleUp}>
												<AddBoxRoundedIcon />
											</IconButton>
										</Grid>
									</Grid>
								</TableCell>
								<TableCell align="center">{currency(hargaAirIsiUlang * airIsiUlangForm.jumlahGln)}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				{/* Tabel */}
			</Grid>
			<Grid item xs={12} md={4}>
				<Paper className={classes.mypaper} elevation={1}>
					<Typography style={{ marginBottom: 20 }}>Alamat Pengiriman</Typography>
					{provinsi && kabupaten && kecamatan && alamatLengkap && isAlamat ? (
						<>
						<Typography variant="body2" color="primary" style={{ marginBottom: 20 }}>
							{alamatLengkap}, {kecamatan}, {kabupaten}
						</Typography>
						<Button size="small" variant="outlined" color="primary" fullWidth disableElevation onClick={handleClickOpen}>
							Edit
						</Button>
						</>
					) : (
						<Button variant="contained" color="primary" fullWidth disableElevation onClick={handleClickOpen}>
							Tambah Alamat
						</Button>
					)}
					
				</Paper>
				<Paper className={classes.mypaper} style={{ marginTop: 10 }} elevation={1}>
					<Grid container>
						<Grid item xs={6}>
							<Typography style={{ marginBottom: 20 }}>Subtotal</Typography>
						</Grid>
						<Grid item xs={6} style={{ textAlign: 'right' }}>
							<Typography style={{ marginBottom: 20 }}>{currency(hargaAirIsiUlang * airIsiUlangForm.jumlahGln)}</Typography>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={6}>
							<Typography variant="h6" style={{ marginBottom: 20 }}>
								Total
							</Typography>
						</Grid>
						<Grid item xs={6} style={{ textAlign: 'right' }}>
							<Typography variant="h6" color="primary" style={{ marginBottom: 20 }}>
								{currency(hargaAirIsiUlang * airIsiUlangForm.jumlahGln)}
							</Typography>
						</Grid>
					</Grid>
				</Paper>
				<Paper className={classes.mypaper} elevation={1} style={{ marginTop: 10 }}>
					<Typography style={{ marginBottom: 20 }}>Pilih Metode Pembayaran</Typography>
					<FormControlLabel
						control={<Checkbox checked={setAirIsiUlangForm.cod} onChange={handleChange} name="cod" />}
						label="COD"
					/>
				</Paper>
				<Button style={{ marginTop: 10 }} variant="contained" color="secondary" fullWidth disableElevation onClick={handleSubmit} disabled={isSubmitting}>
					Checkout Sekarang
				</Button>
			</Grid>
			{/* <Typography variant="body1">Ini Halaman Cehckout Produk Air</Typography> */}
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Tambah Alamat - {kabupaten}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Pilih alamat secara lengkap sebagai tujuan pengiriman air isi ulangnya
					</DialogContentText>
					<FormControl className={classes.formControl}>
						<InputLabel id="demo-simple-select-label">Provinsi</InputLabel>
						<Select
							labelId="Provinsi"
							id="provinsi"
							value={provinsi}
							onChange={(e) => setProvinsi(e.target.value)}
						>
							<MenuItem value={ntb.name}>{ntb.name}</MenuItem>
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel id="demo-simple-select-label">Kabupaten</InputLabel>
						<Select
							labelId="Kabupaten"
							id="kabupaten"
							value={kabupaten}
							onChange={(e) => {
								e.preventDefault()
								setKabupaten(e.target.value)
							}
						}
						>
              {kab.filter(data => data.name === "KOTA MATARAM").map(item => {
                return (
                  <MenuItem value={item.name}>{item.name}</MenuItem>
                )
              })}
			  
              
						</Select>
					</FormControl>
          {!kabupaten ? (<></>):(
            <>
            <FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-label">Kecamatan</InputLabel>
				<Select
					labelId="Kecamatan"
					id="kecamatan"
					value={kecamatan}
					onChange={(e) => setKecamatan(e.target.value)}
				>
			  {kab.filter(data => data.name === `${kabupaten}`)[0].data.map(item => {
				  return (<MenuItem value={item.name}>{item.name}</MenuItem>)
			  })}
              
						</Select>
					</FormControl>
          <FormControl className={classes.formControl}>
          <TextField 
          variant="standard"
          label="Alamat Lengkap"
		  name="alamatLengkap"
		  value={alamatLengkap.toUpperCase()}
		  onChange={handleAlamatLengkap}
          />
          </FormControl>
          </>
          )}
          
				</DialogContent>
				<DialogActions>
					<Button onClick={handleTambahAlamat} color="primary">
						Tambah Alamat
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
}

export default CheckoutAir;
