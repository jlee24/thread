import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View, TouchableOpacity } from 'react-native';
import openMap from 'react-native-open-maps';

import SubmitButton from "../components/SubmitButton";

function ShopHeader({shop, numActiveSeeks}) {
  return (
      <View style={styles.header}>
        <Text style={styles.title1}>{shop}</Text>
        <Text style={styles.subtitle1}>8am-10pm</Text>
        <Text style={styles.subtitle}>{numActiveSeeks} possible spots</Text>      
      </View>
  );
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle1: {
    color: "#121212",
    fontSize: 16,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  title1: {
    color: "#121212",
    fontSize: 20,
    fontWeight: '400',
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  subtitle: {
    color: '#50CDB6',
    width: '80%',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: '5%',
  },
});

export default ShopHeader;
