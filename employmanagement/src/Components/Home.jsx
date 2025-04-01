import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }).catch(error => console.error("Error fetching admin records:", error));
  };

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
      .then(result => {
        console.log("Admin count response:", result.data);
        if (result.data.Status && result.data.Result.length > 0) {
          setAdminTotal(result.data.Result[0].admin);
        }
      }).catch(error => console.error("Error fetching admin count:", error));
  };

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
      .then(result => {
        console.log("Employee count response:", result.data);
        if (result.data.Status && result.data.Result.length > 0) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      }).catch(error => console.error("Error fetching employee count:", error));
  };

  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salary_count')
      .then(result => {
        console.log("Salary count response:", result.data);
        if (result.data.Status && result.data.Result.length > 0) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp);
        } else {
          alert(result.data.Error);
        }
      }).catch(error => console.error("Error fetching salary count:", error));
  };

  return (
    <div className="container-fluid">
      <div className='row p-3 mt-3 justify-content-around'>
        <div className='col-md-4 col-sm-6 mb-3'>
          <div className='px-3 pt-2 pb-3 border shadow-sm'>
            <div className='text-center pb-1'>
              <h4>Admin</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{adminTotal}</h5>
            </div>
          </div>
        </div>
        <div className='col-md-4 col-sm-6 mb-3'>
          <div className='px-3 pt-2 pb-3 border shadow-sm'>
            <div className='text-center pb-1'>
              <h4>Employee</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{employeeTotal}</h5>
            </div>
          </div>
        </div>
        <div className='col-md-4 col-sm-6 mb-3'>
          <div className='px-3 pt-2 pb-3 border shadow-sm'>
            <div className='text-center pb-1'>
              <h4>Salary</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>${salaryTotal}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4 px-md-5 px-sm-3 pt-3'>
        <h3>List of Admins</h3>
        <div className="table-responsive">
          <table className='table'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a, index) => (
                <tr key={index}>
                  <td>{a.email}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2">Edit</button>
                    <button className="btn btn-warning btn-sm">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;