import styled, { keyframes } from "styled-components";
import Waves from "../../assets/images/wave.svg";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";

export const LandingContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
`;

export const LandingHeader = styled(Grid)`
  background-image: url(${Waves});
  background-repeat: no-repeat;
  background-size: fit;
  background-position: center 110%;

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
  color: ${({ theme }) => theme.background.accentLight};
`;

export const LandingHeaderSubtitle = styled(Grid)`
  font-size: 1.25rem;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
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

const moveBg = keyframes`
  to {
    background-position: var(--bg-size) 0;
  }
`;

export const Cursive = styled.span`
  --color-one: #ff9500;
  --color-two: #00a6ff;
  --bg-size: 400%;
  /* font-family: "Sacramento", cursive; */
  /* font-size: 2.25rem; */
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / var(--bg-size) 100%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: 4s ${moveBg} infinite linear;
`;

export const AboutSection = styled(Grid)`
  background-image: linear-gradient(0deg, #1b5e20, #388e3c);
  min-height: 70vh;
`;

export const AboutSectionTitle = styled.h3`
  font-size: 3rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.text.secondary};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;
