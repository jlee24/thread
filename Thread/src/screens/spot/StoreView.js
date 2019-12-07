import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { StyleSheet, Text, View, FlatList, ScrollView, Alert, Tooltip, Button, TouchableOpacity} from 'react-native';

import Item from "../../components/SpotItem";
import ShopHeader from "../../components/ShopHeader";

import * as firebase from 'firebase';

export default class App extends React.Component {

  arrayholder = require('../../../assets/database.json');
  shops = require('../../../assets/thriftShops.json');

  state = {
    shop: '',
    activeSeeksAtShop: [],
    keys: [],
    paths: []
  }

  componentDidMount() {
    shopName = this.props.navigation.getParam('shop');
    const shopName = shopName.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    this.setState({ shop: shopName });
    var activeSeeksAtShop = [];
    var keys = [];
    var paths = [];

    firebase.database().ref('/seeks').orderByChild('store').equalTo(shopName)
      .once('value')
      .then(snapshot => {
        const activeSeeks = snapshot.val();
        for (var v in activeSeeks) {
            activeSeeksAtShop.push(activeSeeks[v]);
            keys.push(v);
            paths.push(activeSeeks[v].refImages[0].path)
        }
        this.setState({activeSeeksAtShop});
        this.setState({keys});
        this.setState({paths});
      })
      .catch(error => console.log(error));
  }

  render() {
        const { navigate } = this.props.navigation;
        const { activeSeeksAtShop } = this.state;
        const { shop } = this.state;
        const { paths } = this.state;
        const { keys } = this.state;

    		return (
      		<View style={styles.container}>
          <ShopHeader
              shop={shop}
              numActiveSeeks={activeSeeksAtShop.length}/>

                <View style={styles.results}>
                <FlatList
                  data={activeSeeksAtShop}
                  style={styles.data}

                  renderItem={({ item }) =>
                  <TouchableOpacity
                    style={styles.itemWrapper}
                    onPress={() =>
                        navigate('ItemView', {
                        title: item.title,
                        username: item.username,
                        description: item.description,
                        size: item.size,
                        fit: item.fit,
                        store: item.store,
                        price: item.price,
                        path: paths[activeSeeksAtShop.indexOf(item)],
                        shop: shop,
                        seekId: keys[activeSeeksAtShop.indexOf(item)]
                          })}>
                      <Text style={styles.username}> {item.username} </Text>
                      <Item info={item}/>

                      <Text style={styles.name}> {item.title} </Text>
                  </TouchableOpacity>
                  }

                  keyExtractor={item => activeSeeksAtShop.indexOf(item)}
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
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  name: {
    textAlign: 'center',
    width: 150,
    marginBottom: 15,
    marginTop: 5,
    fontSize: 16
  },
  itemWrapper: {
    marginRight: 4,
    marginBottom: 4,
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
