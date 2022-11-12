import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@screens/home';
import ROUTES from '@core/constants/routes';
import { RootStackParamList } from './utils/types';

const { Navigator, Screen } = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.HOME}
    >
      <Screen name={ROUTES.HOME} component={Home} />
    </Navigator>
  );
};

export default MainNavigation;
