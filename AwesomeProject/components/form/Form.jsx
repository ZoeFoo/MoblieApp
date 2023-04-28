import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from 'react-native';
import { FormControl, WarningOutlineIcon } from "native-base";
import { useForm, Controller } from "react-hook-form";

import SelectInput from "./SelectInput";

const Form = ({ navigation }) => {
    const [selectValue, setSelectValue] = useState('');

    const { control, handleSubmit } = useForm({
        defaultValues: {
            busStop: '',
        }
    });
    const onSubmit = () => {
        navigation.navigate('BusStop', { selectData: selectValue });
    };

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text }>巴士站</Text>
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
    container: {
        flex: 0.5,
    },
    text: {
        margin: '2%'
    }
})

export default Form;