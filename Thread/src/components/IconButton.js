import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";

function IconButton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttontext}>{props.caption}</Text>
      <Image source={props.source} style={styles.icon}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#50CDB6',
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 12,
    marginRight: 12,
    height: 42,
    flexDirection: 'row'
  },
  buttontext: {
    color: 'white',
    fontSize: 18,
    fontFamily: "ibm-plex-sans-regular"
  },
  icon: {
    height: 25,
    width: 25,
    marginLeft: 5,
    marginBottom: 2
  }
});

export default IconButton;
