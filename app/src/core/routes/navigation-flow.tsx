import useAuth from '@core/shared/hooks/useAuth';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from './tab-navigation';
import Login from '@screens/login';
import Typography from '@core/ut-kit/typography';
import Course from '@screens/course/course';
import ROUTES from '@core/constants/routes';
import { RootStackParamList } from './utils/types';

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
        animation: 'slide_from_right',
      }}
    >
      {isSignedIn ? (
        <>
          <Screen name="MainNavigation" component={MainNavigation} />
          <Screen name={ROUTES.COURSE} component={Course} />
        </>
      ) : (
        <Screen name="Login" component={Login} />
      )}
    </Navigator>
  );
};

export default NavigationFlow;
