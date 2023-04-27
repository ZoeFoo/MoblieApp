import React, { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import { ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import App from '../navigators/AppNavigator';
import Form from '../components/form/Form';

import api from '../services';

export default function HomeScreen({ navigation }) {
    //console.log({ navigation })

    return (
        //<SafeAreaView style={{ flex: 1, position: 'relative' }}>
        //    <ScrollView style={{ flex: 1 }}>
        //    </ScrollView>
        //</SafeAreaView>
        <SafeAreaView style={styles.container}>
            <View style={styles.formContainer}>
                <Form />
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
        //flex: 0.5,
        alignSelf: 'center',
    }
})