import React from "react";
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "../components/Map";

export default function RouteDetailScreen({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

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
                <View style={{ height: 300 }}>
                    <Map />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
})