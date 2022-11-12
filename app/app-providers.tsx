import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import theme from '@core/theme';
import { WalletConnectProvider } from '@walletconnect/react-native-dapp/dist/providers';
import AuthProvider from '@core/utils/providers/auth-provider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppProviders = ({ children }) => (
  <ThemeProvider theme={theme}>
    <WalletConnectProvider
      storageOptions={{
        // @ts-ignore
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
      <AuthProvider>
        {children}
      </AuthProvider>
    </WalletConnectProvider>
  </ThemeProvider>
);

export default AppProviders;
