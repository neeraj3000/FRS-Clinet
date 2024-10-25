import React, { useState } from 'react';
import '../styles/AddUser.css';
import { useNavigate } from 'react-router-dom';

function UserManagement() {
  const [id, setId] = useState('');
  const [password, setpassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate(); // Navigation hook for redirecting

  // Add User function
  const addUser = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (id && password.includes('@')) {
      const newUser = { id, password, role };

      try {
        const response = await fetch('http://localhost:5000/add-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          alert('User added successfully!');
          setId('');
          setpassword('');
          setRole('student');
        } else {
          alert('Failed to add user.');
        }
      } catch (error) {
        alert('Error adding user.');
      }
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  // Redirect to Camera Page function
  const redirectToCamera = () => {
    navigate('/camera'); // Redirect to the camera page route
  };

  return (
    <div className="user-management-container">
      <h2>ADD USER</h2>
      <form className="form-container" onSubmit={addUser}>
        <label>Student/Faculty ID</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter College/Faculty ID"
          required
        />

        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter password"w
          required
          title="Please enter a valid password address."
        />

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === 'student'}
              onChange={() => setRole('student')}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="faculty"
              checked={role === 'faculty'}
              onChange={() => setRole('faculty')}
            />
            Faculty
          </label>
        </div>

        {/* Reversed Button Order */}
        <button onClick={redirectToCamera} type="button">Capture Face Embeddings</button>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserManagement;