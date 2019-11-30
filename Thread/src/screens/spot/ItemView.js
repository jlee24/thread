'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Button } from 'react-native';

export default class ExampleApp extends PureComponent {
arrayholder = require('../../../assets/database.json');

  render() {
    const { navigate } = this.props.navigation;
    const itemID = this.props.navigation.getParam('itemID', 'no_id');
    const item = this.arrayholder[itemID];
    const path = item.path;
    console.log(path);

    return (
      <View style={styles.container}>
            <Text style={styles.username}>{item.user} is seeking</Text>
            {/* Need to fix this image path*/}
            <Image style={styles.image} 
                    source={{uri: path}}/>

            <Text style={styles.bodyText}>{item.name}</Text>
            <Text style={styles.bodyText}>Fit: baggy</Text>
            <Text style={styles.bodyText}>Price cap: $10</Text>

            <Button title="Spotted!" onPress={() => navigate('CameraView')} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-around'
  },
  subheader: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  results: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 5,
    fontSize: 16
  },
  hours: {
    color: "#121212",
    fontSize: 16,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  username: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
    width: '80%'
  },
  store: {
    color: "#121212",
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
    marginTop: '20%'
  },
  subtitle: {
    color: '#7adbc9',
    width: '80%',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  data: {
    marginTop: '25%'
  },
  directions: {
    backgroundColor: '#7adbc9',
    borderRadius: 10,
  },
  bodyText: {
    width: '80%',
    fontSize: 22
  },
  image: {
    width: 400, 
    height: 400
  }
});