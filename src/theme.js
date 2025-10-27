import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#4B5043", // greenish-gray
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#9BC4BC", // soft teal
            contrastText: "#090909",
        },
        background: {
            default: "#D3FFE9", // minty white
            paper: "#ffffff",
        },
        text: {
            primary: "#090909", // dark text
            secondary: "#4B5043",
        },
        info: {
            main: "#8DDBE0", // light aqua
        },
        success: {
            main: "#D3FFE9", // mint green
        },
    },

    shape: {
        borderRadius: 10,
    },

    typography: {
        fontFamily: "'Inter', sans-serif",
        subtitle2: {
            color: "#7A7A7A", // lighter gray for small text
        }
    }
});

export default theme;
