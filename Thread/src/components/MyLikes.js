import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, SafeAreaView } from 'react-native';

function MyLikes(props) {
  return (


    <View style={styles.container}>
      
      <Text style={styles.title}> My Likes </Text>
      <View style = {styles.spacer}/>

      <Text style = {styles.heading}> Goodwill Silicon Valley </Text>
      <View style = {styles.spacer}/>

      <Text style = {styles.heading}> Savers Redwood City </Text>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    textAlign: 'center',
    color: "#121212",
    fontSize: 20,
    fontFamily: "ibm-plex-sans-regular",
    width: '100%',
  },
  heading: {
    fontSize: 18,
    color: "#121212",
  },
  spacer: {
    height: 18,
  },
});

export default MyLikes;