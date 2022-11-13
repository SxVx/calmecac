import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@screens/home';
import ROUTES from '@core/constants/routes';
import TabBar from './components/tab-bar';
import Profile from '@screens/profile';
import Notifications from '@screens/notifications';
import Courses from '@screens/courses';
import Typography from '@core/ut-kit/typography';

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
      <Screen name={ROUTES.NOTIFICATIONS} component={Notifications} />
      <Screen name={ROUTES.PROFILE} component={Profile} />
    </Navigator>
  );
};

export default TabNavigator;
