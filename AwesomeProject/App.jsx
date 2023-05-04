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
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen name="BusStop"
                        component={BusStopScreen}
                        options={{
                            title: '',
                            headerStyle: {
                                backgroundColor: '#005eb2',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontSize: 25,
                                fontWeight: 'bold',
                            },
                        }}
                    />

                    <Stack.Screen name="RouteDetail"
                        component={RouteDetailScreen}
                        options={{
                            title: '',
                            headerStyle: {
                                backgroundColor: '#005eb2',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontSize: 20,
                                fontWeight: 'bold',
                            },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}

export default App;