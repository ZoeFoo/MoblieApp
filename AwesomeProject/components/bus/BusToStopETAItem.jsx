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
                        <View>
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
                return (
                    <View style={{ paddingTop: '3%' }}>
                        <Text style={styles.etaText}>
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                color={'#005eb2'}
                                size={32}/>
                        </Text>
                    </View>
                )
                break;
            case (eta > 0):
                return (
                    <View>
                        <Text style={styles.etaText}>
                            {eta}
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
    stopContainer: {},
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