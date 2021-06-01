import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';

// start
import RoomIcon from '@material-ui/icons/Room';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';

// delivery
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import MotorcycleOutlinedIcon from '@material-ui/icons/MotorcycleOutlined';

// sampai
import FlagIcon from '@material-ui/icons/Flag';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';

// selesai
import StopIcon from '@material-ui/icons/Stop';
import StopOutlinedIcon from '@material-ui/icons/StopOutlined';


function ProgressAir() {
	const classes = useStyles();
    let progressPacking = true;
    let progressDelivery = true;
    let progressSampai = true;
    let progressSelesai = true;
	return (
		<Card className={classes.paper}>
			<CardContent>
				<Timeline align="alternate">
					<TimelineItem>
						<TimelineOppositeContent>
							<Typography variant="body2" color="textSecondary">
								{progressPacking ? <>10:00</> : ""}
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
                            ) : (<></>)}
							
						</TimelineContent>
					</TimelineItem>
					<TimelineItem>
						<TimelineOppositeContent>
							<Typography variant="body2" color="textSecondary">
                                {progressDelivery ? <>10:15</> : ""}
							</Typography>
						</TimelineOppositeContent>
						<TimelineSeparator>
                        {progressDelivery ? (
                                <TimelineDot color="secondary">
								    <MotorcycleOutlinedIcon />
							    </TimelineDot>
                            ) : (
                                <TimelineDot >
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
                            ) : (<></>)}
							
						</TimelineContent>
					</TimelineItem>
					<TimelineItem>
                    <TimelineOppositeContent>
							<Typography variant="body2" color="textSecondary">
                                {progressSampai ? <>10:25</> : ""}
							</Typography>
						</TimelineOppositeContent>
						<TimelineSeparator>
                            {progressSampai ? (
                                <TimelineDot color="secondary">
								    <FlagOutlinedIcon />
							    </TimelineDot>
                            ) : (
                                <TimelineDot >
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
                            ) : (<></>)}
							
						</TimelineContent>
					</TimelineItem>
					<TimelineItem>
                    <TimelineOppositeContent>
							<Typography variant="body2" color="textSecondary">
                                {progressSelesai ? <>10:30</> : ""}
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
                            ) : (<></>)}
							
						</TimelineContent>
					</TimelineItem>
				</Timeline>
			</CardContent>
		</Card>
	);
}

export default ProgressAir;
