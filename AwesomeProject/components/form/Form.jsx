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
            <View style={styles.selectInput }>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <SelectInput
                            selectValue={selectValue}
                            setSelectValue={setSelectValue}
                        />
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
    selectInput: {
        marginVertical: '10%',
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