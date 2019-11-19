import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View } from 'react-native';

{/* Each search result is an Item component;
    below is the "HTML" of an Item */}
function Item({ info }) {
  return (
      <View>
        <Image
          style={styles.itemImage}
          source={{uri: info.path }}
        />
        {/*<Text>{info.name}</Text>*/}
      </View>
  );
}

const styles = StyleSheet.create({
  itemImage: {
    width: 100,
    height: 100,
  },
});

export default Item;
