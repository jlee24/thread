import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Image, Text, View, TouchableOpacity } from 'react-native';

function ShopHeader(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <View style={styles.subheader}>
              <Text style={styles.title1}>{props.shop.name}</Text>
              <Text style={styles.subtitle1}>8am-10pm</Text>
              <Text style={styles.subtitle}>{props.shop.possibleSpots} possible spots</Text>
          </View>
          <View style={styles.subheader}>
              <Text style={styles.hours}>2.7 miles away</Text>
              
              <TouchableOpacity style={styles.button}>
              <Text style={styles.buttontext}>Directions</Text>
              </TouchableOpacity>
          </View>
          </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    justifyContent: 'space-around',

  },
  subheader: {
    width: '50%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  subtitle1: {
    color: "#121212",
    fontSize: 16,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  title1: {
    color: "#121212",
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  subtitle: {
    color: '#7adbc9',
    width: '80%',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  button: {
    backgroundColor: '#7adbc9',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    height: 36,
  },
  buttontext: {
    color: 'white',
    fontSize: 18,
  }
});

export default ShopHeader;