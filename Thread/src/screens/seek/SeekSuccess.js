import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { Button, StyleSheet, Text, View } from 'react-native';


export default class App extends React.Component {
render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
            <Text style={styles.header}>{"Your seek has been submitted!"}</Text>
            <Text>{"We\'ll ping you when it\'s been spotted."}</Text>
            <Button
              title="Back to home"
              onPress={() => navigate('SeekStart')}
            />
        </View>
        );
  	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
  }
});