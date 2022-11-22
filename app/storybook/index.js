// if you use expo remove this line
import { AppRegistry } from 'react-native';

import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import SplashScreen from 'react-native-splash-screen';

import Reactotron from 'reactotron-react-native';
import App from '../App';

import './config/rn-addons';
import withStyledComponents from './stories/decorators/withStyledComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';

// enables knobs for all stories
addDecorator(withKnobs);
addDecorator(withStyledComponents);

// import stories
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage,
  onDeviceUI: true,
});

SplashScreen.hide();

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
// AppRegistry.registerComponent('calmecac', () => StorybookUIRoot);

export default Reactotron.storybookSwitcher(StorybookUIRoot)(App);
