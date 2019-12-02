'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Button } from 'react-native';
import ShopHeader from "../../components/ShopHeader";

export default class ExampleApp extends PureComponent {
arrayholder = require('../../../assets/database.json');
shops = require('../../../assets/thriftShops.json');

  render() {
    const { navigate } = this.props.navigation;

    const photo_uri = this.props.navigation.getParam('uri');
    console.log("URI:", photo_uri);

    return (
      <View style={styles.container}>
            {/* Need to fix this image path*/}
            <Image style={styles.image} 
                    source={{uri: photo_uri}}/>
            <Button title="X" onPress={() => navigate('CameraView')} />
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
  image: {
    height: '100%',
    width: '100%'
  }
});