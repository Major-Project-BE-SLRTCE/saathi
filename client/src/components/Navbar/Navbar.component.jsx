import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  NavbarContainer,
  NavbarLink,
  NavbarRedirectLinkWrapper,
  NavbarRedirectLink
} from "./Navbar.styled";
import Button from "@mui/material/Button";
import { logout } from "../../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleLogout = async () => {
    const logoutRes = await logout();

    if (logoutRes.status === 200) {
      setAuth({
        ...auth,
        isLoggedIn: false,
        userId: "",
        name: "",
        userType: ""
      });

      navigate("/login");
    } else {
      console.log("Logout Error:", logoutRes.data.message);
    }
  };

  return (
    <NavbarContainer>
      <NavbarLink to="/">Saathi</NavbarLink>

      <NavbarRedirectLinkWrapper>
        {!auth.isLoggedIn ? (
          <>
            <NavbarRedirectLink to="/login">Login</NavbarRedirectLink>
            <NavbarRedirectLink to="/signup">Register</NavbarRedirectLink>
            <NavbarRedirectLink to="/forgot-password">
              Forgot Pwd.
            </NavbarRedirectLink>
            <NavbarRedirectLink to="/reset-password">
              Reset Pwd.
            </NavbarRedirectLink>
          </>
        ) : (
          <>
            <NavbarRedirectLink to="/dashboard">Dashboard</NavbarRedirectLink>
            <Button variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </NavbarRedirectLinkWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
