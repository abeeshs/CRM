import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import Header from '../../components/User/Header/Header';
import CompletedTaskTable from '../../components/User/Table/CompletedTaskTable'

function CompletedTask() {
	return (
		<div>
			<Header />
			<Container maxWidth="xl">
				<Box sx={{ margin: '20px' }}>
					<Typography component="div" variant="h6">
						Completed Task
					</Typography>
					<CompletedTaskTable/>
				</Box>
			</Container>
		</div>
	);
}

export default CompletedTask;
