import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'
import moment from 'moment';

import api from '../../services';
import i18n from '../../locales';

import Loading from "../Loading";

const BusToStopETAItem = ({ navigation, stopName, whichStop, latitude, longitude }) => {
    const [stopETAData, setStopETAData] = useState(null);

    useEffect(() => {
        if (stopName) {
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
            })();
        }
    }, [stopName]);

    return (
        <View>
            {
                stopETAData ?
                    Object.keys(stopETAData).map((key, i) => {
                        const routes = stopETAData[key];
                        return (
                            <Item key={i}
                                navigation={navigation}
                                stopName={stopName}
                                routeNum={key}
                                routes={routes}
                                latitude={latitude}
                                longitude={longitude}
                                whichStop={whichStop}
                            />
                        )
                    }) : (
                        <View>
                            <Loading />
                        </View>
                    )
            }
        </View>
    )
};

const Item = ({ navigation, stopName, routeNum, routes, whichStop, latitude, longitude }) => {
    const route = routes[0];
    if (!route) return null;

    const getDestName = () => {
        switch (i18n.locale) {
            case "en": return route.dest_en;
            case "zh-CN": return route.dest_sc;
        }

        return route.dest_tc;
    };
    const shortDestName = (() => {
        const name = getDestName();

        switch (i18n.locale) {
            case "zh-TW":
            case "zh-CN":
                return name;
        }

        return route.dest_tc.includes('循環線)') ?
            name :
            ((name.match(/\(([^)]+)\)/) ?? [])[1] ?? name);
    })();
    const destResult = getDestName().split("(");
    const destination = (() => {
        if (destResult.length == 1) {
            return destResult[0];
        } else if (route.dest_tc.includes('循環線)')) {
            return getDestName();
        }

        const result = destResult[1].substring(0, destResult[1].length - 1);
        return `${result}${i18n.t("terminus")}`;
    })();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('RouteDetail', {
                    routeNum: routeNum,
                    destination: destination,
                    latitude: latitude,
                    longitude: longitude,
                    destination: destination,
                    whichStop: whichStop,
                    stopName: stopName
                })
            }}
            style={styles.container}>
            <View style={styles.routeNumContainer}>
                <Text style={styles.routeNumText}>
                    {routeNum}
                </Text>
            </View>

            <View style={styles.routeDetailContainer}>
                <View style={styles.origContainer}>
                    <Text style={{ textAlignVertical: 'bottom' }}>
                        {i18n.t("busTo")}
                    </Text>

                    <Text style={styles.origText}>
                        {shortDestName}
                    </Text>
                </View>

                <View style={styles.stopContainer}>
                    <Text style={styles.stopText}>
                        {stopName}
                    </Text>
                </View>
            </View>

            <View style={styles.etaContainer}>
                <ETA route={route} />
            </View>
        </TouchableOpacity>

    )
};

const ETA = ({ route }) => {
    const now = moment(new Date());
    const etaMinutes = (eta) => {
        const min = moment.duration(now.diff(moment(eta))).asMinutes();
        return Math.ceil(Math.abs(min))
    }

    switch (true) {
        case (route.rmk_tc == '服務只限於星期日及公眾假期' && route.eta == null):
            return (
                <View style={{ paddingTop: '3%' }}>
                    <Text style={styles.etaText}>
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            color={'#005eb2'}
                            size={32} />
                    </Text>
                </View>
            );
        case (route.eta !== null):
            return (
                <View>
                    <Text style={styles.etaText}>
                        {etaMinutes(route.eta)}
                    </Text>
                    <Text style={styles.minText}>
                        {i18n.t("minutes")}
                    </Text>
                </View>
            );
    }

    return (
        <View>
            <Text style={styles.etaText}> - </Text>
            <Text style={styles.minText}>
                {i18n.t("minutes")}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#e2e2e2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
    },
    routeNumContainer: {
        width: '20%',
        justifyContent: 'center',
    },
    routeNumText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    routeDetailContainer: {
        width: '60%',
        justifyContent: 'center',
        paddingLeft: '3%'
    },
    origContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    origText: {
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    stopContainer: {
        paddingTop: '2%'
    },
    stopText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    etaContainer: {
        width: '20%',
        justifyContent: 'center',
    },
    etaText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#005eb2',
        textAlign: 'right',
        paddingRight: '10%',
    },
    minText: {
        textAlign: 'right',
        paddingRight: '10%',
    }
});

export default BusToStopETAItem;