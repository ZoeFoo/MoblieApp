import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const BusStopButton = ({ navigation }) => {
    const navigate = async (value) => {
        navigation.navigate('BusStop', { busStop: value });
    };

    return (
        <View>
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigate("BFA3460955AC820C")}>
                        <Text style={styles.text}>荃景圍天橋</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigate("5FB1FCAF80F3D97D")}>
                        <Text style={styles.text}>荃灣柴灣角街</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
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