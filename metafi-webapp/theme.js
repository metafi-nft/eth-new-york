import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:{
      main:'#2172E5',
      contrastText:'#FFFFFF'
    }
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

export default darkTheme;


