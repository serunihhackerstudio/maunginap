import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';


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
import CloseIcon from '@material-ui/icons/Close';


// import component context provider
import { usePesanan } from '../../../../components/PesananProvider';

// import currency
import { currency } from '../../../../utils/formatter';
import ID from '../../../../utils/idgenerator';
import BookingCode from '../../../../utils/bookingCode';

// import firebase package
import { useFirebase } from '../../../../components/FirebaseProvider';
import { useCollection } from 'react-firebase-hooks/firestore';

// progressBar
import CircularProgress from '@material-ui/core/CircularProgress';
import AppPageLoading from '../../../../components/AppPageLoading';


// import dialog untuk input alamat
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {ntb, kab} from "./distrik"

// alert
import Alert from '@material-ui/lab/Alert';

// membuat radio group
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


function CheckoutAir(props) {
  const [ provinsi, setProvinsi ] = React.useState('');
  const [ kabupaten, setKabupaten ] = React.useState('');
  const [ kecamatan, setKecamatan ] = React.useState('');
  
  // refer to https://github.com/emsifa/api-wilayah-indonesia

	const classes = useStyles();

	// alert manipulation
	const [openAlert, setOpenAlert] = React.useState(true);

	// Generate Random ID dan kode boking
	const dataId = ID();
	const pesananId = BookingCode()

	// submit process
	const [isSubmitting, setSubmitting] = React.useState(false)

	// buat database untuk menyimpan data pesanan
	const { firestore, user } = useFirebase();
	const payload = firestore.collection('airIsiUlang').doc(`${user.uid}`)
	const payloadHistory = firestore.collection('historyAirIsiUlang').doc(`${dataId}`)

	//  buat database untuk menyimpan collection alamat
	const alamatCollection = firestore.collection('dataAlamat').where('userId', '==', `${user.uid}`)
	const dataAlamatCollection = firestore.collection('dataAlamat').doc(`${user.uid}`)
	const [snapshotAlamat, loadingAlamat] = useCollection(alamatCollection)
	const [stateDataAlamat, setStateDataAlamat] = React.useState([])

	// variable untuk dialog view
	const [ open, setOpen ] = React.useState(false);

	// import data dari pesanan provider / context api
	const { airIsiUlangForm, setAirIsiUlangForm, hargaAirIsiUlang } = usePesanan();

	// inisialisasi state dan variable pendukung untuk handle alamat
	const [alamatLengkap, setAlamatLengkap] = React.useState("");
	const [isAlamat, setAlamat] = React.useState(false)

	// radio group
	// ketika user sudah memesan air sebelumnya, untuk pemesanan selanjutnya
	// user hanya perlu memilih alamat yang sudah diinputkan sebelumnya
	// agar tidak capek-capek atau memasukan alamat yang baru
	const [valueRadioAlamat, setValueRadioAlamat] = React.useState('');
	const handleRadioAlamat = (event) => {
		setValueRadioAlamat(event.target.value);
	};

	// ketika COD belum diklik, maka tombol checkout masih disable guna mencegah 
	// eksekusi sebelum menentukan metode pembayaran / delivery
	// maka digunakan useEffect untuk memanipulasi dom secara real time
	React.useEffect(() => {
		if (airIsiUlangForm.cod && valueRadioAlamat ){
			setSubmitting(false)
		} else if (airIsiUlangForm.cod && airIsiUlangForm.alamatLengkap) {
			setSubmitting(false)
		} else {
			setSubmitting(true)
		}

		// load collection dataAlamat melalui useEffect ini
		// bentuknya berupa array dengan 1 nilai, sehingga perlu diambil nilai itu
		if (snapshotAlamat){
			setStateDataAlamat(snapshotAlamat.docs)
			// stateDataAlamat.forEach(data => arrAlamat.push(data.data().dataAlamat))
			// setArrDataAlamat(stateDataAlamat)
		}
	},[
		airIsiUlangForm.cod, 
		valueRadioAlamat, 
		airIsiUlangForm.alamatLengkap, 
		// arrAlamat, 
		// stateDataAlamat,
		snapshotAlamat
	])

	// loading ketika collection diload oleh aplikasi
	// collection yang diload adalah collection dataAlamat
	if (loadingAlamat){
		return <AppPageLoading />
	}

	// menyimpan hasil query setStateDataAlamat ke dalam setArrDataAlamat

	// handle COD selected form
	const handleChange = async (event) => {
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
		const output = valueRadioAlamat ? `${valueRadioAlamat}` : `${alamatLengkap}, ${kecamatan}, ${kabupaten}`
		setAirIsiUlangForm({
			...airIsiUlangForm,
			dataAlamat:output,
			provinsi,
			kabupaten,
			kecamatan,
			alamatLengkap,
			
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

	const handleSubmit = async (e) => {
		e.preventDefault()
		setSubmitting(true)
		// handle penyimpanan alamat yang sudah diinputkan ke collection dataAlamat
		// collection ini berbeda dengan collection airIsiUlang 
		const output = valueRadioAlamat ? `${valueRadioAlamat}` : `${alamatLengkap}, ${kecamatan}, ${kabupaten}`
		await dataAlamatCollection.set(
			{
				userId:user.uid,
				isSelected:false,
				provinsi,
				kabupaten,
				kecamatan,
				alamatLengkap,
				dataAlamat:output,
				
			},
			{
				merge:true
			}
		)

		// copy paste proses pemesanan air isi ulang ke collection historyAirIsiUlang
		// ini berguna untuk membuat catatan log pemesanan air isi ulang
		await payloadHistory.set(
				{
					...airIsiUlangForm, 
					pesananId:pesananId, 
					dataAlamat:output
				}, 
				{
					merge:true
				}
			)

		// handle upload semua data pemesanan ke collectionairIsiUlang
		// setTimeout(() => {}, 3500)
		await payload.set(
				{
					...airIsiUlangForm, 
					packing:true, 
					delivery:false, 
					sampai:false, 
					selesai:false,
					pesananId:pesananId
				}, 
				{
					merge:true
				}
			)
		props.history.push("/history/pesan-air/progress")	
	}

	return (
		<>
		 <Collapse in={openAlert}>
		<Alert variant="standard" severity="warning" style={{marginBottom:20}} action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
			Alamat lengkap wajib diisi untuk bisa mengaktifkan tombol checkout
			</Alert>
			 </Collapse>
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
					<Typography style={{ marginBottom: 20 }}>Alamat Lengkap Pengiriman</Typography>
					{provinsi && kabupaten && kecamatan && alamatLengkap && isAlamat ? (
						// dataAlamat
						<>
						<Typography variant="body2" color="primary" style={{ marginBottom: 20 }}>
							{alamatLengkap}, {kecamatan}, {kabupaten}
						</Typography>
						<Button size="small" variant="outlined" color="primary" fullWidth disableElevation onClick={handleClickOpen}>
							Edit
						</Button>
						</>
					) : (
						<>
						<FormControl component="fieldset" style={{marginBottom:15}}> 
						{/* <FormLabel component="legend">Gender</FormLabel> */}
						<RadioGroup 
							aria-label="data history alamat" 
							name="dataAlamat" 
							value={valueRadioAlamat} 
							onChange={handleRadioAlamat}>
							{stateDataAlamat.map(data => {
								const item = data.data()
							return (
								<FormControlLabel value={`${item.dataAlamat}`} control={<Radio />} label={`${item.dataAlamat}`} />
							)
						})}
							
						</RadioGroup>
						</FormControl>
						<Button variant="contained" color="primary" fullWidth disableElevation onClick={handleClickOpen}>
							Tambah Alamat
						</Button>
						</>
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
					{isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Checkout Sekarang"}
				</Button>
			</Grid>
			{/* <Typography variant="body1">Ini Halaman Cehckout Produk Air</Typography> */}
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Tambah Alamat</DialogTitle>
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
		  value={alamatLengkap}
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
		</>
	);
}

export default CheckoutAir;
