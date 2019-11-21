import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View } from 'react-native';

function CurrencyIcon({ amount }) {
    return (
      <View style={styles.container}>
        <Text style={styles.currencyLabel}>{amount}</Text>
        <Image
          style={styles.currencyImage}
          source={{uri: "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/wood_button.png" }} 
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  currencyLabel: {
    fontSize: 28,
    marginRight: 4,
    color: '#737373',
  },
  currencyImage: {
    width: 32,
    height: 32,
  },
});

export default CurrencyIcon;
