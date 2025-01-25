import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3EC99F',
      light: '#65D7B5',
      dark: '#2EA77F',
    },
    secondary: {
      main: '#8DBCDF',
      light: '#A7CEE9',
      dark: '#6EA3CC',
    },
    accent: {
      main: '#6788D5',
    },
    background: {
      default: '#F5FCFA',
      paper: '#FFFFFF',
      surface: '#E8F7F4',
    },
    text: {
      primary: '#040D0B',
      secondary: '#1A2E2B',
      disabled: '#6B7C7A',
    },
    success: {
      main: '#36BF96',
    },
    warning: {
      main: '#FFB347',
    },
    error: {
      main: '#FF6B6B',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '6px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
      light: '#1976d2',
      dark: '#1976d2',
    },
    secondary: {
      main: '#214F73',
      light: '#2D6B9A',
      dark: '#183B57',
    },
    accent: {
      main: '#2A4B98',
    },
    background: {
      default: '#1976d2',
      paper: '#1976d2',
      surface: '#1976d2',
    },
    text: {
      primary: '#F3FBFA',
      secondary: '#B8D8D4',
      disabled: '#5C7A76',
    },
    success: {
      main: '#2EA07C',
    },
    warning: {
      main: '#CC8F39',
    },
    error: {
      main: '#CC5454',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '6px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        },
      },
    },
  },
});

export default lightTheme;