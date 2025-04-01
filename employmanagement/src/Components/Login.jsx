import React, { useState } from 'react';
import axios from 'axios';
import '../Components/style.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = isRegistering
            ? 'http://localhost:3000/auth/register'
            : 'http://localhost:3000/auth/adminlogin';

        axios.post(url, values)
            .then(response => {
                if (response.data.success) {
                    setMessage(isRegistering ? "Registration successful! Please log in." : "Login successful!");
                    if (!isRegistering) {
                        localStorage.setItem('authToken', response.data.token);
                        navigate('/dashboard');  // Use navigate here for a clean SPA redirect
                    }
                } else {
                    setMessage(response.data.message);
                }
            })
            .catch(err => {
                console.error(err);
                setMessage("An error occurred. Please try again.");
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-75 w-md-50 w-lg-25 border loginForm'>
                <h2>{isRegistering ? "Register" : "Login"}</h2>
                {message && <p className="text-danger">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email" className='form-label'><strong>Email:</strong></label>
                        <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })} className='form-control rounded-0' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className='form-label'><strong>Password:</strong></label>
                        <input type="password" name='password' placeholder='Enter Password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' required />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>
                        {isRegistering ? "Register" : "Log in"}
                    </button>
                    <div className='text-center'>
                        <span
                            onClick={() => setIsRegistering(!isRegistering)}
                            className='text-primary' style={{ cursor: 'pointer' }}>
                            {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;