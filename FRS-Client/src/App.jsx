import React from 'react';
import { Routes, Route } from 'react-router-dom';

/**
 * The main component of the application.
 * 
 * @returns {JSX.Element} The rendered App component.
 */
const App=()=>{
  return(
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
{/* <Route path="/student" element={<Student />} />
<Route path="/faculty" element={<Faculty />} /> */}
    </Routes>  
  )
}
export default App;