import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container }>
            <Image
                source={require('../public/loading.gif')}
                style={styles.imageStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 450,
        height: 450,
    }
})

export default Loading;