import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
// import Navbar from "./components/Navbar/Navbar.component";
// import NotFound from "./components/utils/NotFound";

// import Landing from "./pages/Landing";
// import LandingActions from "./components/landing-and-auth/LandingActions";
// import Auth from "./components/landing-and-auth/Auth";
// import ResetPassword from "./components/landing-and-auth/ResetPassword";

// import PatientDashboard from "./pages/PatientDashboard";
// import DoctorDashboard from "./pages/DoctorDashboard";

import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar/Navbar.component";

import LandingPage from "./pages/landing-page/LandingPage.component";
import LoginPage from "./pages/login-page/LoginPage.component";

import theme from "./utils/theme";

axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {/* <AuthProvider> */}
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
        {/* <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Landing />}>
          <Route path="/" element={<LandingActions />} />
          {/* <Route path="/auth/:authType" element={<Auth />} /> }
          <Route
          path="/auth/reset-password/:token"
          element={<ResetPassword />}
          />
            </Route>
            <Route
            path="/dashboard"
            element={1 === 1 ? <PatientDashboard /> : <DoctorDashboard />}
            />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Router> */}

        <ToastContainer position="bottom-right" autoClose={3000} />
        {/* </AuthProvider> */}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
