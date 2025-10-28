import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#4B5043",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#9BC4BC",
            contrastText: "#090909",
        },
        background: {
            default: "#D3FFE9",
            paper: "#ffffff",
        },
        text: {
            primary: "#090909",
            secondary: "#4B5043",
        },
        info: {
            main: "#8DDBE0",
        },
        success: {
            main: "#66BB6A", // 💚 updated for Time In
        },
        status: {
            in: "#66BB6A", // new dedicated color for "In"
            out: "#4B5043", // softer dark for "Out"
        },
    },
    shape: {
        borderRadius: 10,
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        subtitle2: { color: "#7A7A7A" },
        subtitle3: { color: "#7A7A7A" },
    },
});

export default theme;
