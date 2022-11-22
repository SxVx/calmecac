import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '@core/theme';

const withStyledComponents = (Story, context) => (
  <ThemeProvider theme={theme}>
    <Story {...context} />
  </ThemeProvider>
);

export default withStyledComponents;