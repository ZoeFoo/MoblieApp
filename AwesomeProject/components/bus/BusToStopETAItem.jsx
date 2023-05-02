import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Loading from "../Loading";

import api from '../../services';

const BusToStopETAItem = ({ stopName, whichStop }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [stopETAData, setStopETAData] = useState({});

    useEffect(() => {
        (async () => {
            const data = await api.getBusStopETA(`${whichStop}`);
            const etaData = await data.data;

            const groupByRoute = await etaData.reduce((group, routes) => {
                const { route } = routes;
                group[route] = group[route] ?? [];
                group[route].push(routes);
                return group;
            }, {});

            setStopETAData(groupByRoute);
            setIsLoading(false);
        })()
    }, []);

    return (
        <View>
            {stopETAData ?
                Object.keys(stopETAData).map((key, i) => {
                    const routes = stopETAData[key];

                    return (
                        <Item key={i}
                            stopName={stopName}
                            routeNum={key}
                            routes={routes}
                        />
                    )
                }) : (<View style={styles.loadingContainer}>
                    <Loading />
                </View>)
            }
        </View>
    )
};

const Item = ({ stopName, routeNum, routes }) => {
    const route = routes[0];
    if (!route) return null;

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
                        {route.dest_tc}
                    </Text>
                </View>

                <View style={styles.stopContainer}>
                    <Text style={styles.stopText}>
                        {stopName}
                    </Text>
                </View>

                <Text>{route.rmk_tc}</Text>
            </View>

            <View style={styles.etaContainer}>
                <Text style={styles.etaText}>
                    {route.eta}
                </Text>
                <Text>分鐘</Text>
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