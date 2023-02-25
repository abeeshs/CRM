import { positions } from '@mui/system';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
const names = [
	'APPOINTMENT SCHEDULED',
	'QUALIFIED TO BUY',
	'PRESENTATION SHEDULED',
	'DECISION MAKER BOUGHT-IN',
	'CONTRACT SENT',
	'CLOSED WON',
	'CLOSED LOST'
];

function Column({ col: { list, id, name } }) {
	return (
		<Droppable droppableId={id}>
			{(provided) => (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div
						style={{
							// display: 'flex',
							display:'block',
							width: '100%',
							minHeight: '30px',
							backgroundColor: 'rgb(245, 248, 250)',
							textAlign: 'center',
							alignItems: 'center',
							justifyContent: 'center',
							border: '1px solid rgb(223, 227, 235)',
						
						}}>
							
						<h2
							style={{
								fontSize: '0.8rem',
								fontFamily:
									'var(--uicomponents-font-family,"Avenir Next W02","Lexend Deca",Helvetica,Arial,sans-serif)',
								color: '#33475b'
							}}>{name}
							
						</h2>
					</div>
					<div
						style={{
							backgroundColor: '#fff',
							padding: 16,
							width: '15rem',
							height: '100%',
							overflowX: 'auto',
							marginTop: 0,
							border: '1px solid rgb(223, 227, 235)'
						}}
						{...provided.droppableProps}
						ref={provided.innerRef}>
						
						{list.map((text, index) => (
							<Item key={text} text={text} index={index} />
						))}
						{provided.placeholder}
					</div>
					<div
						style={{
							display: 'flex',
							width: '100%',
							height: '4rem',
							backgroundColor: 'rgb(245, 248, 250)',
							textAlign: 'center',
							alignItems: 'center',
							justifyContent: 'center',
							border: '1px solid rgb(223, 227, 235)'
						}}>
						<span>
							<span>Total:</span>
							<span>₹455,455.00</span>
						</span>
						<small></small>
					</div>
				</div>
			)}
		</Droppable>
	);
}

export default Column;
