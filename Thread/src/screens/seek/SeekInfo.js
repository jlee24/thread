import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { Button, StyleSheet, Text, View } from 'react-native';


export default class App extends React.Component {
render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={styles.container}>
          <Text>Seek Info Form</Text>
          <Text>yoo</Text>
          <View style={styles.submit}>
          <Button
            title="Post seek!"
            onPress={() => navigate('SeekSuccess')}
          />
          </View>
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
