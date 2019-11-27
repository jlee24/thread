import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View } from 'react-native';

function ShopPreviewPanel(props) {
  return (
    <View style={styles.container}>
      <Text>{props.shop.name}</Text> 
      <Text>{Number((props.shop.distAway).toFixed(1)) + " miles"}</Text> 
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '100%',
    height: 200,
    marginBottom: 12,
  },
});

export default ShopPreviewPanel;
