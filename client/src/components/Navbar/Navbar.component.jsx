import { useNavigate, useLocation } from "react-router-dom";
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
import { useEffect } from "react";
// import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
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
        background: "transparent",
        width: "100%",
        margin: "auto",
        borderRadius: 4,
        opacity: 1,
        top: "0.5rem",
        boxShadow: "none"
      };
  const navbarLocations = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/"
  ];
  return navbarLocations.some((item) => item === location.pathname) ? (
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
                    color="secondary"
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
                    variant="text"
                    color="secondary"
                    sx={{
                      mr: 1,
                      color: "primary.contrastText"
                    }}
                    onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </Button>
                  <Button
                    variant="text"
                    color="secondary"
                    sx={{ mr: 1, color: "primary.contrastText" }}
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
  ) : (
    <></>
  );
};

export default Navbar;
