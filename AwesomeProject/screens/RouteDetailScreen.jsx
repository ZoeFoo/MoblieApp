import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ScrollView, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from "../locales";
import Map from "../components/Map";
import Loading from "../components/Loading";
import BusRoutesETAItem from '../components/bus/BusRoutesETAItem';

export default function RouteDetailScreen({ navigation, route }) {
    const routeNum = (route.params ?? {})['routeNum'];
    const destination = (route.params ?? {})['destination'];
    const latitude = (route.params ?? {})['latitude'];
    const longitude = (route.params ?? {})['longitude'];
    const whichStop = (route.params ?? {})['whichStop'];
    const stopName = (route.params ?? {})['stopName'];

    const [showMap, setShowMap] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (!showMap) {
            setTimeout(() => setShowMap(true), 1000);
        }
        navigation.setOptions({ title: `${routeNum} ${i18n.t("busTo")} ${destination}` });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading && (
                    <View style={styles.loadingContainer}>
                        <Loading />
                    </View>
                )
            }

            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={{ height: 300 }}>
                    {
                        showMap && (
                            <Map latitude={latitude} longitude={longitude} />
                        )
                    }
                </View>

                <View style={styles.stopNameContainer}>
                    <Text style={styles.stopNameText}>
                        {stopName}
                    </Text>
                </View>

                <View style={styles.itemContainer}>
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
    itemContainer: {
        minHeight: 480,
    }
})