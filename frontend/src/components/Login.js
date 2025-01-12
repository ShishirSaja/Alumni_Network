// Login Component (e.g., Login.js)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // If you're using react-router

const Login = () => {
    const [department_name, setDepartmentName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/alumni/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ department_name, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
            // Assuming the backend returns a token
            localStorage.setItem('token', data.token);  // Save the token
            alert('Login successful');
            navigate('/admin-panel');  // Redirect to admin page
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Admin Login</h2>
            <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg">
                <div className="mb-4">
                    <label htmlFor="department_name" className="block text-sm font-semibold text-gray-700">Department</label>
                    <input
                        type="text"
                        id="department_name"
                        value={department_name}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded mt-4">Login</button>
            </form>
        </div>
    );
};

export default Login;
