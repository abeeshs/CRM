import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { meetingData } from '../../features/meeting/meetingSlice';
import * as meetingService from '../../services/meetingService';

function Invitation() {
	const [members, setMembers] = useState([]);
	
	setMembers();


	return (
		<Box
			sx={{
				width: '100%',
				height: '80vh',
				display: 'flex',
				justifyContent: 'center',
				pt: '90px'
			}}>
			<Box
				sx={{
					width: '50%',
					height: '90%',
					backgroundColor: 'white'
				}}>
				<h4 className="commen-font" style={{ fontWeight: '600', paddingLeft: '8px' }}>
					Sent Invitation
				</h4>
				<p> Team Members</p>
				<Box
					sx={{
						height: '200px',
						display: 'flex',
						justifyContent: 'center',
						backgroundColor: 'white'
					}}>
					<TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
						<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
							<TableHead>
								<TableRow
									sx={{
										backgroundColor: '#f5f8fa',
										fontFamily: '"Lexend Deca", Helvetica, Arial, sans-serif',
										borderTop: '1px solid rgb(223, 227, 235)'
									}}>
									<TableCell>Team Member</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{members.map((item) => {
									return (
										<TableRow key={item.memberId}>
											<TableCell>{item?.name}</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell>
										Ramshad
										<br /> ramshadvv@gmail.com{' '}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
				<Box
					sx={{
						height: '50px',
						width: '100%',
						marginTop: '100px',
						display: 'flex',
						justifyContent: 'center'
					}}>
					<Button
						variant="outlined"
						sx={{ width: '150px', color: '#0091ae', textTransform: 'capitalize !important' }}>
						{' '}
						Send Invitation
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export default Invitation;
