import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { StyleSheet, Text, View, FlatList, ScrollView, Alert, Tooltip, Button, TouchableOpacity} from 'react-native';

import Item from "../../components/Item";
import ShopHeader from "../../components/ShopHeader";

import * as firebase from 'firebase';

export default class App extends React.Component {

arrayholder = require('../../../assets/database.json');
shops = require('../../../assets/thriftShops.json');

render() {
        const { navigate } = this.props.navigation;
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

                <View style={styles.results}>
                <FlatList
                  data={this.arrayholder}
                  style={styles.data}
                  renderItem={({ item }) =>
                  <TouchableOpacity onPress={() =>
                        navigate('ItemView', {
                        itemID: this.arrayholder.indexOf(item),
                          })}>
                      <Text style={styles.username}> {item.user} </Text>
                      <Item info={item}/>

                      <Text style={styles.name}> {item.name} </Text>
                  </TouchableOpacity>
                  }

                  keyExtractor={item => item.id}
                  numColumns={2} />
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
  header: {
    marginTop: '20%',
  },
  subheader: {
    width: '50%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
  },
  results: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  name: {
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 5,
    fontSize: 16
  },
  subtitle1: {
    color: "#121212",
    fontSize: 16,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  username: {
    marginTop: 5,
    fontWeight: 'bold'
  },
  title1: {
    color: "#121212",
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
  subtitle: {
    color: '#7adbc9',
    width: '80%',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  data: {
    marginTop: '10%'
  },
  button: {
    backgroundColor: '#7adbc9',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    height: 36,
  },
  buttontext: {
    color: 'white',
    fontSize: 18,
  }
});