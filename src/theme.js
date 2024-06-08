import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9"
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e"
    },
    text: {
      primary: "#ffffff",
      secondary: "#a4a4a4"
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily:
      "'Raleway','Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 200
    },
    h5: {
      fontWeight: 300,
      fontSize: 30
    },
    h6: {
      fontWeight: 200
    },
    body1: {
      fontWeight: 200
    }
  }
});

export default theme;
