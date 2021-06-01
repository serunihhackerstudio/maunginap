import React from 'react';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// start
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';

// delivery
import MotorcycleOutlinedIcon from '@material-ui/icons/MotorcycleOutlined';

// sampai
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';

// selesai
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';

// import firebase package
import { useFirebase } from '../../../../components/FirebaseProvider';
import { useDocument } from 'react-firebase-hooks/firestore';

// progressBar
import AppPageLoading from '../../../../components/AppPageLoading';

function ProgressAir({history}) {
	const classes = useStyles();
	const { firestore, user } = useFirebase();
	const query = firestore.collection('airIsiUlang').where('userId', '==', `${user.uid}`);
	const [ snapshot, loading ] = useDocument(query);
	const [ item, setItem ] = React.useState({});

	// fungsi untuk kembali ke halaman produk air isi ulang
	const kembaliKeProduk = () => {
		history.push("/pesan-air/detail")
	}

	// load data melalui useEffect
	React.useEffect(
		() => {
			if (snapshot) {
				if (snapshot.docs[0] === undefined) {
					setItem({
						packing: false,
						delivery: false,
						sampai: false,
						selesai: false,
						pesananId: 'Belum ada Pesanan'
					});
				} else {
					setItem(snapshot.docs[0].data());
				}
			}
		},
		[ snapshot ]
	);
	let progressPacking = item.packing;
	let progressDelivery = item.delivery;
	let progressSampai = item.sampai;
	let progressSelesai = item.selesai;

	if (loading) {
		return <AppPageLoading />;
	}
	return (
		<>
		<Card className={classes.paper}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" style={{ backgroundColor: '#016660' }}>
						ID
					</Avatar>
				}
				title="Kode Pesanan"
				subheader={`#${item.pesananId}`}
			/>
			<CardContent>
				{loading ? (
					<AppPageLoading />
				) : (
					<Timeline align="alternate">
						<TimelineItem>
							<TimelineOppositeContent>
								<Typography variant="body2" color="textSecondary">
									{/* {progressPacking ? '10:00' : ''} */}
								</Typography>
							</TimelineOppositeContent>
							<TimelineSeparator>
								{progressPacking ? (
									<TimelineDot color="secondary">
										<RepeatOutlinedIcon />
									</TimelineDot>
								) : (
									<TimelineDot>
										<RepeatOutlinedIcon />
									</TimelineDot>
								)}

								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent>
								{progressPacking ? (
									<Paper elevation={3} className={classes.paper}>
										<Typography variant="h6" component="h1">
											Packing
										</Typography>
										<Typography>Air sedang diisi ulang</Typography>
									</Paper>
								) : (
									''
								)}
							</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineOppositeContent>
								<Typography variant="body2" color="textSecondary">
									{/* {progressDelivery ? '10:15' : ''} */}
								</Typography>
							</TimelineOppositeContent>
							<TimelineSeparator>
								{progressDelivery ? (
									<TimelineDot color="secondary">
										<MotorcycleOutlinedIcon />
									</TimelineDot>
								) : (
									<TimelineDot>
										<MotorcycleOutlinedIcon />
									</TimelineDot>
								)}

								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent>
								{progressDelivery ? (
									<Paper elevation={3} className={classes.paper}>
										<Typography variant="h6" component="h1">
											Delivery
										</Typography>
										<Typography>Air isi ulang sedang diantar</Typography>
									</Paper>
								) : (
									''
								)}
							</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineOppositeContent>
								<Typography variant="body2" color="textSecondary">
									{/* {progressSampai ? '10:25' : ''} */}
								</Typography>
							</TimelineOppositeContent>
							<TimelineSeparator>
								{progressSampai ? (
									<TimelineDot color="secondary">
										<FlagOutlinedIcon />
									</TimelineDot>
								) : (
									<TimelineDot>
										<FlagOutlinedIcon />
									</TimelineDot>
								)}

								<TimelineConnector className={classes.secondaryTail} />
							</TimelineSeparator>
							<TimelineContent>
								{progressSampai ? (
									<Paper elevation={3} className={classes.paper}>
										<Typography variant="h6" component="h1">
											sampai
										</Typography>
										<Typography>Pengantar air sudah tiba</Typography>
									</Paper>
								) : (
									''
								)}
							</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineOppositeContent>
								<Typography variant="body2" color="textSecondary">
									{/* {progressSelesai ? '10:30' : ''} */}
								</Typography>
							</TimelineOppositeContent>
							<TimelineSeparator>
								{progressSelesai ? (
									<TimelineDot color="secondary">
										<StopOutlinedIcon />
									</TimelineDot>
								) : (
									<TimelineDot>
										<StopOutlinedIcon />
									</TimelineDot>
								)}
							</TimelineSeparator>
							<TimelineContent>
								{progressSelesai ? (
									<Paper elevation={3} className={classes.paper}>
										<Typography variant="h6" component="h1">
											Selesai
										</Typography>
										<Typography>Pesanan berhasil diantarkan</Typography>
									</Paper>
								) : (
									''
								)}
							</TimelineContent>
						</TimelineItem>
					</Timeline>
				)}
			</CardContent>
			<CardActions>
				<Button
					startIcon={<ArrowBackIcon />}
					size="medium"
					color="secondary"
					variant="contained"
					disableElevation
					onClick={kembaliKeProduk}
				>
					Kembali ke produk
				</Button>
			</CardActions>
		</Card>
		</>
	);
}

export default ProgressAir;
