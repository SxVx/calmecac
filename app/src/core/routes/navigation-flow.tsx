import useAuth from '@core/shared/hooks/useAuth';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './tab-navigation';
import Login from '@screens/login';
import Typography from '@core/ut-kit/typography';

const { Navigator, Screen } = createNativeStackNavigator();

const NavigationFlow = () => {
  const {
    isLoading,
    authState: { isSignedIn },
  } = useAuth();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isSignedIn ? (
        <Screen name="MainNavigation" component={MainNavigation} />
      ) : (
        <Screen name="Login" component={Login} />
      )}
    </Navigator>
  );
};

export default NavigationFlow;
