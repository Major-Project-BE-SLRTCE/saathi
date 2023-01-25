// import useAxios from "../hooks/useAxios";
// import useQuery from "react-query";
import axios from "./axios";

export const forgotPassword = async (data) => {
  try {
    const res = await axios.put(`/password/forgot`, data);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const login = async (data) => {
  try {
    const res = await axios.post("/auth/login", data);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const signup = async (data) => {
  try {
    const res = await axios.post("/auth/create", data);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await axios.put("/password/reset", data);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const logout = async () => {
  try {
    const res = await axios.get("/auth/logout");
    return res;
  } catch (err) {
    return err.response;
  }
};

export const isLoggedIn = async () => {
  try {
    const res = await axios.get("/auth/is-logged-in");
    return res;
  } catch (err) {
    return err.response;
  }
};
