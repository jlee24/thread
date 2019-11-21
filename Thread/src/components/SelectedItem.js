import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View } from 'react-native';

{/* SelectedItem is a component for the search results
    selected by the user */}
function SelectedItem(props) {
  return (
      <View>
        <Image
          style={styles.selectedItemImage}
          source={{uri: props.info.path }}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  selectedItemImage: {
    borderColor: '#7adbc9',
    borderWidth: 2,
    width: 72,
    height: 72,
  },
});

export default SelectedItem;
