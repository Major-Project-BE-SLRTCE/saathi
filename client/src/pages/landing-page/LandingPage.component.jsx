import { motion, AnimatePresence } from "framer-motion";
import Grid from "@mui/material/Grid";
import {
  LandingContainer,
  LandingHeader,
  LandingHeaderSubtitle,
  LandingHeaderTitle,
  LandingHeaderImage,
  LandingHeaderText,
  LandingHeaderImageWrapper,
  Cursive,
  AboutSection,
  AboutSectionTitle
} from "./LandingPage.styled";
import ChatbotBackground from "../../assets/images/saathi_logos/7.png";
import { Button, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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
                    <LandingHeaderTitle>Saathi</LandingHeaderTitle>
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
                    <LandingHeaderSubtitle>
                      Your
                      <p>
                        <Cursive>personal</Cursive>
                      </p>
                      chat companion, available for you 24/7.
                    </LandingHeaderSubtitle>
                  </motion.div>
                </Grid>

                <Grid item xs={12}>
                  {auth.user ? (
                    <StyledButton to="/dashboard">
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

          <AboutSection item xs={12} container>
            <AboutSectionTitle as={Typography} variant="h3" item xs={12}>
              What is Saathi?
            </AboutSectionTitle>
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
