import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@screens/home';

const { Navigator, Screen } = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};

export default MainNavigation;
