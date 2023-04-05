import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { AuthProvider } from "./context/AuthContext";
// import axios from "axios";

import Navbar from "./components/Navbar/Navbar.component";
import LandingPage from "./pages/landing-page/LandingPage.component";
import LoginPage from "./pages/auth-pages/LoginPage.component";
import SignupPage from "./pages/auth-pages/SignupPage.component";
import ForgotPasswordPage from "./pages/auth-pages/ForgotPasswordPage.component";
import ResetPasswordPage from "./pages/auth-pages/ResetPasswordPage.component";
import DashboardPage from "./pages/dashboard-page/DashboardPage.component";
import theme from "./utils/theme";

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
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Navbar />

            <Routes>
              {/* public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
              />

              {/* private routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </Router>

          <ToastContainer position="bottom-right" autoClose={3000} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
