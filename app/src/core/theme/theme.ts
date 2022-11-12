const FONT_FAMILY = 'Poppins';

const theme = (function Theme() {
  const fontFamily = FONT_FAMILY;

  const colors = {
    primary: '#d44338',
    secondary: '#e8de8b',
    tertiary: '#dbd9b8',
    quaternary: '#e5e3e9',
    quinary: '#2b0a6d',
    background: {
      primary: '#d44338',
      secondary: '#e8de8b',
      tertiary: '#dbd9b8',
      quaternary: '#e5e3e9',
      quinary: '#2b0a6d',
    },
    font: {
      primary: '#e5e3e9',
    },
  };

  const spacing = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  };

  const typography = {
    medium: {
      fontFamily: `${FONT_FAMILY}-Medium`,
      fontSize: spacing.m,
    },
    bold: {
      fontFamily: `${FONT_FAMILY}-Bold`,
    },
    mediumBold: {
      fontFamily: `${FONT_FAMILY}-Medium`,
      fontSize: spacing.m,
    },
  };

  return {
    fontFamily,
    colors,
    typography,
    spacing,
  };
})();

export type Theme = typeof theme;

export default theme;
