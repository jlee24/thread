import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Dimensions, Image, Text, View } from 'react-native';
import MapView from 'react-native-maps';

function SpotMap() {
    return (
        <MapView 
            style={styles.map}
            initialRegion={{
                latitude: 37.426431,
                longitude: -122.171881,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03
            }}
        >
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default SpotMap;
