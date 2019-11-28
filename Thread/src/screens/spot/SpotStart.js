import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { Image, Dimensions, StyleSheet, Text, View, FlatList, ScrollView, Alert, Tooltip, Button} from 'react-native';
import Drawer from 'react-native-draggable-view'

import SpotMap from "../../components/SpotMap";
import ShopsPreview from "../../components/ShopsPreview";

export default class App extends React.Component {

  constructor(props) {
    super();
    this.state = {
      isLoading: true,
      shops: require('../../../assets/thriftShops.json'),
      currLocation: {
        lat: 37.426431,
        lng: -122.171881
      }
    }
  }

  // Returns n nearest shops in decreasing closeness. If n is -1, returns all shops
  getNearestShops(n) {
    // Helper for sorting
    const haversine = require('haversine')
    const currLocation = this.state.currLocation
    function isCloser(shopA, shopB) {
      coordCurr = {latitude: currLocation.lat, longitude: currLocation.lng}
      coordA = {latitude: shopA.lat, longitude: shopA.lng}
      coordB = {latitude: shopB.lat, longitude: shopB.lng}
      return (haversine(coordA, coordCurr) < haversine(coordB, coordCurr))
    }

    // Sort shops to get closest ones to current location
    this.state.shops.sort((a, b) => !isCloser(a, b) ? 1 : -1)
    if (n === -1) {
      return this.state.shops
    }
    return this.state.shops.slice(0, n)
  }

  getShopsPreviewData() {
    const haversine = require('haversine')
    nearestShops = this.getNearestShops(4)
    coordCurr = {latitude: this.state.currLocation.lat, longitude: this.state.currLocation.lng}
    for (var i = 0; i < nearestShops.length; i++) {
      shop = nearestShops[i]
      coordShop = {latitude: shop.lat, longitude: shop.lng}
      nearestShops[i].distAway = haversine(coordCurr, coordShop, {unit: 'mile'})
    }
    return nearestShops
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Where would you like to spot?</Text>
        </View>
        <Drawer
          initialDrawerSize={0.24}
          renderContainerView={() => 
            <View style={{height: 400}}>
              <SpotMap 
                initLocation={this.state.currLocation} 
                shops={this.state.shops}
                navigation={this.props.navigation}
              />
            </View>
          }
          renderDrawerView={() => 
            <ShopsPreview shops={this.getShopsPreviewData()}/>}
          renderInitDrawerView={() => (
            <View style={styles.handle}>
              <Image
                style={styles.scrollIndicator}
                source={{uri: "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/scrollIndicator.png" }}
              />
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    backgroundColor: '#FAFAFA',
    height: 60,
    width: 360,
  },
  scrollIndicator: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 4,
    width: 44,
    height: 8,
  },
  header: {
    zIndex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: 48,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  previewContainer: {
    zIndex: 3,
    backgroundColor: 'blue',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '92%',
    left: 0,
  }
});
