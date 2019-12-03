import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, SafeAreaView } from 'react-native';

function MyLikes(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Your Likes </Text>
      <View style = {styles.spacer}/>
      <Text style = {styles.heading}> Goodwill Silicon Valley </Text>

      <Text style = {styles.heading}> (replace me with row of square images) </Text>

      <View style = {styles.spacer}/>
      <Text style = {styles.heading}> Savers Redwood City </Text>

      <Text style = {styles.heading}> (replace me with row of square images) </Text>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    color: "#121212",
    fontSize: 25,
    fontFamily: "ibm-plex-sans-regular",
    width: '100%',
  },
  heading: {
    fontSize: 20,
    color: "#121212",
    left: 12,
  },
  spacer: {
    height: 12
  },
});

export default MyLikes;