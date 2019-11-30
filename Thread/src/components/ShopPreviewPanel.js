import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View } from 'react-native';

function ShopPreviewPanel(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.shopName}>{props.shop.name}</Text> 
        <Text style={styles.distance}>{Number((props.shop.distAway).toFixed(1)) + " miles away"}</Text> 
        <Text style={styles.numSpots}>{props.shop.possibleSpots + " possible spots"}</Text> 
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 200,
    marginBottom: 12,
    padding: 16,
  },
  header: {
  },
  shopName: {
    fontSize: 20, 
  },
  distance: {
    fontSize: 16, 
  }
});

export default ShopPreviewPanel;