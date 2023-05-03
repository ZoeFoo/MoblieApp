import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import api from '../services';

const BusStopButton = ({ navigation }) => {
    const getValue = async (value) => {
        const stopDetail = await api.getBusStopDetail(`${value}`);
        const stopName = stopDetail.data.name_tc;
        const busStop = value;
        const latitude = stopDetail.data.lat;
        const longitude = stopDetail.data.long;
        clicked({ stopName, busStop, latitude, longitude });
    }

    const clicked = ({ stopName, busStop, latitude, longitude }) => {
        navigation.navigate('BusStop', {
            stopName: stopName,
            busStop: busStop,
            latitude: latitude,
            longitude: longitude,
        });
    }

    return (
        <View>
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => getValue("BFA3460955AC820C")}>
                        <Text style={styles.text}>荃景圍天橋</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => getValue("5FB1FCAF80F3D97D")}>
                        <Text style={styles.text}>荃灣柴灣角街</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: '10%',
    },
    button: {
        backgroundColor: '#005db2',
        borderRadius: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: '5%',
        letterSpacing: 5,
        textAlign: 'center',

    }
})

export default BusStopButton;