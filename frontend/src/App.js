import './App.css';
import { useEffect, useState } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "./api/userApi";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async () => {
    if(editingId){
      await updateUser(editingId, { name, email });
    } else {
      await createUser({ name, email });
    }
    setName("");
    setEmail("");
    setEditingId(null);
    fetchUsers();
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

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

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

export default App;
