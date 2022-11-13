import Reactotron from 'reactotron-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron!.configure().setAsyncStorageHandler!(AsyncStorage)
  .useReactNative({ storybook: true })
  .connect();
