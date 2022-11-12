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
import { LogBox } from 'react-native';

if (__DEV__) {
  import('@core/config/reactotron').then(() =>
    console.log('Reactotron Configured!'),
  );
  LogBox.ignoreLogs([/Could not find Fiber with id "\d+"/]);
}

const AppProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <WalletConnectProvider
      storageOptions={{
        asyncStorage: AsyncStorage,
      }}
      clientMeta={{
        description: 'Connect to Calmecac',
        url: 'https://walletconnect.org',
        icons: ['https://walletconnect.org/walletconnect-logo.png'],
        name: 'Calmecac',
      }}
      bridge="https://bridge.walletconnect.org"
      redirectUrl="https://walletconnect.org/walletconnect-qrcode.html"
      storageId="@walletconnect"
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
