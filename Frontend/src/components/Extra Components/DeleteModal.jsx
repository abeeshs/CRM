import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function DeleteModal(props) {
	const { title, children, openModal, setOpenModal,confirmDeleteTask } = props;
	console.log(openModal);
	return (
		<div>
			<Dialog open={openModal}>
				<DialogTitle>
					<div style={{ display: 'flex' }}>
						<Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
							{title}
						</Typography>
						{/* <ActionButton color="secondary" text='X'></ActionButton> */}
						{/* <Button
							style={{ backgroundColor: '#ff000038', color: 'red' }}
							color="secondary"
							onClick={() => setOpenModal(false)}>
							X
						</Button> */}
					</div>
				</DialogTitle>
				<DialogContent dividers>
					<div>{children}</div>
				</DialogContent>
				<Box>
					<Button
						variant="outlined"
						sx={{ marginTop: '20px', color: 'error', margin: '10px' }}
						onClick={() => {
							setOpenModal(false);
						}}>
						Cancel
					</Button>
					<Button variant="contained" sx={{ marginTop: '20px', margin: '10px' }}
                    onClick={confirmDeleteTask}>
						Yes
					</Button>
				</Box>
			</Dialog>
		</div>
	);
}

export default DeleteModal;
