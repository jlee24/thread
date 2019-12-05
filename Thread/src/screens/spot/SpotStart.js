import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { Image, Dimensions, StyleSheet, Text, View, FlatList, ScrollView, Alert, Tooltip, TouchableOpacity, Button} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

import  AutocompleteSearchBar from "../../components/AutocompleteSearchBar";
import ShopPreviewPanel from "../../components/ShopPreviewPanel";
import selectedMarkerImg from "../../../assets/images/selected-marker.png";

import getDirections from 'react-native-google-maps-directions';

const LATLNG_DELTA = 0.04;
export default class App extends React.Component {

  constructor(props) {
    super();
    this.state = {
      isLoading: true,
      shops: [],
      activeShop: null,
      markers: {},
      url: '',
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

  componentWillMount() {
    const haversine = require('haversine')
    userCoord = {latitude: this.state.userLocation.latitude, longitude: this.state.userLocation.longitude}
    shops = require('../../../assets/thriftShops.json').map( (shop) => ({...shop,
      distAway: haversine(userCoord, {latitude: shop.lat, longitude: shop.lng}, {unit: 'mile'})}))
    this.setState({ shops: shops })
  }

  // Returns n nearest shops in decreasing closeness. If n is -1, returns all shops
  // Note: Currently not used, but will be useful when we have a large shop dataset
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

  onShopSearchSelection = (shopID) => {
    const { shops } = this.state;
    selectedShop = shops.find(shop => shop.id === shopID);
    _mapView.animateToRegion({
        latitude: selectedShop.lat,
        longitude: selectedShop.lng,
        latitudeDelta: LATLNG_DELTA,
        longitudeDelta: LATLNG_DELTA,
      })
    this.setState({
      activeShop: selectedShop
    });
    // TODO: open marker callout
  }

  onMarkerPress = (event) => {
    const markerID = event.nativeEvent.id;
    console.log(event.nativeEvent);
    const { shops } = this.state;
    selectedShop = shops.find(shop => shop.id === markerID);
    console.log("Selected shop: ", selectedShop)
    this.setState({activeShop: selectedShop});
    const label = selectedShop.name;
    const url_str = "maps:" + selectedShop.lat + "," + selectedShop.lng
    this.setState({url: url_str});
  }

  onRegionChangeComplete = (region) => {
    this.setState({region: region});
  }

  render() {
    const { navigate } = this.props.navigation;
    const { query } = this.state;

    // Helper to render marker for each shop on map
    function shopMarkers(shops, navigation, activeShop, onMarkerPress, color='red') {
      return shops.map( (shop) => {
        const {navigate} = navigation;
        return (
          <Marker
            key={shop.id}
            identifier={shop.id}
            coordinate={{latitude:shop.lat, longitude:shop.lng}}
            title={shop.name}
            description={shop.possibleSpots + " possible spots"}
            pinColor={color}
            onPress={(event) => onMarkerPress(event)}
            onCalloutPress={() => navigate("StoreView")}
          >
            <Callout>
                <TouchableOpacity
                    style={styles.callout}>
                    <Text>{shop.name}</Text>
                </TouchableOpacity>
            </Callout>
          </Marker>
        )
      })
    }

    return (
      <View style={styles.container}>
        {/* Header with search bar*/}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Where would you like to spot?
          </Text>
          {/* Search bar */}
          <AutocompleteSearchBar
            data={this.state.shops}
            onItemSelection={this.onShopSearchSelection}
            placeholder={'ex: Goodwill of Silicon Valley'}
          />
        </View>
        {/* Preview panel */}
        {(this.state.shops.length > 0 && this.state.activeShop !== null)?
          <View style={styles.previewPanelContainer}>
            <ShopPreviewPanel
              shop={this.state.activeShop}
              navigation={this.props.navigation}
              url={this.state.url}
            />
          </View> : null
        }
        {/* Map */}
        <MapView
          ref={(mapView) => { _mapView = mapView; }}
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          {/* Mark thrift shops */}
          {shopMarkers(this.state.shops, this.props.navigation, this.state.activeShop, this.onMarkerPress)}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, height: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewPanelContainer: {
    zIndex: 3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'yellow',
    width: '100%',
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
    backgroundColor: '#50CDB6',//'rgba(0, 0, 0, 0.5)',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 12,
  },
  headerText: {
    marginTop: 'auto',
    marginBottom: 'auto',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  callout: {
    backgroundColor: 'white',
    padding: 4,
  },
});
