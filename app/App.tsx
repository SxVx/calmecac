import React from 'react';

import NavigationFlow from '@core/routes/navigation-flow';
import theme from '@core/theme';

import { NavigationContainer } from '@react-navigation/native';

import { LogBox } from 'react-native';
import AppProviders from './app-providers';

import SplashScreen from 'react-native-splash-screen';

import '@core/config/shim';

if (__DEV__) {
  import('@core/config/reactotron').then(() =>
    console.log('Reactotron Configured!'),
  );
  LogBox.ignoreLogs([/Could not find Fiber with id "\d+"/]);
}

const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 200);
  }, []);

  return (
    <AppProviders>
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
    </AppProviders>
  );
};

export default App;
