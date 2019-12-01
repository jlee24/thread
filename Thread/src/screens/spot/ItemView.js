'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Button } from 'react-native';
import ShopHeader from "../../components/ShopHeader";

export default class ExampleApp extends PureComponent {
arrayholder = require('../../../assets/database.json');
shops = require('../../../assets/thriftShops.json');

  render() {
    const { navigate } = this.props.navigation;
    const itemID = this.props.navigation.getParam('itemID', 'no_id');
    const item = this.arrayholder[itemID];
    const path = item.path;
    const shopId  = 1
    this.state = {
      shop: this.shops[shopId]
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ShopHeader
              shop={this.state.shop}/>
          </View>

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
    width: '90%',
  },
  store: {
    color: "#121212",
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
    width: '90%',
    marginBottom: '10%'
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
    width: '90%',
    fontSize: 22
  },
  image: {
    width: '100%', 
    height: 400,
    marginTop: 10,
    marginBottom: 10
  }
});