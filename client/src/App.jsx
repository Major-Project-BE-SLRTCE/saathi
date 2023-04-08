import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ReactQueryDevtools } from "react-query/devtools";

// import axios from "axios";

import Navbar from "./components/Navbar/Navbar.component";
import LandingPage from "./pages/landing-page/LandingPage.component";
import LoginPage from "./pages/auth-pages/LoginPage/LoginPage.component";
import SignupPage from "./pages/auth-pages/SignupPage/SignupPage.component";
import ForgotPasswordPage from "./pages/auth-pages/ForgotPasswordPage.component";
import ResetPasswordPage from "./pages/auth-pages/ResetPasswordPage.component";
import DashboardPage from "./pages/dashboard-page/DashboardPage.component";
import { styledTheme, muiTheme } from "./utils/theme";

import RequireAuth from "./components/RequireAuth/RequireAuth.component";
// axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={styledTheme}>
        <MuiThemeProvider theme={muiTheme}>
          <AuthProvider>
            <Router>
              <Navbar />
              <Routes>
                {/* public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPasswordPage />}
                />
                {/* private routes */}
                <Route path="/" element={<RequireAuth />}>
                  <Route path="/chat" element={<DashboardPage />} />
                  <Route path="/profile" element={<DashboardPage />} />
                </Route>
              </Routes>
            </Router>

            {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
            <ToastContainer
              // draggable={false}
              // toastStyle={{
              //   backgroundColor: "#333",
              //   opacity: 0.9,
              //   color: "#fff",
              //   fontSize: "1.2rem"
              // }}
              position="bottom-right"
              autoClose={3000}
            />
          </AuthProvider>
        </MuiThemeProvider>
      </ThemeProvider>
      {/* <ReactQueryDevtools
        position="bottom-right"
        panelProps={{
          style: {
            position: "absolute",
            bottom: 0,
            right: 0
          }
        }}
        initialIsOpen={false}
      /> */}
    </QueryClientProvider>
  );
};

export default App;
