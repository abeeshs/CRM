import React from 'react'
import TaskTable from '../../components/Admin/TaskTable/TaskTable'
import { Box } from '@mui/material';

import Sidebar,{DrawerHeader} from '../../components/Admin/Sidebar/Sidebar';
function Tasks() {
  return (
    <>
    <Box sx={{ display: 'flex' }}>
				<Sidebar />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />
          <TaskTable />
				</Box>
			</Box>
   
    
    </>
  )
}

export default Tasks