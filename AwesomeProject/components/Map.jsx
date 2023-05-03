import React from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ latitude, longitude }) => {
    const latitudeNum = Number(latitude);
    const longitudeNum = Number(longitude);

    return (
        <MapView
            style={{ flex: 1 }}
            showsUserLocation
            initialCamera={{
                center: {
                    latitude: latitudeNum,
                    longitude: longitudeNum,
                },
                pitch: 2,
                heading: 20,
                altitude: 20,
                zoom: 17,
            }}>
            <Marker coordinate={{
                latitude: latitudeNum,
                longitude: longitudeNum,
            }} />
        </MapView>
    );
};

const styles = StyleSheet.create({
});

export default Map;