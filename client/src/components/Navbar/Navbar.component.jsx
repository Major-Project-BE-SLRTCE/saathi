import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  NavbarContainer,
  NavbarLink,
  NavbarRedirectLinkWrapper,
  NavbarRedirectLink
} from "./Navbar.styled";
import { AppBar, Button, Avatar, Container, Toolbar } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
    setAuth({});
    navigate("/");
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        display: "grid",
        gridTemplateColumns: "4rem 1fr",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
      }}>
      <Container>
        <Toolbar disableGutters>
          <div>saathi</div>
          <div>menu</div>
        </Toolbar>
      </Container>
    </AppBar>
    // <NavbarContainer>
    //   <NavbarLink to="/">Saathi</NavbarLink>

    //   <NavbarRedirectLinkWrapper>
    //     {!auth?.user ? (
    //       <>
    //         <NavbarRedirectLink to="/login">Login</NavbarRedirectLink>
    //         <NavbarRedirectLink to="/signup">Register</NavbarRedirectLink>
    //         <NavbarRedirectLink to="/forgot-password">
    //           Forgot Pwd.
    //         </NavbarRedirectLink>
    //         <NavbarRedirectLink to="/reset-password">
    //           Reset Pwd.
    //         </NavbarRedirectLink>
    //       </>
    //     ) : (
    //       <>
    //         <NavbarRedirectLink to="/dashboard">Dashboard</NavbarRedirectLink>
    //         <Button variant="outlined" onClick={() => handleLogout()}>
    //           Logout
    //         </Button>
    //       </>
    //     )}
    //   </NavbarRedirectLinkWrapper>
    // </NavbarContainer>
  );
};

export default Navbar;
