import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography
} from '@mui/material';
import React from 'react';

function Popup(props) {
	const { title, children, openPopup, setOpenPopup, width } = props;
	return (
		<div>
			<Dialog
				fullWidth={true}
				maxWidth={width}
				open={openPopup}
				sx={{ borderRadius: '10px !importand' }}>
				<DialogTitle>
					<div style={{ display: 'flex' }}>
						<Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
							{title}
						</Typography>

						<Button
							style={{ backgroundColor: '#ff000038', color: 'red' }}
							color="secondary"
							onClick={() => setOpenPopup(false)}>
							X
						</Button>
					</div>
				</DialogTitle>
				<DialogContent dividers>
					<div>{children}</div>
				</DialogContent>
        
			</Dialog>
		</div>
	);
}

export default Popup;
