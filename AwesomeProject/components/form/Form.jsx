import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from 'react-native';
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
            busStop: selectValue
        });
    };

    return (
        <View>
            <View style={styles.container}>
                <Text>Bus Stop</Text>
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
                            <Button
                                title={"TSUEN KING CIRCUIT FLYOVER"}
                                onPress={() => { setSelectValue("BFA3460955AC820C") }}
                            />

                            <Button
                                title={"CHAI WAN KOK STREET TSUEN WAN"}
                                onPress={() => { setSelectValue("5FB1FCAF80F3D97D") }}
                            />
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
    container: {
        flex: 0.5,
    },
    text: {
        margin: '2%'
    }
})

export default Form;