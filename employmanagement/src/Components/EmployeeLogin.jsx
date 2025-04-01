import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
    const [values, setValues] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!values.email || !values.password) {
            setError("Email and Password are required");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/employee/employee_login', values, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.data.loginStatus) {
                localStorage.setItem("valid", true);
                navigate(`/employee_detail/${response.data.id}`);
            } else {
                setError(response.data.Error);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-100 w-md-75 w-lg-50 w-xl-25 border loginForm'>
                {error && <div className='text-danger'>{error}</div>}
                <h2 className="text-center">Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email" className="form-label"><strong>Email:</strong></label>
                        <input
                            type="email"
                            name='email'
                            autoComplete='off'
                            placeholder='Enter Email'
                            onChange={(e) => setValues({...values, email: e.target.value})}
                            className='form-control rounded-0'
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label"><strong>Password:</strong></label>
                        <input
                            type="password"
                            name='password'
                            placeholder='Enter Password'
                            onChange={(e) => setValues({...values, password: e.target.value})}
                            className='form-control rounded-0'
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <div className='mb-1 form-check'>
                        <input type="checkbox" name="tick" id="tick" className='form-check-input' />
                        <label htmlFor="tick" className="form-check-label">You agree with terms & conditions</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeLogin;