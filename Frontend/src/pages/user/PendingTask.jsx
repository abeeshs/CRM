import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';
import Header from '../../components/User/Header/Header';
import PendingTaskTable from '../../components/User/Table/PendingTaskTable';

function PendingTask() {
	return (
		<div>
			<Header />
			<Container maxWidth="xl">
        <Box  sx={{margin:'20px'}}>

				<Typography component="div"  variant="h6">
					Pending Task
				</Typography>
        </Box>
				<PendingTaskTable />
			</Container>
		</div>
	);
}

export default PendingTask;
