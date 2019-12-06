import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";


{/* SelectedItem is a component for the search results
    selected by the user */}
function SelectedItem(props) {
  return (
      <View>
        <Image
          style={styles.selectedItemImage}
          source={{uri: props.info.path }}
        />
        <Ionicons style={styles.close}
                  name="ios-close-circle"
                  size={20} />
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
  close: {
    margin: 0,
    position: "absolute",
    top: 1,
    left: 3,
    width: 20,
    height: 20,
    color: "#50CDB6"
  },
});

export default SelectedItem;
