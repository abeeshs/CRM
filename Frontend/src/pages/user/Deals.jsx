import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Column from '../../components/User/DealColumn/Column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import {
	Box,
	Button,
	Container,
	IconButton,
	InputBase,
	MenuItem,
	Paper,
	Select
} from '@mui/material';
import Header from '../../components/User/Header/Header';
import SearchIcon from '@mui/icons-material/Search';
const initialColumns = {
	sheduled: {
		id: 'sheduled',
		list: ['item 1', 'item 2', 'item 3', 'item 4'],
		name: 'APPOINTMENT SCHEDULED'
	},
	qualified: {
		id: 'qualified',
		list: [],
		name: 'QUALIFIED TO BUY'
	},
	SHEDULED: {
		id: 'SHEDULED',
		list: [],
		name: 'PRESENTATION SHEDULED'
	},
	DECISION: {
		id: 'DECISION',
		list: [],
		name: 'DECISION MAKER BOUGHT-IN'
	},
	SENT: {
		id: 'SENT',
		list: [],
		name: 'CONTRACT SENT'
	},
	WON: {
		id: 'WON',
		list: [],
		name: 'CLOSED WON'
	},
	LOST: {
		id: 'LOST',
		name: 'CLOSED LOST',
		list: []
	}
};
function Deals() {
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};
	const [columns, setColumns] = useState(initialColumns);
	console.log(columns);
	const onDragEnd = (DropResult) => {
		const { source, destination } = DropResult;
		console.log(DropResult);
		// Make sure we have a valid destination
		if (destination === undefined || destination === null) return null;

		// Make sure we're actually moving the item
		if (source.droppableId === destination.droppableId && destination.index === source.index)
			return null;

		// Set start and end variables
		const start = columns[source.droppableId]; //todo
		const end = columns[destination.droppableId]; //doing

		// If start is the same as end, we're in the same column
		if (start === end) {
			console.log({ start });
			// console.log(source.index)
			// Move the item within the list
			// Start by making a new list without the dragged item
			const newList = [];
			start.list.forEach((val, idx) => {
				if (idx != source.index && idx <= 2) {
					newList.push(val);
				}
			});
			console.log(newList);

			// Then insert the item at the right location
			newList.splice(destination.index, 0, start.list[source.index]);
			// console.log(newList.splice(destination.index, 0, start.list[source.index]))
			// console.log(newList)

			// Then create a new copy of the column object
			const newCol = {
				id: start.id,
				list: newList
			};

			// Update the state
			setColumns((state) => ({ ...state, [newCol.id]: newCol }));
			return null;
		} else {
			// If start is different from end, we need to update multiple columns
			// Filter the start list like before
			const newStartList = start.list.filter((value, idx) => idx !== source.index);

			// Create a new start column
			const newStartCol = {
				id: start.id,
				list: newStartList,
				name: start.name
			};

			// Make a new end list array
			const newEndList = end.list;

			// Insert the item into the end list
			newEndList.splice(destination.index, 0, start.list[source.index]);

			// Create a new end column
			const newEndCol = {
				id: end.id,
				list: newEndList,
				name: end.name
			};

			// Update the state
			setColumns((state) => ({
				...state,
				[newStartCol.id]: newStartCol,
				[newEndCol.id]: newEndCol
			}));
			return null;
		}
	};
	return (
		<>
			<Header />
			<Box
				sx={{
					width: '100%',
					height: '80px',
					borderBottom: '1px solid rgb(223, 227, 235)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}>
				<Box
					sx={{
						width: '43rem',
						height: '2.5rem',
						display: 'flex',
						justifyContent: 'space-around'
					}}>
					<span
						className="commen-font"
						style={{ fontSize: '1.5rem', fontWeight: '600', color: '#0091ae' }}>
						Deals
					</span>
					<Box
						sx={{
							width: '12rem',
							height: '2.5rem',
							mr: '12px',
							border: '1px solid #F5F8FA',
							borderRadius: '5px'
						}}>
						<Select
							sx={{ width: '100%', height: '100%', backgroundColor: '#F5F8FA' }}
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={'age'}
							label="Age"
							onChange={handleChange}>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</Box>
					<Box
						sx={{
							width: '12rem',
							height: '2.5rem',
							mr: '12px',
							border: '1px solid #F5F8FA',
							borderRadius: '5px'
						}}>
						<Select
							sx={{ width: '100%', height: '100%', backgroundColor: '#F5F8FA' }}
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={'age'}
							label="Age"
							onChange={handleChange}>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</Box>
				</Box>
				<Box sx={{ width: '20rem', height: '2.5rem', mr: '20px' }}>
					<Button
						variant="contained"
						className="deal-btn"
						sx={{ backgroundColor: '#FF7A59', float: 'right' }}>
						Create Deal
					</Button>
				</Box>
			</Box>
			<Box
				sx={{
					width: '100%',
					height: '80px',
					display: 'flex',
					alignItems: 'center',
				}}>
				<Box sx={{ border: '1px solid grey', ml: '25px' }}>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Search Google Maps"
						inputProps={{ 'aria-label': 'search google maps' }}
					/>
					<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
						<SearchIcon />
					</IconButton>
				</Box>
				<Box sx={{ border: '1px solid grey', ml: '25px' }}>
					
				</Box>
				
			</Box>

			<DragDropContext onDragEnd={onDragEnd}>
				<Container maxWidth="xl">
					<div>
						<div
							style={{
								display: 'flex',
								width: '100',
								minHeight: '68vh',
								// gap: '1px',
								border: '1px solid rgb(223, 227, 235)',
								backgroundColor: 'grey',
								overflowX: 'scroll'
							}}>
							{Object.values(columns).map((col) => (
								<Column col={col} key={col.id} />
							))}
						</div>
					</div>
				</Container>
			</DragDropContext>
		</>
	);
}

// function Item(props) {
// 	console.log(props);
// 	return <div>{props.text}</div>;
// }
// const StyledColumn = styled("div", {
//     padding: "24px 0",
//     display: "flex",
//     flexDirection: "column",
//     marginTop: 8,

//     h2: {
//       margin: 0,
//       padding: "0 16px"
//     }
//   });

// function Column(props) {
//     const list =['item1','item2','item3']

// 	return (
// 		<Droppable droppableId={id}>
//       {(provided) => (
//         <StyledColumn>
//           <h2>{id}</h2>
//           <StyledList {...provided.droppableProps} ref={provided.innerRef}>
//             {list.map((text, index) => (
//               <Item key={text} text={text} index={index} />
//             ))}
//             {provided.placeholder}
//           </StyledList>
//         </StyledColumn>
//       )}
//     </Droppable>
// 	);
// }
export default Deals;
