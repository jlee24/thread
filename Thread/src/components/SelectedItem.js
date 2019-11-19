import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View } from 'react-native';

{/* SelectedItem is a component for the search results
    selected by the user */}
function SelectedItem({ info }) {
  return (
      <View>
        <Image
          style={styles.selectedItemImage}
          source={{uri: info.path }}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  selectedItemImage: {
    width: 60,
    height: 60,
  },
});

export default SelectedItem;
