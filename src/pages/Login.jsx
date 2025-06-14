

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ Initialize navigate

  const validateUsername = (username) => username.length >= 3;
  const validatePassword = (password) => password.length >= 8;

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateUsername(username) || !validatePassword(password)) return;

  setLoading(true);
  try {
    const response = await fetch('http://localhost:8000/api/v1/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Assuming response contains accessToken and userInfo
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.userInfo)); // optional

    alert('Login successful!');
    navigate('/dashboard');
  } catch (error) {
    alert(error.message || 'Something went wrong.');
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <i className="fas fa-sign-in-alt text-purple-600 fa-lg"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Mashmari Doot</h2>
              <p className="text-gray-600 mt-2">Sign in to access the monitoring dashboard</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600"
                  placeholder="e.g. admin"
                />
                {username && !validateUsername(username) && (
                  <p className="mt-2 text-sm text-red-600">Username must be at least 3 characters</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {password && !validatePassword(password) && (
                  <p className="mt-2 text-sm text-red-600">Password must be at least 8 characters</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 focus:ring-4 focus:ring-purple-600 focus:ring-opacity-50"
                disabled={
                  loading ||
                  (username && !validateUsername(username)) ||
                  (password && !validatePassword(password))
                }
              >
                {loading ? 'Processing...' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right: Branding Section */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-12">
            <h2 className="text-6xl font-bold mb-2 text-purple-200 drop-shadow-lg">MASHMARI</h2>
            <p className="text-xl">DASHMARI DOOT MONITORING</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
