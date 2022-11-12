const FONT_FAMILY = 'Poppins';

type SpacingMap = {
  [K in `${Spacing}${SpacingValues}`]: keyof typeof theme.spacing;
};

const theme = (function Theme() {
  const baseValues = (spacingType: Spacing) =>
    ({
      [`${spacingType}X`]: ': 0 {{value}}px',
      [`${spacingType}Y`]: ': {{value}}px 0',
      [`${spacingType}Top`]: '-top: {{value}}px',
      [`${spacingType}Bottom`]: '-bottom: {{value}}px',
      [`${spacingType}Left`]: '-left: {{value}}px',
      [`${spacingType}Right`]: '-right: {{value}}px',
    } as SpacingProps);

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
      primary: '#202',
    },
  };

  const spacing = {
    xs: 4,
    s: 8,
    sm: 12,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  };

  const typography = {
    small: {
      fontSize: spacing.sm,
      fontFamily: `${FONT_FAMILY}`,
    },
    medium: {
      fontFamily: `${FONT_FAMILY}-Medium`,
      fontSize: spacing.m,
    },
    bold: {
      fontFamily: `${FONT_FAMILY}-Bold`,
    },
    mediumBold: {
      fontFamily: `${FONT_FAMILY}-Bold`,
      fontSize: spacing.m,
    },
  };

  const getSpacing = (map: SpacingMap, spacingType: Spacing) => {
    const margin = baseValues(spacingType);

    return Object.keys(margin)
      .map(key => ({
        key,
        value: theme.spacing[map[key]],
        transform: margin[key],
      }))
      .filter(({ value }) => !!value)
      .map(({ transform, value }) => {
        const result = transform.replace('{{value}}', value);

        return `${spacingType}${result};`;
      })
      .join('\n');
  };

  const utils = {
    getMargin: (map: SpacingMap) => getSpacing(map, 'margin'),
    getPadding: (map: SpacingMap) => getSpacing(map, 'padding'),
  };

  return {
    fontFamily,
    colors,
    typography,
    spacing,
    utils,
  };
})();

export type Theme = typeof theme;

export default theme;
