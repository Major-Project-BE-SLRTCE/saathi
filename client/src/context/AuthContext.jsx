import { createContext, useEffect, useState } from "react";

import { isLoggedIn } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    userId: "",
    name: "",
    userType: "",
  });

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const res = await isLoggedIn();

      console.log(res);

      if (res.status === 200) {
        setAuth({
          ...auth,
          isLoggedIn: true,
          userId: res.data.userId,
          name: res.data.name,
          userType: res.data.userType,
        });
      }
    };

    checkIsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
