import { createTheme } from "@mui/material/styles";
import InterFont from "../assets/fonts/Inter.ttf";

const styledTheme = {
  text: {
    primary: "#fff",
    secondary: "#eee"
  },
  background: {
    accent: "#388E3C",
    accentLight: "#4caf50",
    accentDark: "#1b5e20"
  }
};

const muiTheme = createTheme({
  palette: {
    primary: {
      light: "#4caf50",
      main: "#388E3C",
      dark: "#1b5e20",
      contrastText: "#fff"
    },
    secondary: {
      light: "#e3f0d2",
      main: "#dcedc7",
      dark: "#9aa58b",
      contrastText: "#000"
    }
  },
  typography: {
    fontFamily: "Inter, Arial"
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Inter';
          src: local('Inter'), url(${InterFont})  format("opentype");
        }
      `
    }
  }
});

export { styledTheme, muiTheme };
