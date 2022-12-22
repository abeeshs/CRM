import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';


function App() {
	return (
		<>
			<Router>
				<div className='container'>
        
					<Routes>
            
            <Route path='/admin' element={<Dashboard/>}/>
            <Route path='/admin/login' element={<Login/>}/>
            <Route path='/admin/register' element={<Register/>}/>
          </Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
