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
  AboutSectionTitle,
} from "./LandingPage.styled";
import Wave2 from "../../assets/images/wave2.svg";
import ChatbotBackground from "../../assets/images/saathi_logos/7.png";
const LandingPage = () => {
  return (
    <AnimatePresence>
      <LandingContainer
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
      // transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Grid container>
          <LandingHeader item xs={12} container spacing={2}>
            <LandingHeaderText item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <LandingHeaderTitle>Saathi</LandingHeaderTitle>
                  </motion.div>
                </Grid>
                <Grid item xs={12}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      delay: 0.5,
                      duration: 0.75,
                      ease: "easeOut",
                    }}
                  >
                    <LandingHeaderSubtitle>
                      Your <Cursive>personal</Cursive> chat companion, available
                      for you 24/7.
                    </LandingHeaderSubtitle>
                  </motion.div>
                </Grid>
              </Grid>
            </LandingHeaderText>
            <LandingHeaderImageWrapper item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: -20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <LandingHeaderImage src={ChatbotBackground} />
              </motion.div>
            </LandingHeaderImageWrapper>
          </LandingHeader>
          <AboutSection item xs={12} container>
            <AboutSectionTitle item xs={12}>
              What is Saathi?
            </AboutSectionTitle>
          </AboutSection>
        </Grid>
      </LandingContainer>
    </AnimatePresence>
  );
};

export default LandingPage;
