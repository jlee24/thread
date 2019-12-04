'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Button } from 'react-native';
import ShopHeader from "../../components/ShopHeader";
import { Ionicons} from '@expo/vector-icons';
import { Searchbar, TextInput } from 'react-native-paper';

export default class ExampleApp extends PureComponent {
arrayholder = require('../../../assets/database.json');
shops = require('../../../assets/thriftShops.json');

  state = {
    location: '',
    description: ''
  }

  render() {
    const { navigate } = this.props.navigation;

    const photo_uri = this.props.navigation.getParam('uri');

    return (
      <View style={styles.container}>
            {/* Need to fix this image path*/}
            <Image style={styles.image} 
                    source={{uri: photo_uri}}/>
            <View style={styles.topbar}>
              <TouchableOpacity 
                  style={styles.toggleButton}
                  onPress={() => navigate('Photo')}>
              <Ionicons name="ios-arrow-back" size={50} color="white"/>
              </TouchableOpacity>
            </View>
            <View style={styles.bottombar}>
            
            <TextInput 
              label = "Where in the store did you find this item?"
              onChangeText={location => this.setState({ location })}
              placeholder = "e.g.  middle rack under “Women’s Tops” sign"
              multiline = {true}
              style={styles.textinput} />

            <TextInput 
              label = "Additional Notes (optional)"
              onChangeText={description => this.setState({ description })}
              placeholder = "e.g.  The color’s not an exact much, but I hope this is close to what you’re looking for! :)"
              multiline = {true}
              style={styles.textinput} />

            <Button title="Send to coolgirl94" onPress={() => navigate('SpotSuccess', {'uri': photo_uri})}/>
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
  image: {
    height: '100%',
    width: '100%'
  },
  bottombar: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'column',
    height: '90%',
    justifyContent: 'space-evenly',
    paddingBottom: 0,
    width: '100%',
    zIndex: 3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    opacity: .5
    },

  topbar: {
    zIndex: 3,
    backgroundColor: 'black',
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-between',
    paddingBottom: 0,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: .5
    },
    toggleButton: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  textinput: {
    width: '80%',
    height: 250,
  },
});