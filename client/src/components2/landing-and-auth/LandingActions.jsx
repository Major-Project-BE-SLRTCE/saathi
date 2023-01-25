import { Link } from "react-router-dom";

import { Button } from "@mui/material";

import "./css/landing-actions.css";

const LandingActions = () => {
  return (
    <div className="landing-actions-container">
      <div className="landing-header">
        <span className="landing-title">Saathi</span>
        <span className="landing-subtitle">A Mental Health Chatbot</span>
      </div>

      <div className="landing-actions">
        <Link className="landing-actions-link" to="/auth/login">
          <Button className="landing-button" variant="contained">
            Login
          </Button>
        </Link>

        <Link className="landing-actions-link" to="/auth/signup">
          <Button className="landing-button" variant="outlined">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingActions;
