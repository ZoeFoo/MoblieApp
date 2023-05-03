import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'
import moment from 'moment';

import api from '../../services';
import i18n from '../../locales';

const BusRoutesETAItem = ({ routeNum, whichStop, setIsLoading }) => {
    const [routesETAData, setRoutesETAData] = useState(null);

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
            setRoutesETAData(groupByRoute[routeNum]);
            setIsLoading(false);
        })()
    }, []);

    return (
        <View>
            {routesETAData ?
                Object.keys(routesETAData).map(({ }, i) => {
                    const route = routesETAData[i];
                    console.log(route)
                    return (
                        <Item key={i}
                            dest={route.dest_tc}
                            eta={route.eta}
                            rmk={route.rmk_tc}
                        />
                    )
                }) : (
                    null
                )}
        </View>
    )
};

const Item = ({ dest, eta, rmk }) => {
    if (!dest) return null;

    return (
        <View>
            <ETA rmk={rmk} eta={eta} />
        </View>
    )
};

const ETA = ({ rmk, eta }) => {
    const now = moment(new Date());
    const etaMinutes = (eta) => {
        const min = moment.duration(now.diff(moment(eta))).asMinutes();
        return Math.ceil(Math.abs(min))
    };

    switch (true) {
        case (rmk == '服務只限於星期日及公眾假期' && eta == null):
            return (
                <View style={styles.container}>
                    <View style={styles.etaContainer}>
                        <Text style={[styles.etaText, { marginRight: '30%' }]}>
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                color={'#005eb2'}
                                size={32} />
                        </Text>
                    </View>

                    <View style={styles.routeDetailContainer}>
                        <Text style={styles.infoText}>
                            {i18n.t("weekendOnlyService")}
                        </Text>
                    </View>
                </View>
            );
        case (eta !== null):
            return (
                <View style={styles.container}>
                    <View style={styles.etaContainer}>
                        <Text style={styles.etaText}>
                            {etaMinutes(eta)}
                        </Text>
                        <Text style={styles.minText}>
                            {i18n.t("minutes")}
                        </Text>
                    </View>

                    <View style={styles.routeDetailContainer}>
                        <Text style={styles.infoText}>
                            {i18n.t("scheduled")}
                        </Text>
                    </View>
                </View>
            );
    }

    return (
        <View style={styles.container}>
            <View style={styles.etaContainer}>
                <Text style={styles.etaText}> - </Text>
                <Text style={styles.minText}>
                    {i18n.t("minutes")}
                </Text>
            </View>

            <View style={styles.routeDetailContainer}>
                <Text style={styles.infoText}>
                    {i18n.t("noInformation")}
                </Text>
            </View>
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
    routeDetailContainer: {
        width: '70%',
        justifyContent: 'center',
        paddingLeft: '3%'
    },
    infoText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    etaContainer: {
        width: '30%',
        paddingLeft: '8%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    etaText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#005eb2',
        alignSelf: 'center'
    },
    minText: {
        textAlign: 'right',
        paddingLeft: '5%',
        alignSelf: 'center',
        height: '35%',
        textAlignVertical: 'bottom'
    }
})

export default BusRoutesETAItem;