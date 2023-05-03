import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'
import moment from 'moment';

import Loading from "../Loading";

import api from '../../services';

const BusRoutesETAItem = ({ routeNum, whichStop }) => {
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
        })()
    }, []);

    return (
        <View>
            {routesETAData ?
                Object.keys(routesETAData).map(({ }, i) => {
                    const route = routesETAData[i];
                    /*console.log(route)*/
                    return (
                        <Item key={i}
                            routeNum={routeNum}
                            dest={route.dest_tc}
                            eta={route.eta}
                            rmk={route.rmk_tc}
                        />
                    )
                }) : (
                    <View>
                        <Loading />
                    </View>
                )}
        </View>
    )
};

const Item = ({ routeNum, dest, eta, rmk }) => {
    /*console.log({ routeNum, dest, eta, rmk })*/
    const now = moment(new Date());
    if (!dest) return null;

    const etaMinutes = (eta) => {
        const min = moment.duration(now.diff(moment(eta))).asMinutes();
        return Math.ceil(Math.abs(min))
    }

    const isETA = () => {
        switch (true) {
            case (rmk == '服務只限於星期日及公眾假期' && eta == null):
                return (
                    <View style={{ paddingTop: '3%' }}>
                        <Text style={styles.etaText}>
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                color={'#005eb2'}
                                size={32} />
                        </Text>
                    </View>
                )
                break;
            case (eta !== null):
                return (
                    <View>
                        <Text style={styles.etaText}>
                            {etaMinutes(eta)}
                        </Text>
                        <Text style={styles.minText}>分鐘</Text>
                    </View>
                )
                break;
            default:
                return (
                    <View>
                        <Text style={styles.etaText}> - </Text>
                        <Text style={styles.minText}>分鐘</Text>
                    </View>
                )
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.etaContainer}>
                {isETA()}
            </View>

            <View style={styles.routeDetailContainer}>
                <View style={styles.origContainer}>
                    <Text style={{ textAlignVertical: 'bottom' }}>往</Text>
                    <Text style={styles.origText}>
                        {dest}
                    </Text>
                </View>

                <View style={styles.stopContainer}>
                    <Text style={styles.stopText}>
                        
                    </Text>
                </View>
            </View>
        </View>
    )
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
    },
    origText: {
        fontSize: 25,
        fontWeight: 'bold'
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
})

export default BusRoutesETAItem;