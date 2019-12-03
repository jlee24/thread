import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, SafeAreaView } from 'react-native';


// Takes in data with "name" property to use in autocomplete,
// along with an onItemSelection callback
function MyLikes({ filler }) {
  return (
    <Text style={styles.title}> Your Likes </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    color: "#121212",
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
    width: '100%',
  },
});

export default MyLikes;
