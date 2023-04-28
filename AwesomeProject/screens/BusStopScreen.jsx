import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Loading from "../components/Loading";
import Map from "../components/Map";

import api from '../services';

export default function BusStopScreen({ navigation, route }) {
    console.log({ route });
    const selectData = (route.params ?? {})['selectData'];

    useEffect(() => {
        (async () => {
            const busDetail = await api.getBusStopDetail(`${selectData}`);
            await setStopDetail(busDetail)
            //console.log({ busDetail })

            const data = await api.getBusStopETA(selectData);
            const etaData = await data.data;
            const todayETAData = await etaData.filter(({ eta }) => eta !== null);
            await setStopETAData(todayETAData);
            //console.log({ todayETAData })
            setIsLoading(false);
        })()
    }, []);

    const [stopDetail, setStopDetail] = useState('');
    const [stopETAData, setStopETAData] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Loading />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {stopDetail.data.name_tc}
            </Text>

            {/*<Map/>*/}
        </View>
    );

    //return isLoading ?
    // (<View>...</View>) :
    // (<View>...</View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
    }
});