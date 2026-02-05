import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axiosClient from '../api/axiosClient';

export default function LandingPage() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axiosClient.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (error) {
      alert("Invalid Credentials. ");
    }
  };

  const handleRegister = async () => {
    try{
      await axiosClient.post("/auth/register", {
        name,
        email,
        password
      })

      alert("Registration successful. Please Login.");
      setMode("login");
    } catch (error) {
      alert("Registration Failed.");
    }
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center"}}>
      <h1>Welcome</h1>
      
      <div style={{marginBottom: "1rem"}}>
        <button onClick={() => setMode("login")}>Login</button>
        <button onClick={() => setMode("register")}>Register</button>
      </div>

      {mode === "login" ? (
        <>
          <h2>Login</h2>
          
          <div>
            <input 
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />
            <br />

            <input 
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
            />
            <br />

            <button onClick={handleLogin}>Login</button>
          </div>
        </>
      ) : (
        <>
          <h2>Register</h2>
          <div> 
            <input 
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}  
            />
            <br />

            <input 
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />
            <br />

            <input 
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
            />
            <br />

            <button onClick={handleRegister}>Login</button>
          </div>
        </>
      )}
    </div>
  )
}
