import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import IconButton from "../components/IconButton";
import openMap from 'react-native-open-maps';
import { Linking } from 'expo';

function ShopPreviewPanel(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.shopName}>{props.shop.name}</Text> 
          <Text style={styles.numSpots}>{props.shop.possibleSpots + " possible spots"}</Text> 
        </View>
        <View style={styles.details}>
          <Text style={styles.distance}>{Number((props.shop.distAway).toFixed(1)) + " miles away"}</Text> 
          <Text style={styles.hours}>{"Hours: 9am - 9pm"}</Text> 
        </View>
      </View>
      <View style={styles.toolbar}>
          <IconButton
            caption = "Directions"
            source={require('../../assets/images/directions-white.png')}
            onPress={() => openMap({latitude: props.shop.lat, longitude: props.shop.lng})} />

        <IconButton
            caption="Spot here"
            source={require('../../assets/images/location-white.png')}
            onPress={() => props.navigation.navigate('StoreView', {'shop': props.shop.name})}
          />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 160,
    paddingTop: 22,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  toolbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  shopName: {
    fontSize: 20, 
    fontWeight: '400',
    marginBottom: 8,
  },
  distance: {
    fontSize: 16, 
    marginTop: 4,
    marginBottom: 8,
  },
  hours: {
    fontSize: 16, 
    color: 'grey',
    marginBottom: 8,
  },
  numSpots: {
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#50CDB6'
  },
  imageWrapper:{
     width:78,
     height:78,
  },
  buttonOverlay: {
    marginRight: 32,
  },
  title: {
    marginRight: 'auto',
  },
  details: {
    marginLeft: 'auto',
  },
  directionsButton: {
    marginRight: 'auto',
  },
  spotButton: {
    marginLeft: 'auto',
  }
});

export default ShopPreviewPanel;
