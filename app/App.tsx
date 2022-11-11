/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import NavigationFlow from '@core/routes/navigatiion-flow';
import AuthProvider from '@core/utils/providers/auth-provider';
import { NavigationContainer } from '@react-navigation/native';
import React, { type PropsWithChildren } from 'react';

const AppProvider = ({ children }) => <AuthProvider>{children}</AuthProvider>;

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <NavigationFlow />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
