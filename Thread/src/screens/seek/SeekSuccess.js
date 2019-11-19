import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { StyleSheet, Text, View } from 'react-native';


export default class App extends React.Component {
render() {
    		return (
      		<View style={styles.container}>
        			<Text>Seek Success!</Text>
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
});
