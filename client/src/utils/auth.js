import api from "./axios";

export const isLoggedIn = async (data) => {
  try {
    const res = await api.get("/api/auth/is-logged-in", data);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const signup = async (data) => {
  try {
    const res = await api.post("/api/user/create", data);
    console.log(res);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const login = async (data) => {
  try {
    const res = await api.post("/api/auth/login", data);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const logout = async (data) => {
  try {
    const res = await api.get("/api/auth/logout", data);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const forgotPassword = async (data) => {
  try {
    const res = await api.post("api/auth/forgot-password", data);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const resetPassword = async (data) => {
  try {
    const res = await api.post("api/auth/reset-password", data);
    return res;
  } catch (err) {
    return err.response;
  }
};
