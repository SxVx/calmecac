const FONT_FAMILY = 'Poppins';

const theme = {
  colors: {
    primary: '#272424',
    background: {
      primary: '#272424',
    },
    font: {
      primary: '#f2e6e4 ',
    },
  },
  typography: {
    medium: {
      fontFamily: `${FONT_FAMILY}-Medium`,
    },
    bold: {
      fontFamily: `${FONT_FAMILY}-Bold`,
    },
    mediumBold: {
      fontFamily: `${FONT_FAMILY}-SemiBold`,
    },
  },
};

export type Theme = typeof theme;

export default theme;
