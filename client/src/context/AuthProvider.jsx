import { createContext, useEffect, useState } from "react";
import { isLoggedIn } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    accessToken: localStorage.getItem("ACCESS_TOKEN"),
    user: JSON.parse(localStorage.getItem("USER"))
  }));

  useEffect(() => {
    if (auth.accessToken && auth.user) {
      localStorage.setItem("ACCESS_TOKEN", auth.accessToken);
      localStorage.setItem("USER", JSON.stringify(auth.user));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
