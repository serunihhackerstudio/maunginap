import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper, TextField } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import useStyles from './styles';

// import idr formatter
import { currency } from '../../../../utils/formatter';
import ID from '../../../../utils/idgenerator';

// import firebase package
import { useFirebase } from '../../../../components/FirebaseProvider';
// import { useCollection } from 'react-firebase-hooks/firestore';

// import component context provider
import { usePesanan } from '../../../../components/PesananProvider';

export default function DetailProdukAir({ history }) {
	// style
	const classes = useStyles();

	// Generate Random ID
	const dataId = ID();

	// membuat progress loading bar
	const [ isSubmitting, setSubmitting ] = React.useState(false);

	// memanggil variable global melalui PesananProvider
	const {setAirIsiUlangForm } = usePesanan();

	// buat database untuk menyimpan data pesanan
	const { firestore, user } = useFirebase();
	const payload = firestore.collection('airIsiUlang').doc(`${dataId}`);
	const harga = 10000;
	const [ dataForm, setDataForm ] = React.useState({
		userId: user.uid,
		jumlahGln: 0,
		total: 0,
		tanggal: new Date(),
	});
  

	const handleJumlahGln = (e) => {
    e.preventDefault()
    const volume = e.target.value;
		setDataForm({
			...dataForm,
			jumlahGln: parseInt(volume > 0 ? volume : 0),
			total: volume * harga
		});
    
	};

	const handlePesanAirClicked = async (e) => {
		e.preventDefault();
		// setSubmitting(true);
		// await payload.set(dataForm, { merge: true });
		// setSubmitting(false);
    setAirIsiUlangForm({...dataForm})
    history.push('/pesan-air/detail/checkout');
	};

	return (
		<Grid container spacing={3}>
			<Hidden mdDown>
				<Grid item xs={12} md={1}>
					<Card>
						<CardActionArea>
							<CardMedia
								component="img"
								alt="Contemplative Reptile"
								height={50}
								image="https://images.bisnis-cdn.com/thumb/posts/2020/12/14/1330791/depo-air-isi-ulang.jpg?w=744&h=465"
								title="Contemplative Reptile"
							/>
						</CardActionArea>
					</Card>
				</Grid>
			</Hidden>
			<Grid item xs={12} md={6} className={classes.root}>
				<Paper>
					<Card>
						<CardActionArea>
							<CardMedia
								component="img"
								alt="Contemplative Reptile"
								height="400"
								image="https://images.bisnis-cdn.com/thumb/posts/2020/12/14/1330791/depo-air-isi-ulang.jpg?w=744&h=465"
								title="Contemplative Reptile"
							/>
						</CardActionArea>
					</Card>
				</Paper>
			</Grid>
			<Grid item xs={12} md={5} spacing={3}>
				<form onSubmit={handlePesanAirClicked}>
					<Card className={classes.mypaper}>
						<CardContent>
							<Typography variant="h5">Rp. 10.000</Typography>
							<Typography className={classes.text} variant="body2" color="primary">
								Total = {currency(dataForm.jumlahGln * harga)}
							</Typography>
							<Typography variant="body2">
								Siapkan galonnya, kami antarkan air isi ulangnnya ke tempat Anda
							</Typography>
						</CardContent>
						<CardActions>
							<TextField
								variant="outlined"
								label="jumlah (galon):"
								size="small"
								type="number"
								name="value"
								onChange={handleJumlahGln}
								value={dataForm.jumlahGln}
							/>
							<Button
								variant="contained"
								type="submit"
								color="primary"
								disableElevation
								disabled={isSubmitting}
							>
								Pesan Air
							</Button>
						</CardActions>
					</Card>
				</form>
			</Grid>
		</Grid>
	);
}
