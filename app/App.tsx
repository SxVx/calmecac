/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import NavigationFlow from '@core/routes/navigation-flow';
import theme from '@core/theme';
import AuthProvider from '@core/utils/providers/auth-provider';
import { NavigationContainer } from '@react-navigation/native';
import { WalletConnectProvider } from '@walletconnect/react-native-dapp/dist/providers';
import { ThemeProvider } from 'styled-components/native';

import '@core/config/shim';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <WalletConnectProvider
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}
    >
      <AuthProvider>{children}</AuthProvider>
    </WalletConnectProvider>
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
