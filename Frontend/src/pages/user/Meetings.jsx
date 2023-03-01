
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import Header from '../../components/User/Header/Header';
function Meetings() {
	return (
		<>
			<Header />

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
						style={{ fontSize: '1.3rem', fontWeight: '600', color: 'rgb(0, 145, 174)' }}>
						Meetings
					</span>
				</Box>
				<Box
					sx={{
						width: '12rem',
						margin: '3rem',
						textAlign: 'center'
					}}>
					
				</Box>
			</Box>
            <Container maxWidth="xl">

			<TableContainer component={Paper} sx={{marginTop:'2rem'}}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead >
						<TableRow sx={{backgroundColor:'#f5f8fa',fontFamily:'"Lexend Deca", Helvetica, Arial, sans-serif',borderTop: '1px solid rgb(223, 227, 235)',}}>
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
		</>
	);
}

export default Meetings;
