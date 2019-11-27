import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View } from 'react-native';

import ShopPreviewPanel from "./ShopPreviewPanel";

function ShopsPreview(props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.scrollIndicator}
        source={{uri: "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/scrollIndicator.png" }}
      />
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
    borderRadius: 12,
    backgroundColor: 'yellow',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    height: '100%',
  },
  scrollIndicator: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 6,
    width: 60,
    height: 12,
  }
});

export default ShopsPreview;
