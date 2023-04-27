import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from 'react-native';
import { Select, VStack, CheckIcon, FormControl, NativeBaseProvider, WarningOutlineIcon } from "native-base";
import { NavigationContainer } from '@react-navigation/native';

import api from '../../services';

const SelectInput = ({ selectValue, setSelectValue, setNullValue }) => {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <VStack >
                    <Select
                        selectedValue={selectValue}
                        minWidth="200"
                        placeholder="Please Choose Bus Stop"
                        _selectedItem={{
                            endIcon: <CheckIcon size="5" />
                        }}
                        onValueChange={itemValue => {
                            setSelectValue(itemValue)
                            setNullValue(false)
                        }}>
                        <Select.Item label="TSUEN KING CIRCUIT FLYOVER" value="BFA3460955AC820C" />
                        <Select.Item label="CHAI WAN KOK STREET TSUEN WAN" value="5FB1FCAF80F3D97D" />
                    </Select>
                </VStack>
            </NavigationContainer>
        </NativeBaseProvider >
    )
};

export default SelectInput;