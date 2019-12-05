import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';

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
        <TouchableOpacity 
          style={styles.directionsButton}
          onPress={() => alert('Opening Google Maps...')}
        >
          <Image
            source={require('../../assets/images/directions-button.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.spotButton}
          onPress={() => props.navigation.navigate('StoreView', {'shop': props.shop.name})}
        >
          <Image
            source={require('../../assets/images/spot-button.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 180,
    paddingTop: 28,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  toolbar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  shopName: {
    fontSize: 20, 
    marginBottom: 8,
  },
  distance: {
    fontSize: 16, 
    marginBottom: 8,
  },
  hours: {
    fontSize: 16, 
    color: 'grey',
    marginBottom: 12,
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
