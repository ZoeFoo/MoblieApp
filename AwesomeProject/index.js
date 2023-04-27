/**
 * @format
 */

import { AppRegistry, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

//import App from './App';
import { name as appName } from './app.json';
import HomeScreen from './screens/HomeScreen';
import BusStopScreen from './screens/BusStopScreen';
import App from './navigators/AppNavigator';


AppRegistry.registerComponent(appName, () => {
    //App
    //HomeScreen
    return (
        BusStopScreen
    )
})
