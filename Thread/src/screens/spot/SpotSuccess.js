import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { Button, StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {
render() {
        const { navigate } = this.props.navigation;
        const photo_uri = this.props.navigation.getParam('uri');

        return (
        <View style={styles.container}>
            <Image style={styles.image} 
                    source={{uri: photo_uri}}/>
            <Text style={styles.header}>{"Spot complete!"}</Text>
            <Text style={styles.basic}>{"You've earned 1 coin."}</Text>
            <Button style={styles.home}
              title="Spot again"
              onPress={() => navigate('SpotStart')}
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
    marginLeft: 2,
    marginRight: 2,
  },

  header: {
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
    width: '75%',
    marginBottom: 30,
    textAlign: 'center',
  },
  basic: {
    marginTop: 15
  },
  home: {
    marginTop: 30
  },
  image: {
    height: '50%',
    width: 200
  }

});