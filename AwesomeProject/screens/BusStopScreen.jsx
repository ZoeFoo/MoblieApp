import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import api from '../services';
import i18n from '../locales';

import BusToStopETAItem from '../components/bus/BusToStopETAItem';

export default function BusStopScreen({ navigation, route }) {
    const [routes, setRoutes] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    const busStop = (route.params ?? {})['busStop'];
    const { stopName, latitude, longitude } = routes;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        (async () => {
            const { data } = await api.getBusStopDetail(`${busStop}`);
            const stopName = (() => {
                switch (i18n?.locale) {
                    case "en": return data.name_en;
                    case "zh-CN": return data.name_sc;
                    default: return data.name_tc;
                }
            })();

            setRoutes({
                stopName,
                latitude: data.lat,
                longitude: data.long,
            });

            navigation.setOptions({ title: `${stopName}` });
        })();
    }, []);

    navigation.setOptions({ title: '' });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={styles.itemContainer}>
                    <BusToStopETAItem
                        navigation={navigation}
                        stopName={stopName}
                        whichStop={busStop}
                        latitude={latitude}
                        longitude={longitude}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
    }
});