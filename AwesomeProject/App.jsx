import React from 'react';
import HomeScreen from './screens/HomeScreen';
import BusStopScreen from './screens/BusStopScreen';
import RouteDetailScreen from './screens/RouteDetailScreen';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home"
                        component={HomeScreen}
                    />

                    <Stack.Screen name="BusStop"
                        component={BusStopScreen}
                    />

                    <Stack.Screen name="RouteDetail"
                        component={RouteDetailScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App;