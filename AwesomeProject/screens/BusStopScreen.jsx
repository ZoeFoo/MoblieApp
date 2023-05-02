import React from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import BusToStopETAItem from '../components/bus/BusToStopETAItem';

export default function BusStopScreen({ navigation, route }) {
    //console.log({ route })
    const [refreshing, setRefreshing] = React.useState(false);
    const stopName = (route.params ?? {})['stopName'];
    const busStop = (route.params ?? {})['busStop'];
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