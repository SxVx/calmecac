/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import NavigationFlow from '@core/routes/navigation-flow';
import theme from '@core/theme';
import AuthProvider from '@core/utils/providers/auth-provider';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

const AppProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer
        theme={{
          // @ts-ignore
          colors: {
            background: theme.colors.background.primary,
          },
        }}
      >
        <NavigationFlow />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
