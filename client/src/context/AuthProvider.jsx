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
    console.log(auth);
  }, [auth]);

  // useEffect(() => {
  //   const res = isLoggedIn();
  //   console.log(res);
  //   if (res.status === 200) {
  //     setAuth({
  //       ...auth,
  //       accessToken: res.data.accessToken,
  //       user: res.data.user
  //     });
  //   } else {
  //     setAuth({});
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
