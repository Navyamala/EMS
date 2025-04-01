import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: null,
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEmployee((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(employee).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/add_employee",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.Status) {
        navigate("/dashboard/employee");
      } else {
        alert(response.data.Error);
      }
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-75 w-md-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          {["name", "email", "password", "salary", "address"].map((field) => (
            <div className="col-12" key={field}>
              <label className="form-label" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                className="form-control rounded-0"
                id={field}
                name={field}
                placeholder={`Enter ${field}`}
                autoComplete="off"
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
          <div className="col-12">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <select
              name="category_id"
              id="category"
              className="form-select"
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="image">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="image"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;