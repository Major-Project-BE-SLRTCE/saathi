import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { SnackbarNotification } from "../utils/Notifications";
import useAuth from "../../hooks/useAuth";

import { logout } from "../../utils/auth";

import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    const logoutRes = await logout();

    if (logoutRes.status === 200) {
      setAuth({
        ...auth,
        isLoggedIn: false,
        userId: "",
        name: "",
        userType: "",
      });

      navigate("/auth/login");
      setSeverity("success");
    } else {
      setSeverity("error");
    }

    setMessage(logoutRes.data.message);
    setOpenSnackbar(true);
  };

  return (
    <div className="navbar">
      <Link className="nl-link" to="/">
        Saathi
      </Link>

      <div>
        {auth.isLoggedIn ? (
          <IconButton sx={{ ml: "8px" }} onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        ) : (
          <>
            <Link className="nr-link" to="/auth/login">
              Login
            </Link>

            <Link className="nr-link" to="/auth/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>

      <SnackbarNotification
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity={severity}
        message={message}
      />
    </div>
  );
};

export default Navbar;
