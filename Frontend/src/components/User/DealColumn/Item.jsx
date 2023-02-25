import { padding } from '@mui/system';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import LensIcon from '@mui/icons-material/Lens';

function Item({ text, index }) {
	return (
		<Draggable draggableId={text} index={index}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<div
						style={{
							textAlign: 'center',
							backgroundColor: '#EAF0F4',
							width: '20rem !importent',
							borderRadius: 4,
							transition: 'background-color .8s ease-out',
							height: '6rem',
							alignItems: 'center',
							border: '1px solid #509aa887',
							marginTop: '8px'
						}}>
						<span
							className="commen-font"
							style={{ float: 'right', fontSize: '12px', padding: '5px' }}>
								<LensIcon sx={{fill:'green',fontSize:'10px'}}/>
							Low
						</span>
						<p style={{ color: '#0091ae',fontWeight:'700' }}>{text}</p>
						<span style={{ color: '#33475B' }}>
							<b>Amount:</b> ₹4,4550.45
						</span>{' '}
						<br />
						<span style={{ color: '#33475B' }}>
							<b>Close Date:</b>12/2/2022{' '}
						</span>
					</div>
				</div>
			)}
		</Draggable>
	);
}

export default Item;
