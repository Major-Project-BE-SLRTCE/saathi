import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  NavbarContainer,
  NavbarLink,
  NavbarRedirectLinkWrapper,
  NavbarRedirectLink
} from "./Navbar.styled";
import Button from "@mui/material/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
    setAuth({});
    navigate("/");
  };
  console.log("navbar", auth);
  return (
    <NavbarContainer>
      <NavbarLink to="/">Saathi</NavbarLink>

      <NavbarRedirectLinkWrapper>
        {!auth?.user ? (
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
            <Button variant="outlined" onClick={() => handleLogout()}>
              Logout
            </Button>
          </>
        )}
      </NavbarRedirectLinkWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
