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
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
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
    position: 'absolute',
    top: 0,
    // TODO: Fix this shift hack, has to do with drawer lib
    left: -(Dimensions.get('window').width - 360)/2,
    zIndex: -1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default SpotMap;
