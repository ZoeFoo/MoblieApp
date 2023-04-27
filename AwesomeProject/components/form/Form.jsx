import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from 'react-native';
import { FormControl, WarningOutlineIcon } from "native-base";
import { useForm, Controller } from "react-hook-form";

import SelectInput from "./SelectInput";
import { base } from '../../assets/styles/main';

import api from '../../services';

const Form = () => {
    const [selectValue, setSelectValue] = useState('');
    const [nullValue, setNullValue] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            busStop: '',
        }
    });
    const onSubmit = data => {
        if (selectValue == '') {
            setNullValue(!nullValue)
        }

        data.busStop = selectValue;
        console.log(data.busStop)
    };

    return (
        <View>
            <View style={styles.container}>
                <Text>Bus Stop</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <SelectInput
                            selectValue={selectValue}
                            setSelectValue={setSelectValue}
                            setNullValue={setNullValue}
                        />
                    )}
                    name="busStop"
                />
                {nullValue &&
                    <Text style={styles.warn}>Please make a selection!</Text>
                }
            </View>

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        //borderWidth: 1,
        //borderColor: 'green'
    },
    warn: {
        //borderWidth: 1,
        //borderColor: 'red',
        color: `${base.danger}`,
    }
})

export default Form;