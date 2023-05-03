import React from "react";
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import i18n from '../locales';
import BusStopButton from '../components/BusStopButton';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.image}
                blurRadius={5}
                source={require('../public/backgroundImage.jpeg')} />

            <View style={styles.groupContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        {i18n.t("appTitle")}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <BusStopButton navigation={navigation} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        position: 'relative',
        backgroundColor: 'white'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    groupContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        backgroundColor: 'rgba(255, 255, 255, .3)'
    },
    titleContainer: {
        width: '70%',
        marginTop: '50%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        letterSpacing: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    formContainer: {
        alignSelf: 'center',
        width: '70%',
        marginTop: '20%'
    }
})