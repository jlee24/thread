import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View } from 'react-native';

import ShopPreviewPanel from "./ShopPreviewPanel";

function ShopsPreview(props) {
  return (
    <View style={styles.container}>
      {panels(props.shops)}
    </View>
  );

  function panels(shops) {
    return shops.map( (shop) => {
      return (
        <ShopPreviewPanel shop={shop} key={shop.id}/>
      )
    })
  } 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: '100%',
  },
});

export default ShopsPreview;
