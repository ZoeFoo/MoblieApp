import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
    return (
        <MapView
            style={{ flex: 1 }}
            showsUserLocation
            initialCamera={{
                center: {
                    latitude: 22.375396,
                    longitude: 114.108571,
                },
                pitch: 2,
                heading: 20,
                altitude: 20,
                zoom: 17,
            }}>
            <Marker coordinate={{
                latitude: 22.375396,
                longitude: 114.108571,
            }} />
        </MapView>
    );
};

const styles = StyleSheet.create({
});

export default Map;