import React from 'react';

import useAuth from '@core/shared/hooks/useAuth';
import TabNavigator from './tab-navigator';
import Login from '@screens/login';
import Typography from '@core/ut-kit/typography';
import Course from '@screens/course';
import ROUTES from '@core/constants/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from './components/header';
import { StatusBar } from 'react-native';

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
    <>
      <StatusBar animated translucent backgroundColor="transparent" />
      <Navigator
        screenOptions={{
          animation: 'slide_from_right',
          header: () => <Header />,
          headerBackground: undefined,
          headerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        initialRouteName={ROUTES.TAB_NAVIGATOR}
      >
        {isSignedIn ? (
          <>
            <Screen name={ROUTES.TAB_NAVIGATOR} component={TabNavigator} />
            <Screen name={ROUTES.COURSE} component={Course} />
          </>
        ) : (
          <Screen name={ROUTES.LOGIN} component={Login} />
        )}
      </Navigator>
    </>
  );
};

export default NavigationFlow;
