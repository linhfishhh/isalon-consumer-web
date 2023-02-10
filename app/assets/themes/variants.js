import {
  primaryColor,
  secondaryColor,
  badgeColor,
  textColor,
  backgroundColor,
  borderColor,
  warningColor,
} from 'assets/colors';

const lightVariant = {
  name: 'Light',
  palette: {
    primary: {
      main: primaryColor,
      contrastText: '#FFF',
    },
    secondary: {
      main: secondaryColor,
      contrastText: '#FFF',
    },
    error: {
      main: warningColor,
      contrastText: '#FFF',
    },
    textColor,
    backgroundColor,
    borderColor,
    badgeColor,
  },
};

const variants = [lightVariant];

export default variants;
