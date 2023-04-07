import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  NavbarContainer,
  NavbarLink,
  NavbarRedirectLinkWrapper,
  NavbarRedirectLink
} from "./Navbar.styled";
import {
  AppBar,
  Button,
  Avatar,
  Container,
  Toolbar,
  Grid,
  Typography,
  useScrollTrigger
} from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10
  });
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
    setAuth({});
    navigate("/");
  };
  const appBarStyle = trigger
    ? {
        backgroundColor: "primary.accent",
        width: "90%",
        margin: "auto",
        borderRadius: 4,
        opacity: 0.9,
        top: "0.5rem"
      }
    : {
        backgroundColor: "primary.dark",
        width: "100%",
        borderRadius: 0,
        opacity: 1
      };
  return (
    <AppBar
      position="sticky"
      sx={{
        ...appBarStyle,
        transition: "all 0.2s ease-in-out"
      }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Grid
            container
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Grid item xs={2}>
              <Typography
                variant="h6"
                sx={{
                  color: "primary.contrastText"
                }}>
                <NavbarLink to="/">Saathi</NavbarLink>
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "flex-end"
              }}>
              {!auth?.user ? (
                <>
                  <Button
                    variant="text"
                    sx={{ mr: 1, color: "primary.contrastText" }}
                    onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button
                    variant="text"
                    color="secondary"
                    sx={{ mr: 1, color: "primary.contrastText" }}
                    onClick={() => navigate("/signup")}>
                    Register
                  </Button>
                  <Button
                    variant="text"
                    color="secondary"
                    sx={{ mr: 1, color: "primary.contrastText" }}
                    onClick={() => navigate("/forgot-password")}>
                    Forgot Pwd.
                  </Button>
                  <Button
                    variant="text"
                    color="secondary"
                    sx={{ mr: 1, color: "primary.contrastText" }}
                    onClick={() => navigate("/reset-password")}>
                    Reset Pwd.
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => handleLogout()}>
                    Logout
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
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
