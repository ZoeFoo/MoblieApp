import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FormControl, WarningOutlineIcon } from "native-base";
import { useForm, Controller } from "react-hook-form";

import SelectInput from "./SelectInput";

import api from '../../services';

const Form = ({ navigation }) => {
    const [selectValue, setSelectValue] = useState('');

    const { control, handleSubmit } = useForm({
        defaultValues: {
            busStop: '',
        }
    });
    const onSubmit = async () => {
        const stopName = await api.getBusStopDetail(`${selectValue}`);
        navigation.navigate('BusStop', {
            stopName: stopName.data.name_tc,
            busStop: selectValue,
            latitude: stopName.data.lat,
            longitude: stopName.data.long,
        });
    };

    return (
        <View>
            <View>
                {/*<Controller*/}
                {/*    control={control}*/}
                {/*    render={({ field: { onChange, onBlur, value } }) => (*/}
                {/*        <SelectInput*/}
                {/*            selectValue={selectValue}*/}
                {/*            setSelectValue={setSelectValue}*/}
                {/*            setNullValue={setNullValue}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*    name="busStop"*/}
                {/*/>*/}
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => { setSelectValue("BFA3460955AC820C") }}>
                                    <Text style={styles.text}>荃景圍天橋</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => { setSelectValue("5FB1FCAF80F3D97D") }}>
                                    <Text style={styles.text}>荃灣柴灣角街</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    name="busStop"
                />
            </View>

            <Button title="Submit"
                disabled={!selectValue}
                onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: '10%',
    },
    button: {
        backgroundColor: '#005db2',
        borderRadius: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: '5%',
        letterSpacing: 5,
        textAlign: 'center',
        
    }
})

export default Form;