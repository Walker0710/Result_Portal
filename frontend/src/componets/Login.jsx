import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5000";

const Login = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {rollNumber, password});
      localStorage.setItem('token', response.data.token); //use of this
      navigate('/result');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="text"
        placeholder="Roll Number"
        value={rollNumber}
        onChange = {(e) => setRollNumber(e.target.value)}
      />
      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange = {(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;