import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View } from 'react-native';

{/* Each search result is an Item component;
    below is the "HTML" of an Item */}
function Item(props) {
    {/* TODO: Fix isSelected transfer, not working */}
    return (
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={{uri: props.info.refImages[0].path}}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default Item;
