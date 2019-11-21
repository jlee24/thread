import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View } from 'react-native';

{/* Each search result is an Item component;
    below is the "HTML" of an Item */}
function Item({ info , isSelected }) {
    {/* TODO: Fix isSelected transfer, not working */}
    return (
        <View 
            style={styles.item}>
        <Image
          style={styles.itemImage}
          source={{uri: info.path}}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 164,
    height: 164,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#7adbc9',
    borderWidth: 2,
  },
  itemImage: {
    width: 164,
    height: 164,
  },
});

export default Item;
