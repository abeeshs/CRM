import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import *as userService from '../../../services/userService'
import { useState } from 'react';
import { useEffect } from 'react';


const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'username', headerName: 'User Namwe', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'mobile',
    headerName: 'Mobile',
    width: 200,
  },
  {
    field: 'createdAt',
    headerName: 'Created On',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];



export default function Usertable() {
  const rows=[]
  const [users,setUsers]=useState([])
  users.map((item,index)=>{
    item.id=index+1
    rows.push(item)
  })
  console.log(rows);

  const getUserData= async()=>{
    const userData= await userService.getAllUser()
    console.log(userData)
    if(userData){
      setUsers(userData)
    }
  }

  useEffect(()=>{
  getUserData()
  },[])
  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Users</h2>
      
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}