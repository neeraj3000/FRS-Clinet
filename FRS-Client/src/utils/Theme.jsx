import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Set the mode to dark
        primary: {
            main: '#bb86fc', // Customize your primary color for dark theme
        },
        secondary: {
            main: '#03dac6', // Customize your secondary color for dark theme
        },
        background: {
            default: '#121212', // Background color for dark mode
            paper: '#1e1e1e', // Paper color for dark mode
        },
        text: {
            primary: '#ffffff', // Text color for primary text
            secondary: '#b0bec5', // Text color for secondary text
        },
        // action: {
        //     hover: 'rgba(3, 218, 198, 0.2)',  // Customize the hover color here
        // }
    },
    typography: {
        fontFamily: 'Arial, sans-serif', // Set global font family
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Global button styles
                },
            },
        },
    },
});

export default darkTheme;