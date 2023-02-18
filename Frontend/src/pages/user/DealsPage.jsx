import React from 'react';
import Sidebar from '../../components/User/Sidebar/Sidebar';
import ContactsTable from '../../components/User/ContactsTable/ContactsTable';
import Box from '@mui/material/Box';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import SearchIcon from '@mui/icons-material/Search';
import {
	Avatar,
	Button,
	Grid,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import Header from '../../components/User/Header/Header';
import { Container } from '@mui/system';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { object } from 'yup';

const itemFromBackend = [
	{ id: '1', contend: 'first task' },
	{ id: '2', contend: 'second task' }
];

const columnFromBackend = {
	16641464: {
		name: 'Todo',
		item: itemFromBackend
	}
};
function DealsPage() {
	const onDragEnd=(result) =>{
    // dropped outside the list
    if (!result.destination) {
      return;
    }
}
	const [columns, setColumns] = useState(columnFromBackend);
	console.log(columns);
	return (
		<div>
			<Header />
			<Container maxWidth="xl">
				<Box>
					<Typography component="div" variant="h6">
						Deals
					</Typography>
				</Box>
				<Box>
					<Box display="flex" sx={{ float: 'right' }}>
						<Button variant="contained" sx={{ color: 'white', backgroundColor: 'black' }}>
							Create Deals
						</Button>
					</Box>
					<Box display="flex" sx={{ float: 'right', marginRight: '15px' }}>
						<Button variant="outlined" sx={{ color: 'black', border: '1px solid black' }}>
							Import
						</Button>
					</Box>
				</Box>
			</Container>

			<Divider sx={{ paddingTop: '20px', width: '100%' }} />
			<Container maxWidth="xl">
				<Box sx={{ marginTop: '20px' }}>
					<form>
						<Box display="flex">
							<input style={{ height: '35px' }} type="search" />
							<SearchIcon />
						</Box>
					</form>
				</Box>
				<DragDropContext onDragEnd={onDragEnd}>
					{console.log(Object.entries(columns))}
					{Object.entries(columns).map(([id, column]) => {
						console.log(id);
						console.log(column);
						return (
							<Droppable droppableId={id} key={id}>
								{(provided, snapshot) => {
									return (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											style={{
												background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
												padding: 4,
												width: 250,
												minHeight: 500
											}}>
											{column.item.map((item, index) => {
												console.log(item);
												return (
													<Draggable key={item.id} draggableId={item.id} index={index}>
														{(provided, snapshot) => {
															return (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	style={{
																		userSelect: 'none',
																		padding: 16,
																		margin: '0 0 8px 0',
																		minHeight: '50px',
																		backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
																		color: 'white',
																		...provided.draggableProps.style
																	}}>
																	{item.contend}
																</div>
															);
														}}
													</Draggable>
												);
											})}
										</div>
									);
								}}
							</Droppable>
						);
					})}

					{/* <Box sx={{ flexGrow: 1 }}>
						<Grid container>
							<Grid item xs={12} sm={2}>
								<Box
									sx={{
										backgroundColor: 'white',
										border: '1px solid grey',
										width: '100%',
										height: '200px'
									}}>
									<Box
										sx={{
											width: '100%',
											height: '30px',
											border: '1px solid grey',
											backgroundColor: '#c3151a21',
											textAlign: 'center'
										}}>
										<Typography>This is header</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={2}>
								<Box
									sx={{
										backgroundColor: 'white',
										border: '1px solid grey',
										width: '100%',
										height: '200px'
									}}>
									<Box
										sx={{
											width: '100%',
											height: '30px',
											border: '1px solid grey',
											backgroundColor: '#c3151a21',
											textAlign: 'center'
										}}>
										<Typography sx={{ justifyContent: 'center' }}>This is header</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={2}>
								<Box
									sx={{
										backgroundColor: 'white',
										border: '1px solid grey',
										width: '100%',
										height: '200px'
									}}>
									<Box
										sx={{
											width: '100%',
											height: '30px',
											border: '1px solid grey',
											backgroundColor: '#c3151a21',
											textAlign: 'center'
										}}>
										<Typography>This is header</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={2}>
								<Box
									sx={{
										backgroundColor: 'white',
										border: '1px solid grey',
										width: '100%',
										height: '200px'
									}}>
									<Box
										sx={{
											width: '100%',
											height: '30px',
											border: '1px solid grey',
											backgroundColor: '#c3151a21',
											textAlign: 'center'
										}}>
										<Typography>This is header</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={2}>
								<Box
									sx={{
										backgroundColor: 'white',
										border: '1px solid grey',
										width: '100%',
										height: '200px'
									}}>
									<Box
										sx={{
											width: '100%',
											height: '30px',
											border: '1px solid grey',
											backgroundColor: '#c3151a21',
											textAlign: 'center'
										}}>
										<Typography>This is header</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item xs={2}>
								<Box
									sx={{
										backgroundColor: 'white',
										border: '1px solid grey',
										width: '100%',
										height: '200px'
									}}>
									<Box
										sx={{
											width: '100%',
											height: '30px',
											border: '1px solid grey',
											backgroundColor: '#c3151a21',
											textAlign: 'center'
										}}>
										<Typography>This is header</Typography>
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Box> */}
				</DragDropContext>
			</Container>
		</div>
	);
}

export default DealsPage;
