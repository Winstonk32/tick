import React, { useState } from 'react';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true); // Switch between login and signup
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleToggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
      alert('Login successful!');
      setError('');
      // Redirect or load user data as needed
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSignup = () => {
    if (localStorage.getItem(username)) {
      setError('Username already exists');
      return;
    }

    const newUser = {
      username,
      password,
    };

    localStorage.setItem(username, JSON.stringify(newUser));
    alert('Account created successfully!');
    setError('');
    setIsLogin(true); // Switch to login mode after signup
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="authentication">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <button onClick={handleToggleAuthMode}>
        {isLogin ? 'Create an account' : 'Have an account? Log in'}
      </button>
    </div>
  );
};

export default Authentication;
