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
          style={styles.unselectedImage}
          source={{uri: props.info.path}}
        />
        {props.isSelected ? 
          <Image
             style={styles.checkmark}
              source={{uri: "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/checkmark.png" }}
          /> : null
        }
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
  checkmark: {
    width: 36,
    height: 36,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  unselectedImage: {
    width: 164,
    height: 164,
  },
  selectedImage: {
    width: 164,
    height: 164,
    borderColor: '#7adbc9',
    borderWidth: 4,
  },
});

export default Item;
