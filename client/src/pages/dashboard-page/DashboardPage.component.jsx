import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { padding } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const drawerWidth = 240;

import LogoutIcon from "@mui/icons-material/Logout";

const Dashboard = () => {
  const [activeTab, setActiveTab] = React.useState(0);
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
            boxSizing: "border-box",
            borderRadius: 2,
            border: "none",
            boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.1)",
            background:
              "linear-gradient(45deg, #ffffff55 10%, rgba(255,255,255,0.1) 80%, #ffffff70)",
            position: "absolute",
            top: "0.5rem",
            left: "0.5rem",
            bottom: "0.5rem",
            height: "auto"
          }
        }}
        variant="permanent"
        anchor="left">
        <AnimatePresence>
          <Toolbar />
          <Divider />

          <List>
            <ListItem
              component={motion.li}
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{
                type: "tween"
              }}>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
        </AnimatePresence>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Dashboard;
