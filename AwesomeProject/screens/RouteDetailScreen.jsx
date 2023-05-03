import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "../components/Map";
import BusRoutesETAItem from '../components/bus/BusRoutesETAItem';

export default function RouteDetailScreen({ navigation, route }) {
    console.log({ route })
    const routeNum = (route.params ?? {})['routeNum'];
    const destination = (route.params ?? {})['destination'];
    const whichStop = (route.params ?? {})['whichStop'];
    const stopName = (route.params ?? {})['stopName'];

    navigation.setOptions({ title: `${routeNum} 往 ${destination}` })
    const [refreshing, setRefreshing] = React.useState(false);
    //const [stopETAData, setStopETAData] = useState(null);

    //useEffect(() => {
    //    (async () => {
    //        const data = await api.getBusStopETA(`${whichStop}`);
    //        const etaData = await data.data;

    //        const groupByRoute = await etaData.reduce((group, routes) => {
    //            const { route } = routes;
    //            group[route] = group[route] ?? [];
    //            group[route].push(routes);
    //            return group;
    //        }, {});
    //        console.log('aaaaaaaaaaaaaaaaaaaaaa', groupByRoute)
    //        setStopETAData(groupByRoute);
    //    })()
    //}, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={{ height: 300 }}>
                    <Map />
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
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
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