import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Loading from "../components/Loading";

import api from '../services';

export default function BusStopScreen({ navigation }) {
    //const selectData = (route.params ?? {})['selectData'];
    const selectData = 'BFA3460955AC820C';

    useEffect(() => {
        (async () => {
            const busDetail = await api.getBusStopDetail(selectData);
            await setStopDetail(busDetail)
            //console.log({ busDetail })

            const data = await api.getBusStopETA(selectData);
            const etaData = data.data;
            const todayETAData = await etaData.filter(({ eta }) => eta !== null);
            await setStopETAData(todayETAData);
            //console.log({ todayETAData })
            setIsLoading(false);
        })()
    }, []);

    const [stopDetail, setStopDetail] = useState('');
    const [stopETAData, setStopETAData] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    console.log(stopDetail.data.name_tc )

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'blue',
    }
});