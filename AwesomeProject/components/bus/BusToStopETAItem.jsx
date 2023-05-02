import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation'

import Loading from "../Loading";

import api from '../../services';

const BusToStopETAItem = ({ stopName, whichStop }) => {
    const now = moment(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [stopETAData, setStopETAData] = useState(null);

    useEffect(() => {
        (async () => {
            const data = await api.getBusStopETA(`${whichStop}`);
            const etaData = await data.data;
            //console.log(etaData)

            setStopETAData(etaData);
            setIsLoading(false);
        })()
    }, []);

    return (
        <View>
            {
                stopETAData ?
                    stopETAData.map(({ route, dest_tc, rmk_tc, eta }, i) => {
                        //console.log({ route});
                        

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
    const isETA = () => {
        switch (true) {
            case (rmk == '服務只限於星期日及公眾假期' && eta == 0):
                return (<View>
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <Text>服務只限於星期日及公眾假期</Text>
                </View>
                )
                break;
            case (eta > 0):
                return (
                    <View>
                        <Text style={styles.etaText}>
                            {eta}
                        </Text>
                        <Text>分鐘</Text>
                    </View>
                )
                break;
            default:
                return (
                    <View>
                        <Text>--</Text>
                        <Text>分鐘</Text>
                    </View>
                )
                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.routeNumContainer}>
                <Text style={styles.routeNumText}>
                    {routeNum}
                </Text>
            </View>

            <View style={styles.routeDetailContainer}>
                <View style={styles.origContainer}>
                    <Text style={{ textAlignVertical: 'bottom' }}>往</Text>
                    <Text style={styles.origText}>
                        {destName}
                    </Text>
                </View>

                <View style={styles.stopContainer}>
                    <Text style={styles.stopText}>
                        {stopName}
                    </Text>
                </View>
            </View>

            <View style={styles.etaContainer}>
                {isETA()}
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
        justifyContent: 'center',

    },
    routeNumText: {
        height: '30%',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    routeDetailContainer: {
        borderWidth: 1,
        borderColor: 'green',
        width: '60%',
        justifyContent: 'center',
    },
    origContainer: {
        borderWidth: 1,
        borderColor: 'blue',
        flexDirection: 'row',
    },
    origText: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    stopContainer: {},
    stopText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    etaContainer: {
        borderWidth: 1,
        borderColor: 'green',
        width: '20%',
    },
    etaText: {},
});

export default BusToStopETAItem;