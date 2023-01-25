import { Outlet } from "react-router-dom";

import "./css/landing.css";
import ChatbotImg from "../assests/chatbot.jpg";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-img-container">
        <img className="landing-img" src={ChatbotImg} alt="Chatbot" />
      </div>

      <div className="landing-actions-component-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Landing;
