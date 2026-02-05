import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { 
  getUsers,
  createUser,
  updateUser,
  deleteUser 
} from '../api/userApi';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      if(error.response && error.response.status === 401){
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token){
      navigate("/login");
      return;
    }

    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    try{
      setErrors({});
  
      if(editingId){
        await updateUser(editingId, { name, email });
      } else {
        await createUser({ name, email });
      }
  
      setName("");
      setEmail("");
      setEditingId(null);
      fetchUsers();
    } catch(error){
      if(error.response && error.response.status === 400){
        setErrors(error.response.data);
      } else{
        console.log(error);
        console.log(error.response);
        alert(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>User Management</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      {errors.name && (
        <div style={{color: "red"}}>{errors.name}</div>
      )}

      <br />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {errors.email && (
        <div style={{color: "red"}}>{errors.email}</div>
      )}

      <br/>
      <button onClick={handleSubmit}>
        {editingId ? "Update User" : "Add User"}
      </button>
      
      <p>ID | NAME | EMAIL</p>
      
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.id} | {user.name} | {user.email}
            <button onClick={() => startEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
