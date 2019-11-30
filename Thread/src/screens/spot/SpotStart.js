import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { Image, Dimensions, StyleSheet, Text, View, FlatList, ScrollView, Alert, Tooltip, TouchableOpacity, Button} from 'react-native';
import Drawer from 'react-native-draggable-view'

import  AutocompleteSearchBar from "../../components/AutocompleteSearchBar";
import SpotMap from "../../components/SpotMap";
import ShopsPreview from "../../components/ShopsPreview";

const LATLNG_DELTA = 0.04;
export default class App extends React.Component {

  constructor(props) {
    super();
    this.state = {
      isLoading: true,
      shops: require('../../../assets/thriftShops.json'),
      // user's current location, hardcoded as d.school here but dynamically updated in map
      userLocation: {
        latitude: 37.426431,
        longitude: -122.171881,
        latitudeDelta: LATLNG_DELTA,
        longitudeDelta: LATLNG_DELTA,
      },
      // region currently shown on map (updated as user pans, searches)
      region: {
        latitude: 37.426431,
        longitude: -122.171881,
        latitudeDelta: LATLNG_DELTA,
        longitudeDelta: LATLNG_DELTA,
      }
    }
  }

  // Returns n nearest shops in decreasing closeness. If n is -1, returns all shops
  getNearestShops(n) {
    // Helper for sorting
    const haversine = require('haversine')
    const region = this.state.region
    function isCloser(shopA, shopB) {
      coordCurr = {latitude: region.latitude, longitude: region.longitude}
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
    nearestShops = this.getNearestShops(-1) // Grab all shops sorted by proximity
    coordCurr = {latitude: this.state.userLocation.latitude, longitude: this.state.userLocation.longitude}
    for (var i = 0; i < nearestShops.length; i++) {
      shop = nearestShops[i]
      coordShop = {latitude: shop.lat, longitude: shop.lng}
      nearestShops[i].distAway = haversine(coordCurr, coordShop, {unit: 'mile'})
    }
    return nearestShops
  }

  onShopMarkerSelection = (shopID) => {
    const { shops } = this.state;
    selectedShop = shops.find(shop => shop.id === shopID);
    this.setState({
      region: {
        latitude: selectedShop.lat,
        longitude: selectedShop.lng,
        latitudeDelta: LATLNG_DELTA,
        longitudeDelta: LATLNG_DELTA,
      }
    });
    // TODO: open marker callout
  }

  render() {
    const { navigate } = this.props.navigation;
    const { query } = this.state;

    return (
      <View style={styles.container}>
        {/* Header with search bar*/}
        <View style={styles.header}>
          <Text style={styles.headerText}>Where would you like to spot?</Text>
          {/* Search bar */}
          <AutocompleteSearchBar 
            data={this.state.shops}
            onItemSelection={this.onShopMarkerSelection}
            placeholder={'ex: Goodwill of Silicon Valley'}
          />
        </View>
        {/* Map and scroll up shop menu */}
        <Drawer
          initialDrawerSize={0.24}
          renderContainerView={() => 
            <View style={{height: 400}}>
              <SpotMap 
                region={this.state.region}
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
