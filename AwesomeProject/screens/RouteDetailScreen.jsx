import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function RouteDetailScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>RouteDetailScreen</Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
})