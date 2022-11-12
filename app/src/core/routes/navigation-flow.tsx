import useAuth from '@core/shared/hooks/useAuth';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './tab-navigation';
import Login from '@screens/login';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const { Navigator, Screen } = createNativeStackNavigator();

const NavigationFlow = () => {
  const connection = useWalletConnect();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {connection.connected ? (
        <Screen name="MainNavigation" component={MainNavigation} />
      ) : (
        <Screen name="Login" component={Login} />
      )}
    </Navigator>
  );
};

export default NavigationFlow;
