import React, { useState } from 'react';
import './SingleViewModal.css';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import toast, { Toaster } from 'react-hot-toast';
import DeleteModal from '../DeleteModal';
import EditMeeting from '../../User/Forms/EditMeeting/EditMeeting';
import Popup from '../../User/Popup/Popup';

function SingleViewModal(props) {
	const {
		title,
		children,
		singleView,
		setSingleView,
		confirmDelete,
		selectedMeeting,
		getMeetings
	} = props;
	const [openModal, setOpenModal] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const handleClose = () => {};

	return (
		<div>
			<Dialog
				fullWidth={true}
				maxWidth={'lg'}
				open={singleView}
				sx={{
					borderRadius: '10px !importand',
					'& .MuiPaper-root': {
						borderRadius: '15px'
					}
				}}>
				{/* x */}
				<DialogContent dividers sx={{ backgroundColor: '#F9F9FA ', height: '500px' }}>
					<div>{children}</div>
				</DialogContent>
				<DialogActions></DialogActions>
				<DeleteModal
					title={'Delete Meeting'}
					message={'Do you want to delete this meeting ?'}
					openModal={openModal}
					confirmDelete={confirmDelete}
					setOpenModal={setOpenModal}></DeleteModal>

				<Popup
					title={'Edit Meeting'}
					width={'md'}
					openPopup={openPopup}
					setOpenPopup={setOpenPopup}>
					<EditMeeting
						selectedMeeting={selectedMeeting}
						setSingleView={setSingleView}
						getMeetings={getMeetings}
						setOpenPopup={setOpenPopup}
					/>
				</Popup>
			</Dialog>
		</div>
	);
}

export default SingleViewModal;
