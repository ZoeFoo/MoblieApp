import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Loading from "../components/Loading";
import Map from "../components/Map";
import BusRoutesETAItem from '../components/bus/BusRoutesETAItem';

export default function RouteDetailScreen({ navigation, route }) {
    //console.log({ route })
    const routeNum = (route.params ?? {})['routeNum'];
    const destination = (route.params ?? {})['destination'];
    const latitude = (route.params ?? {})['latitude'];
    const longitude = (route.params ?? {})['longitude'];
    const whichStop = (route.params ?? {})['whichStop'];
    const stopName = (route.params ?? {})['stopName'];
    navigation.setOptions({ title: `${routeNum} 往 ${destination}` });

    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading && <View style={styles.loadingContainer}>
                <Loading />
            </View>}

            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={{ height: 300 }}>
                    <Map latitude={latitude} longitude={longitude} />
                </View>

                <View style={styles.stopNameContainer}>
                    <Text style={styles.stopNameText}>
                        {stopName}
                    </Text>
                </View>

                <View>
                    <BusRoutesETAItem
                        routeNum={routeNum}
                        whichStop={whichStop}
                        setIsLoading={setIsLoading}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative'
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 100,
        alignSelf: 'center',
        backgroundColor: 'white'
    },
    stopNameContainer: {
        height: '8%',
        justifyContent: 'center'
    },
    stopNameText: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: '5%'
    },
})