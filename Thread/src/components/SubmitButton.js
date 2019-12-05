import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function SubmitButton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttontext}>{props.caption}</Text>
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
    height: 42,
  },
  buttontext: {
    color: 'white',
    fontSize: 22,
    fontFamily: "ibm-plex-sans-regular"
  }
});

export default SubmitButton;