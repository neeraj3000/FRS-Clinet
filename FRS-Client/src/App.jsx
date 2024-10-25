import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
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
  {/* <Route path="/student" element={<Student />} />
  <Route path="/faculty" element={<Faculty />} /> */}
      </Routes> 
    </Router> 
  )
}
export default App;