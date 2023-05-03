import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import api from '../services';

import BusToStopETAItem from '../components/bus/BusToStopETAItem';

export default function BusStopScreen({ navigation, route }) {
    const [data, setData] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    const busStop = (route.params ?? {})['busStop'];
    const { stopName, latitude, longitude } = data;

    navigation.setOptions({ title: '' });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useEffect(() => {
        (async () => {
            const { data } = await api.getBusStopDetail(`${busStop}`);
            const stopName = data.name_tc;

            setData({
                stopName,
                latitude: data.lat,
                longitude: data.long,
            });
            navigation.setOptions({ title: `${stopName}` });
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={
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
    itemContainer: {
        backgroundColor: 'white',
    }
});