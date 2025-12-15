import React, { useState } from 'react';
import './LoginScreen.css';

function LoginScreen({ onLoginSuccess }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Hardcoded credentials for university requirement
  const VALID_CREDENTIALS = {
    userId: 'user',
    password: '1234'
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      if (userId === VALID_CREDENTIALS.userId && password === VALID_CREDENTIALS.password) {
        // Store authentication in localStorage
        localStorage.setItem('freshchain_auth', 'true');
        onLoginSuccess();
      } else {
        setError('Invalid User ID or Password. Please try again.');
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <span>🥬</span>
          </div>
          <h1>FreshChain</h1>
          <p>Blockchain Food Traceability System</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="userId">
              <span className="label-icon">👤</span>
              User ID
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your User ID"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <span className="label-icon">🔒</span>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading || !userId || !password}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              <>
                <span>🚀</span>
                Login to Dashboard
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="demo-credentials">
            <strong>Demo Credentials:</strong><br />
            User ID: <code>user</code> | Password: <code>1234</code>
          </p>
          <p className="login-note">
            This is a mock authentication screen for university demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
