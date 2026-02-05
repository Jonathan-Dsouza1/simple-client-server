import axiosClient from "./axiosClient";

export const getUsers = () => 
  axiosClient.get("/users");

export const createUser = (user) =>
  axiosClient.post("/users", user);

export const updateUser = (id, user) =>
  axiosClient.put(`/users/${id}`, user);

export const deleteUser = (id) =>
  axiosClient.delete(`/users/${id}`);