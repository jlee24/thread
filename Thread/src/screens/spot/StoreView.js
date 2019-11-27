import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { StyleSheet, Text, View, FlatList, ScrollView, Alert, Tooltip, Button, TouchableOpacity} from 'react-native';

import Item from "../../components/Item";

export default class App extends React.Component {
arrayholder = require('../../../assets/database.json');

render() {
        const { navigate } = this.props.navigation;
    		return (
      		<View style={styles.container}>

          <View style={styles.header}>
          <View style={styles.subheader}>
        			<Text style={styles.store}>Goodwill</Text>
              <Text style={styles.hours}>8am-10pm</Text>
              <Text style={styles.subtitle}>12 possible spots</Text>
          </View>
          <View style={styles.subheader}>
              <Text style={styles.hours}>2.7 miles away</Text>
              <Button style={styles.directions} title="Directions"/>
          </View>
          </View>
          <Button onPress={() => navigate('ItemView')} title="Next" / >

                <View style={styles.results}>
                <FlatList
                  data={this.arrayholder}
                  style={styles.data}
                  renderItem={({ item }) =>
                  <TouchableOpacity>
                      <Text style={styles.username}> {item.user} </Text>
                      <Item info={item} />
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
    fontWeight: 'bold'
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
  }
});