import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import { withNavigation } from 'react-navigation';

function MaterialButtonGrey(props) {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Size')}
       /*Conditional navigation not supported at the moment */ style={[
        styles.container,
        props.style
      ]}
    >
      <Text style={styles.caption}>{props.caption || "Edit"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(217,217,217,1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 5,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5,
    marginTop: 15,
    marginBottom: 15
  },
  caption: {
    width: 50,
    color: "rgba(0,0,0,1)",
    alignSelf: "center",
    justifyContent: "space-between",
    margin: 5,
    fontSize: 14,
    fontFamily: "roboto-regular"
  }
});

export default withNavigation(MaterialButtonGrey);
