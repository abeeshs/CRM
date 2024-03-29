import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import Tasks from './pages/admin/Tasks';
import UserRegister from './pages/user/Register';
import UserLogin from './pages/user/Login';
import Home from './pages/user/Home';
import TasksPage from './pages/user/TasksPage';
import './App.css';
import Contacts from './pages/user/Contacts';
import Conversation from './pages/user/Conversation';
import PendingTask from './pages/user/PendingTask';
import CompletedTask from './pages/user/CompletedTask';
import OtpEmail from './pages/user/OtpEmail';
import VarifyOTP from './pages/user/VarifyOTP';
import Deals from './pages/user/Deals';
import Meetings from './pages/user/Meetings';
import MeetingPage from './pages/admin/MeetingPage';
import NewMeeting from './pages/admin/NewMeeting';
import AdminContacts from './pages/admin/AdminContacts';
import Profile from './pages/user/Profile';

// export default App;
function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/admin/login" element={<Login />} />
					<Route path="/admin/register" element={<Register />} />
					<Route path="/login" element={<UserLogin />} />
					<Route path="/" element={<Home/>} />
					<Route path="/otp-login" element={<OtpEmail />} />
					<Route path="/verify-otp" element={<VarifyOTP />} />
					<Route path="/signup" element={<UserRegister />} />
					<Route path="/home" element={<Home />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/task" element={<TasksPage />} />
					<Route path="/deals" element={<Deals />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/conversation" element={<Conversation />} />
					<Route path="/task/pending-task" element={<PendingTask />} />
					<Route path="/task/completed-task" element={<CompletedTask />} />
					<Route path="/meetings" element={<Meetings />} />

					{/* </Routes>
			
				<Routes> */}

					<Route path="/admin" element={<Dashboard />} />

					<Route path="/admin/task" element={<Tasks />} />
					<Route path="/admin/contacts" element={<AdminContacts />} />

					<Route path="/admin/meetings" element={<MeetingPage />} />
					<Route path="/admin/meetings/new-meeting" element={<NewMeeting />} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
