import React from "react";
import i18n from "../locales";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const BusStopButton = ({ navigation }) => {
    return (
        <View>
            <View>
                <View style={styles.buttonContainer}>
                    <Button id="BFA3460955AC820C" navigation={navigation} />
                </View>

                <View style={styles.buttonContainer}>
                    <Button id="5FB1FCAF80F3D97D" navigation={navigation} />
                </View>
            </View>
        </View >
    )
};

const Button = ({ id, navigation }) => {
    const navigate = async (value) => {
        navigation.navigate('BusStop', { busStop: value });
    };

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigate(id)}>
            <Text style={styles.text}>
                {i18n.t(`stopName.${id}`)}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 15,
    },
    button: {
        borderRadius: 5,
        backgroundColor: 'rgba(0, 93, 178, .8)',
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