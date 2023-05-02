import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import loadingImg from '../public/loading.gif';

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
    },
    imageStyle: {
        width: 450,
        height: 450,
        marginTop: "50%",
        alignSelf: 'center',
    }
})

export default Loading;