import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light', // Set the mode to light
        primary: {
            main: '#000000', // Set primary color to black
        },
        secondary: {
            main: '#f50057', // Customize your secondary color for light theme
        },
        background: {
            default: '#f5f5f5', // Background color for light mode
            paper: '#ffffff', // Paper color for light mode
        },
        text: {
            primary: '#000000', // Text color for primary text
            secondary: '#616161', // Text color for secondary text
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif', // Set global font family
    },
    components: {
        // MuiButton: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: '8px', // Global button styles
        //         },
        //     },
        // },
    },
});

export default lightTheme;
