import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, Dimensions, Image, Text, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

function SpotMap(props) {
  return (
    <MapView
      style={styles.map}
      showsUserLocation={true}
      initialRegion={{
        latitude: props.initLocation.lat,
        longitude: props.initLocation.lng,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04
      }}
    >
      {/* Mark thrift shops */}
      {shopMarkers(props.shops, props.navigation)}
    </MapView>
  );

  function shopMarkers(shops, navigation, color='red') {
    return shops.map( (shop) => {
      const {navigate} = navigation;
      return (
        <Marker
          key={shop.id}
          coordinate={{latitude:shop.lat, longitude:shop.lng}}
          title={shop.name}
          description={shop.possibleSpots + " possible spots"}
          pinColor={color}
          onCalloutPress={() => navigate("StoreView")}
        >
          <Callout>
              <TouchableOpacity
                  style={styles.callout}>
                  <Text>{shop.name}</Text>
                  <Text>{shop.possibleSpots + " possible spots"}</Text>
              </TouchableOpacity>
          </Callout>
        </Marker>
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
  callout: {
    backgroundColor: 'white',
    padding: 12,
  },
});

export default SpotMap;
