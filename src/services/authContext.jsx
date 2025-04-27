// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// Custom hook to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component for authentication logic
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data after login

  // Login function that posts data to the API
  const login = async (email, password, role) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data);
      // Store token and role in local storage
      console.log(data.token.access_token); 
      localStorage.setItem('token', data.token.access_token);
      localStorage.setItem('role', role);

      setUser({ email, role, token: data.token.access_token });

      return { email, role, token: data.token.access_token }; // Return user data or token
    } catch (error) {
      console.error(error);
      throw new Error('Login failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
