import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import QuicksandLight from "./fonts/Quicksand/Quicksand-Light.ttf";
import QuicksandRegular from "./fonts/Quicksand/Quicksand-Regular.ttf";
import QuicksandMedium from "./fonts/Quicksand/Quicksand-Medium.ttf";
import QuicksandBold from "./fonts/Quicksand/Quicksand-Bold.ttf";
import KarmaLight from "./fonts/Karma/Karma-Light.ttf";
import KarmaRegular from "./fonts/Karma/Karma-Regular.ttf";
import KarmaBold from "./fonts/Karma/Karma-Bold.ttf";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "Quicksand-Medium, Raleway, Arial",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Quicksand-Light';
          font-style: normal;
          font-display: swap;
          font-weight: 300;
          src: local('Quicksand-Light'), url(${QuicksandLight}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Quicksand';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Quicksand'), url(${QuicksandRegular}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Quicksand-Medium';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Quicksand-Medium'), url(${QuicksandMedium}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Quicksand-Bold';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('Quicksand-Bold'), url(${QuicksandBold}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Karma-Light';
          font-style: normal;
          font-display: swap;
          font-weight: 300;
          src: local('Karma-Light'), url(${KarmaLight}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Karma';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Karma'), url(${KarmaRegular}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Karma-Bold';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Karma-Bold'), url(${KarmaBold}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
