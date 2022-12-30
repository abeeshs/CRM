import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar, { DrawerHeader } from './components/Admin/Sidebar/Sidebar';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import Tasks from './pages/admin/Tasks';
import UserRegister from './pages/user/Register'
import UserLogin from './pages/user/Login'
import Home from './pages/user/Home'
import TasksPage from './pages/user/TasksPage'
import './App.css'
import Contacts from './pages/user/Contacts';
import DealsPage from './pages/user/DealsPage';
import Conversation from './pages/user/Conversation';


// 	return (
// 		<>
// 			<Router>
// 				<Routes>
// 					<Route path="/admin/login" element={<Login />} />
// 					<Route path="/admin/register" element={<Register />} />
// 				</Routes>
// 				<Box sx={{ display: 'flex' }}>
// 					<Sidebar />
// 					<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// 						<DrawerHeader />

// 						<Routes>
// 							<Route path="/admin">
// 								<Route path="/admin" element={<Dashboard />} />

// 								<Route path="/admin/task" element={<Tasks />} />
// 							</Route>
// 						</Routes>
// 					</Box>
// 				</Box>
// 			</Router>
// 			<ToastContainer />
// 		</>
// 	);
// }

// export default App;
function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/admin/login" element={<Login />} />
					<Route path="/admin/register" element={<Register />} />
					<Route path='/' element={<UserLogin/>}/>
					<Route path='/signup' element={<UserRegister/>}/>
					<Route path='/home' element={<Home/>}/>
					<Route path='/contacts' element={<Contacts/>}/>
					<Route path='/task' element={<TasksPage/>}/>
					<Route path='/deals' element={<DealsPage/>}/>
					<Route path='/conversation' element={<Conversation/>}/>

				{/* </Routes>
			
				<Routes> */}
					

					<Route path="/admin" element={<Dashboard />} />

					<Route path="/admin/task" element={<Tasks />} />
					
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
