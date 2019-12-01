import React from 'react';
import { ImageBackground, TouchableOpacity, Image, StyleSheet, Text, View, Button } from 'react-native';
import Drawer from 'react-native-draggable-view'

// import StoryPreview from "../../components/StoryPreview.js";
// import SpotMap from "../../components/SpotMap";
// import ShopsPreview from "../../components/ShopsPreview";

// const LATLNG_DELTA = 0.04;
export default class App extends React.Component {

  // constructor(props) {
  //   super();
  //   this.state = {
  //     isLoading: true,
  //     shops: require('../../../assets/thriftShops.json'),
  //     region: {
  //       latitude: 37.426431,
  //       longitude: -122.171881,
  //       latitudeDelta: LATLNG_DELTA,
  //       longitudeDelta: LATLNG_DELTA,
  //     }
  //   }
  // }

  // Returns n nearest shops in decreasing closeness. If n is -1, returns all shops
  // getNearestShops(n) {
  //   // Helper for sorting
  //   const haversine = require('haversine')
  //   const region = this.state.region
  //   function isCloser(shopA, shopB) {
  //     coordCurr = {latitude: region.latitude, longitude: region.longitude}
  //     coordA = {latitude: shopA.lat, longitude: shopA.lng}
  //     coordB = {latitude: shopB.lat, longitude: shopB.lng}
  //     return (haversine(coordA, coordCurr) < haversine(coordB, coordCurr))
  //   }

  //   // Sort shops to get closest ones to current location
  //   this.state.shops.sort((a, b) => !isCloser(a, b) ? 1 : -1)
  //   if (n === -1) {
  //     return this.state.shops
  //   }
  //   return this.state.shops.slice(0, n)
  // }

  // getShopsPreviewData() {
  //   const haversine = require('haversine')
  //   nearestShops = this.getNearestShops(-1) // Grab all shops sorted by proximity
  //   coordCurr = {latitude: this.state.region.latitude, longitude: this.state.region.longitude}
  //   for (var i = 0; i < nearestShops.length; i++) {
  //     shop = nearestShops[i]
  //     coordShop = {latitude: shop.lat, longitude: shop.lng}
  //     nearestShops[i].distAway = haversine(coordCurr, coordShop, {unit: 'mile'})
  //   }
  //   return nearestShops
  // }

  // onShopMarkerSelection = (shopID) => {
  //   const { shops } = this.state;
  //   selectedShop = shops.find(shop => shop.id === shopID);
  //   this.setState({
  //     region: {
  //       latitude: selectedShop.lat,
  //       longitude: selectedShop.lng,
  //       latitudeDelta: LATLNG_DELTA,
  //       longitudeDelta: LATLNG_DELTA,
  //     }
  //   });
  // }

render() {
    return (

        <View style = { styles.container } >

        <ImageBackground
          style= { styles.backgroundImage } 
          source={{ uri:"http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/clothes.jpeg" }}>

        <View style= { styles.header }>
        <View style={ styles.spacer }/>
          <Text style = { styles.logoDescription }>
            Goodwill Silicon Valley
            
          </Text>
          <Text style = { styles.logoText }>
            Size M, $13.89
          </Text>
          <View style={ styles.spacer }/>
          <ImageBackground
              source={{ uri:"http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/unliked.png" }}
              style={ styles.imageWrapper }>
              <TouchableOpacity 
                style={ styles.button } 
                onPress={ () => { alert("Added to Your Likes") }}>
                <Text style={ styles.text }>×</Text>
              </TouchableOpacity>
            </ImageBackground>
          <View style={ styles.spacer }/>
        </View>

        <Drawer
          initialDrawerSize={0.24}
          renderContainerView={() => 
            <View style={{height: 400}}>
              
            </View>
          }
          renderDrawerView={() => 
            // <ShopsPreview shops={this.getShopsPreviewData()}/>
            // add limited size container

            <Text style = { styles.logoDescriptionBlack }>
              Nice green blouse with lace design spotted by coolgirl96:
              "The shade of green is a little closer to neon but otherwise seems exactly like what you are looking for!"
            </Text>

          }
          renderInitDrawerView={() => (
            <View style={styles.handle}>
              <Image
                style={styles.scrollIndicator}
                source={{uri: "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/scrollIndicator.png" }}
              />
            </View>
          )}
        />

        
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
    backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.9
    },
    logoContainer:{
        alignItems: "center",
    },
    logoText: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    logoTextBlack: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },
    logoDescription:{
        fontSize: 15,
        fontWeight: '600',
        color: 'white',
        textAlign: 'center',
    },
    logoDescriptionBlack:{
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },
    footer: {
        height: 100
    },
    header: {
      zIndex: 3,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    button:{
      width:36,
      height:36,
      backgroundColor:'white',
      opacity: 0,
      alignItems:'center',
      justifyContent:'center',
      overflow:'hidden',
      borderRadius:20,
    },
    spacer: {
      height: 12,
    },
  imageWrapper:{
     flex: 1,
     width:36,
     height:36,
     borderRadius:15,
     justifyContent: "center",
     alignItems: "center",
  },
  text:{
    fontSize:40,
    color:'white',
    lineHeight:42
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
  handle: {
    backgroundColor: '#FAFAFA',
    height: 60,
    width: '100%',
  }
});