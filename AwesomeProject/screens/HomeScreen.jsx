import React from "react";
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Form from '../components/form/Form';
import BusStopButton from '../components/BusStopButton';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                {/*<Form navigation={navigation} />*/}
                <BusStopButton navigation={navigation} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    formContainer: {
        alignSelf: 'center',
        height: '50%',
        width: '70%',
    }
})