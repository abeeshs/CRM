import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as userService from '../../../services/userService';
import { useState } from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import {
	Button,
	FormControlLabel,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';

// const columns = [
// 	{ field: 'id', headerName: 'ID', width: 200 },
// 	{ field: 'username', headerName: 'User Namwe', width: 200 },
// 	{ field: 'email', headerName: 'Email', width: 200 },
// 	{
// 		field: 'mobile',
// 		headerName: 'Mobile',
// 		width: 200
// 	},
// 	{
// 		field: 'createdAt',
// 		headerName: 'Created On',
// 		description: 'This column has a value getter and is not sortable.',
// 		sortable: false,
// 		width: 200
// 		// valueGetter: (params) =>
// 		//   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
// 	}
// ];

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export default function Usertable() {
	const rows = [];
	const [users, setUsers] = useState([]);
	users.map((item, index) => {
		item.id = index + 1;
		rows.push(item);
	});
	console.log(rows);

	const getUserData = async () => {
		const userData = await userService.getAllUser();
		console.log(userData);
		if (userData) {
			setUsers(userData);
		}
	};

	useEffect(() => {
		getUserData();
	}, []);
	return (
		// <div style={{ height: 400, width: '100%' }}>
		//   <h2>Users</h2>

		//   <DataGrid
		//     rows={rows}
		//     columns={columns}
		//     pageSize={5}
		//     rowsPerPageOptions={[5]}
		//     checkboxSelection
		//   />
		// </div>
		<TableContainer>
			<Table sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow sx={{ fontSize: '25px30px', fontWeight: '900', backgroundColor: '#9e9e9e' }}>
						<TableCell>Sl No</TableCell>
						<TableCell>Username</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Mobile</TableCell>
						<TableCell>Created On</TableCell>

						<TableCell>Action</TableCell>
						<TableCell>Block /Unblock</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((item, index) => (
						<TableRow key={item._id}>
							<TableCell>{index + 1}</TableCell>
							<TableCell>{item.username}</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell>{item.mobile}</TableCell>
							<TableCell>{item.createdAt}</TableCell>
							

							<TableCell>
								<Button sx={{ width: '10px' }} variant="outlined">
									{/* <EditIcon /> */}
								</Button>
								<Button variant="outlined" color="error"></Button>
							</TableCell>
              <FormControlLabel
								control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
								label=""
							/>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
