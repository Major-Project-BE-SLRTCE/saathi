import styled from "styled-components";
import ChatbotBackground from "../../assets/images/chatbot-no-bg.png";
import ChatBubbleBackground from "../../assets/images/chat_bubble.jpg";
import ForestBackground from "../../assets/images/forest.jpg";
import Wave2 from "../../assets/images/wave2.svg";

import { Grid } from "@mui/material";
import { motion } from "framer-motion";
export const LandingContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const LandingHeader = styled(Grid)`
  background-image: url(${Wave2});
  background-repeat: no-repeat;
  background-size: fit;
  background-position: bottom;

  @media only screen and (min-width: 600px) {
    text-align: left;
    padding: 0 2rem;
    padding-bottom: 30vh;
  }
`;

export const LandingHeaderText = styled(Grid)`
  display: flex;
  align-items: center;
`;

export const LandingHeaderTitle = styled(Grid)`
  font-size: 6rem;
  // font-family: "Montserrat", sans-serif;
  font-family: "Sacramento", cursive;

  font-weight: 100;
  color: ${({ theme }) => theme.background.accent};
`;

export const LandingHeaderSubtitle = styled(Grid)`
  font-size: 1.25rem;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  color: #333;
`;

export const LandingHeaderImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 507px;
`;

export const LandingHeaderImageWrapper = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(30px);
`;

export const Cursive = styled.span`
  font-family: "Sacramento", cursive;
  font-size: 2.5rem;
`;

export const AboutSection = styled(Grid)`
  background-color: ${({ theme }) => theme.background.accent};
`;

export const AboutSectionTitle = styled.h3`
  font-size: 3rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  text-align: center;
  width: 100%;
`;
