import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
const axios = require('axios');
const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users"); 
      const result = response.data;
      setUsers(result);
    } catch (error) {
      console.error("Error retrieving products:", error);
    }
  };

  const logout = () => {
    localStorage.clear();

    navigate("/signup");
  };

  return (
    <div className="text-center mt-3">
      <div className="d-flex justify-content-around">
        <div>
          <h1>Users List</h1>
        </div>
        <div>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
      <Table dark>
        <thead>
          <tr>
            <th className="p-2 border border-dark">Sr.no</th>
            <th className="p-2 border border-dark">Name</th>
            <th className="p-2 border border-dark">Date of Birth</th>
            <th className="p-2 border border-dark">Email</th>
            <th className="p-2 border border-dark">Password</th>
            <th className="p-2 border border-dark">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={item._id}>
              <td className="p-2 border border-dark">{index + 1}</td>
              <td className="p-2 border border-dark">{item.username}</td>
              <td className="p-2 border border-dark">{item.dob}</td>
              <td className="p-2 border border-dark">{item.useremail}</td>
              <td className="p-2 border border-dark">{item.password}</td>
              <td className="p-2 border border-dark gap-2">
                <Button color="danger">Delete</Button>

                <Button color="success"> Update </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
