import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Dimensions, Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function SpotMap(props) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: props.initLocation.lat,
        longitude: props.initLocation.lng,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      }}
    >
      {/* Mark current location TODO: Make this blue marker */}
      {markers([{
        lat: props.initLocation.lat,
        lng: props.initLocation.lng,
        id: '-1',
        name: 'Current Location'
       }])}
      {/* Mark thrift shops */}
      {markers(props.shops)}
    </MapView>
  );

  function markers(locations) {
    return locations.map( (loc) => {
      return (
        <Marker
          key={loc.id}
          coordinate={{latitude:loc.lat, longitude:loc.lng}}
          title={loc.name}
        />
      )
    })
  }

}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default SpotMap;
