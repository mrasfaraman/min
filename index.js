/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => App);