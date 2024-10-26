import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AddUser from './pages/AddUser';
import Dashboard from './components/AttendanceChart';
/**
 * The main component of the application.
 * 
 * @returns {JSX.Element} The rendered App component.
 */
const App=()=>{
  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adduser" element={<AddUser/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        
  {/* <Route path="/student" element={<Student />} />
  <Route path="/faculty" element={<Faculty />} /> */}
      </Routes> 
    </Router> 
  )
}
export default App;