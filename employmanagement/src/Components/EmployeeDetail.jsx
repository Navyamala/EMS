import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Components/EmployeeDetail.css'; // Import CSS for styling

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/employee/detail/${id}`)
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.data);
                } else {
                    console.log(result.data.Error);
                }
            })
            .catch(err => console.log("Error fetching employee details:", err));
    }, [id]);

    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid");
                    navigate('/');
                }
            }).catch(err => console.log("Error during logout:", err));
    };

    return (
        <div className="employee-detail-container">
            <div className="header">
                <h4>Employee Management System</h4>
            </div>
            <div className='details-wrapper'>
                <img
                    src={`http://localhost:3000/uploads/${employee.image}`}
                    className='employee-image'
                    alt="Employee"
                />
                <div className='employee-info'>
                    <h3>Name: {employee.name}</h3>
                    <h3>Email: {employee.email}</h3>
                    <h3>Salary: ${employee.salary}</h3>
                </div>
                <div className="button-group">
                    <button className='edit-button'>Edit</button>
                    <button className='logout-button' onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
