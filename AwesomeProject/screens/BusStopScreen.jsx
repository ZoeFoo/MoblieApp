import React from "react";
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import BusToStopETAItem from '../components/bus/BusToStopETAItem';

export default function BusStopScreen({ navigation, route }) {
    //console.log({ route })
    const stopName = (route.params ?? {})['stopName'];
    const busStop = (route.params ?? {})['busStop'];
    navigation.setOptions({ title: `${stopName}` });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.itemContainer}>
                <BusToStopETAItem
                    navigation={navigation}
                    stopName={stopName}
                    whichStop={busStop}
                />
            </View>
        </ScrollView>
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