import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Components/Employee.css"; // Import the CSS file

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  // Fetch employee data when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle employee deletion
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/auth/delete_employee/${id}`)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h3>Employee List</h3>
        <Link to="/dashboard/add_employee" className="add-employee-button">
          Add Employee
        </Link>
      </div>
      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th className="hide-on-small">Address</th>
              <th className="hide-on-small">Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.length > 0 ? (
              employee.map((e) => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>
                    <img
                      src={`http://localhost:3000/uploads/${e.image}`}
                      className="employee-image"
                      alt="Employee"
                      width="80"
                      height="80"
                      style={{ objectFit: "cover", borderRadius: "5px" }}
                    />
                  </td>
                  <td>{e.email}</td>
                  <td className="hide-on-small">{e.address}</td>
                  <td className="hide-on-small">{e.salary}</td>
                  <td>
                    <Link
                      to={`/dashboard/edit_employee/${e.id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;