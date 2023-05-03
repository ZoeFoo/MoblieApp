import React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import BusToStopETAItem from '../components/bus/BusToStopETAItem';

export default function BusStopScreen({ navigation, route }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const stopName = (route.params ?? {})['stopName'];
    const busStop = (route.params ?? {})['busStop'];
    const latitude = (route.params ?? {})['latitude'];
    const longitude = (route.params ?? {})['longitude'];
    navigation.setOptions({ title: `${stopName}` });

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

    //return isLoading ?
    // (<View>...</View>) :
    // (<View>...</View>);
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