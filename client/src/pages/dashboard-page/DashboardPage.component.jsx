import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { IconButton, InputBase, Paper } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { padding } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, matchPath } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const drawerWidth = 240;

import LogoutIcon from "@mui/icons-material/Logout";
import ForumIcon from "@mui/icons-material/Forum";
import SendIcon from "@mui/icons-material/Send";
import { MessageInput } from "./DashboardPage.styled";

const paperStyles = {
  boxSizing: "border-box",
  borderRadius: 2,
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
  backdropFilter: "blur( 20px )",
  WebkitBackdropFilter: "blur( 20px )",
  boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.1)",
  background: "rgba( 255, 255, 255, 0.25 )",
  height: "auto"
};

const messages = [
  {
    id: 1,
    message: "Hello, how are you?",
    self: false
  },

  {
    id: 2,
    message: "I'm fine, thank you!",
    self: true
  },
  {
    id: 3,
    message: "Good to hear that!",
    self: true
  }
];

const Dashboard = ({ page }) => {
  const [activeTab, setActiveTab] = React.useState(page);

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
    setAuth({});
    navigate("/");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            ...paperStyles,
            position: "absolute",
            top: "0.5rem",
            left: "0.5rem",
            bottom: "0.5rem"
          }
        }}
        variant="permanent"
        anchor="left">
        <AnimatePresence>
          <Toolbar />
          <Divider />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%"
            }}>
            <List>
              <ListItem
                component={motion.li}
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{
                  type: "tween"
                }}>
                <ListItemButton
                  sx={{
                    color: "secondary.contrastText",
                    borderRadius: 1
                  }}>
                  <ListItemIcon
                    sx={{
                      color: "secondary.contrastText"
                    }}>
                    <ForumIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      weight: "800"
                    }}
                    primary={"Chat"}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              <Divider />
              <ListItem
                component={motion.li}
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -200 }}
                transition={{
                  type: "tween"
                }}>
                <ListItemButton
                  sx={{
                    borderRadius: 1
                  }}
                  onClick={handleLogout}>
                  <ListItemIcon
                    sx={{
                      color: "red"
                    }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      weight: "800",
                      color: "red"
                    }}
                    primary={"Logout"}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        </AnimatePresence>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "grid",
          height: "100vh",
          gridAutoRows: "auto 1fr",
          gap: 2
        }}>
        <Toolbar disableGutters>
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{
              fontWeight: "200"
            }}>
            Chat
          </Typography>
        </Toolbar>
        <Paper
          container
          spacing={2}
          sx={{
            ...paperStyles,
            padding: 2,
            height: "100%",
            display: "grid",
            gridTemplateRows: "1fr auto"
          }}>
          <Box sx={{ flexGrow: 1, overflow: "auto" }}>
            <Grid container spacing={2}>
              {messages.map((message) => (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: message.self ? "flex-end" : "flex-start"
                  }}>
                  <Paper
                    sx={{
                      ...paperStyles,
                      position: "relative",
                      padding: 2,
                      marginLeft: message.self ? "auto" : "1rem",
                      marginRight: message.self ? "1rem" : "auto",
                      maxWidth: "50%",
                      backgroundColor: message.self
                        ? "rgba(255,255,255,0.7)"
                        : "white"
                    }}>
                    {message.message}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
          <MessageInput
            endAdornment={
              <IconButton>
                <SendIcon />
              </IconButton>
            }
            placeholder="Type your message here"
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
