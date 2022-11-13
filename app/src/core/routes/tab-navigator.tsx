import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@screens/home';
import ROUTES from '@core/constants/routes';
import TabBar from './components/tab-bar';
import Profile from '@screens/profile';
import Search from '@screens/search';
import Courses from '@screens/courses';

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      initialRouteName={ROUTES.HOME}
    >
      <Screen name={ROUTES.MY_COURSES} component={Courses} />
      <Screen name={ROUTES.HOME} component={Home} />
      <Screen name={ROUTES.NOTIFICATIONS} component={Search} />
      <Screen name={ROUTES.PROFILE} component={Profile} />
    </Navigator>
  );
};

export default TabNavigator;
