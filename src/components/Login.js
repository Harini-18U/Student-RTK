import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'root' && password === '12345678') {
      localStorage.setItem('auth', 'true');
      navigate('/studentList');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="form-control my-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="form-control my-2"
      />
      <button onClick={handleLogin} className="btn btn-primary">Login</button>
    </div>
  );
};

export default Login;