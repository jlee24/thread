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
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 42,
    flexDirection: 'row'
  },
  buttontext: {
    color: 'white',
    fontSize: 22,
    fontFamily: "ibm-plex-sans-regular"
  },
  icon: {
    height: 25,
    width: 25,
    marginLeft: 5
  }
});

export default IconButton;