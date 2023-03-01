import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';
import { Box, Container } from '@mui/system';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar/Sidebar';

function MeetingPage() {
	const navigate = useNavigate();
	return (
		<Box sx={{ display: 'flex' }}>
			<Sidebar />
			<Box component="main" sx={{ flexGrow: 1, pt: 7 }}>
				<Box
					sx={{
						width: '100%',
						height: '5rem',
						borderBottom: '1px solid rgb(223, 227, 235)',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}>
					<Box
						sx={{
							width: '12rem',
							height: '2rem',
							margin: '3rem',
							textAlign: 'center'
						}}>
						<span
							className="commen-font"
							style={{ fontSize: '1.3rem', fontWeight: '600', color: '#33475B' }}>
							Meetings
						</span>
					</Box>
					<Box
						sx={{
							width: '12rem',
							margin: '3rem',
							textAlign: 'center'
						}}>
						<Button
							type="submit"
							variant="contained"
							className="meeting-btn"
							onClick={() => {
								navigate('/admin/meetings/new-meeting');
							}}>
							Create Meeting
						</Button>
					</Box>
				</Box>
				<Container maxWidth="xl">
					<TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
						<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
							<TableHead>
								<TableRow
									sx={{
										backgroundColor: '#f5f8fa',
										fontFamily: '"Lexend Deca", Helvetica, Arial, sans-serif',
										borderTop: '1px solid rgb(223, 227, 235)'
									}}>
									<TableCell>MEETING NAME</TableCell>
									<TableCell align="right">ORGANIZER</TableCell>
									<TableCell align="right">TYPE</TableCell>
									<TableCell align="right">DURATION</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell> </TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
								</TableRow>
								<TableRow>
									<TableCell> </TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Container>
			</Box>
		</Box>
	);
}

export default MeetingPage;
