import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Loading from "../Loading";

import api from '../../services';

const BusToStopETAItem = ({ stopName, whichStop }) => {
    const now = moment(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [stopETAData, setStopETAData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await api.getBusStopETA(`${whichStop}`);
            console.log(data)
            const etaData = await data.data;

            setStopETAData(etaData);
            setIsLoading(false);
        })()
    }, []);

    return (
        <View>
            {
                stopETAData ?
                    stopETAData.map(({ route, dest_tc, rmk_tc, eta }, i) => {
                        const etaMinutes = eta == null ?
                            null :
                            moment.duration(now.diff(moment(eta))).asMinutes();

                        return (
                            <Item key={i}
                                stopName={stopName}
                                routeNum={route}
                                destName={dest_tc}
                                rmk={rmk_tc}
                                eta={Math.ceil(Math.abs(etaMinutes))}
                            />
                        );
                    }) :
                    (
                        <View style={styles.loadingContainer}>
                            <Loading />
                        </View>
                    )
            }
        </View>
    )
};

const Item = ({ stopName, routeNum, destName, rmk, eta }) => {
    return (
        <View style={styles.container}>
            <View style={styles.routeNumContainer}>
                <Text style={styles.routeNumText}>
                    {routeNum}
                </Text>
            </View>

            <View style={styles.routeDetailContainer}>
                <View style={styles.origContainer}>
                    <Text>往</Text>
                    <Text style={styles.origText}>
                        {destName}
                    </Text>
                </View>

                <View style={styles.stopContainer}>
                    <Text style={styles.stopText}>
                        {stopName}
                    </Text>
                </View>

                <Text>{rmk}</Text>
            </View>

            <View style={styles.etaContainer}>
                {
                    eta && (
                        <View>
                            <Text style={styles.etaText}>
                                {eta}
                            </Text>
                            <Text>分鐘</Text>
                        </View>
                    ) || (
                        <Text>--</Text>
                    )
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        //flex: 0.5,
        borderWidth: 1,
        borderColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
    },
    loadingContainer: {
    },
    routeNumContainer: {
        borderWidth: 1,
        borderColor: 'green',
        width: '20%',
    },
    routeNumText: {},
    routeDetailContainer: {
        borderWidth: 1,
        borderColor: 'green',
        width: '60%',
    },
    origContainer: {},
    origText: {},
    stopContainer: {},
    stopText: {},
    etaContainer: {
        borderWidth: 1,
        borderColor: 'green',
        width: '20%',
    },
    etaText: {},
});

export default BusToStopETAItem;