import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../Components/Card.jsx";
import Button from "../Components/Button.jsx";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/auth/employee/${id}`);
        console.log("Employee Data:", response.data); // Debugging log

        if (response.data.Status && response.data.Result) {
          setEmployee(response.data.Result);
        } else {
          setError("No data found.");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError("Failed to fetch employee details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg font-semibold mt-10 text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg font-semibold mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 p-6 shadow-xl rounded-lg bg-white border">
        <div className="p-4">
          {employee?.image && (
            <img
              src={`http://localhost:3000/uploads/${employee.image}`}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full mb-4 border-2 border-gray-300"
            />
          )}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            {employee?.name || "No Name Available"}
          </h2>
          <p className="text-gray-600 text-center mb-2">
            {employee?.email || "No Email Available"}
          </p>
          <p className="text-gray-700 text-center mb-2 font-medium">
            Position: {employee?.position || "Not Assigned"}
          </p>
          <p className="text-gray-700 text-center mb-4 font-medium">
            Department: {employee?.department || "Not Assigned"}
          </p>
          <Button 
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200" 
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
