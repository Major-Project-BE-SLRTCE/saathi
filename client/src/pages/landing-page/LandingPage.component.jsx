import { motion, AnimatePresence } from "framer-motion";
import Grid from "@mui/material/Grid";
import {
  LandingContainer,
  LandingHeader,
  LandingHeaderSubtitle,
  LandingHeaderImage,
  LandingHeaderText,
  LandingHeaderImageWrapper,
  Cursive,
  AboutSection,
  AboutSectionTitle,
  ImageCard
} from "./LandingPage.styled";
import ChatbotBackground from "../../assets/images/saathi_logos/7.png";
import PersonalChatImage from "../../assets/images/personal_chat.svg";
import { Button, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Container } from "@mui/system";

const LandingPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <AnimatePresence>
      <LandingContainer>
        <Grid container>
          <LandingHeader item xs={12} container spacing={2}>
            <LandingHeaderText item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}>
                    <Typography variant="h1" color="secondary.contrastText">
                      Saathi
                    </Typography>
                  </motion.div>
                </Grid>

                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      delay: 0.25,
                      duration: 0.75,
                      ease: "easeOut"
                    }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "1.5rem",
                        fontWeight: 400,
                        color: "secondary.contrastText"
                      }}>
                      Your
                      <p>
                        <Cursive>personal</Cursive>
                      </p>
                      chat companion, available for you 24/7.
                    </Typography>
                  </motion.div>
                </Grid>

                <Grid item xs={12}>
                  {auth.user ? (
                    <StyledButton to="/chat">
                      <Typography variant="button">Go to Dashboard</Typography>
                    </StyledButton>
                  ) : (
                    <StyledButton to="/signup">
                      <Typography variant="button">Get started</Typography>
                    </StyledButton>
                  )}
                </Grid>
              </Grid>
            </LandingHeaderText>

            <LandingHeaderImageWrapper item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: -20 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}>
                <LandingHeaderImage src={ChatbotBackground} />
              </motion.div>
            </LandingHeaderImageWrapper>
          </LandingHeader>

          <AboutSection item xs={12}>
            <Container>
              <Grid container spacing={4}>
                <AboutSectionTitle
                  sx={{
                    mb: 4
                  }}
                  as={Typography}
                  variant="h3"
                  item
                  xs={12}>
                  What is Saathi?
                </AboutSectionTitle>
                <Grid item xs={12} container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={6}>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "grid",
                          placeItems: "center"
                        }}>
                        <ImageCard src={PersonalChatImage} />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        sx={{
                          display: "grid",
                          placeItems: "center"
                        }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            textAlign: "justify"
                          }}>
                          Saathi is a chatbot that is designed to help you with
                          your mental health. It is a personal companion that is
                          available for you 24/7. It is designed to help you
                          with your mental health and to help you cope with your
                          daily life.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </AboutSection>
        </Grid>
      </LandingContainer>
    </AnimatePresence>
  );
};

export default LandingPage;

const StyledButton = ({ children, to }) => (
  <Button
    className="box"
    size="large"
    variant="contained"
    color="primary"
    LinkComponent={Link}
    to={to}
    endIcon={<KeyboardArrowRightIcon />}
    sx={{
      fontSize: "1.15rem"
    }}>
    {children}
  </Button>
);
