'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Button, Modal } from 'react-native';
import ShopHeader from "../../components/ShopHeader";
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import { Searchbar, TextInput } from 'react-native-paper';

export default class ExampleApp extends PureComponent {
arrayholder = require('../../../assets/database.json');
shops = require('../../../assets/thriftShops.json');

  state = {
    size: '',
    price: '',
    location: '',
    description: '',
    modalVisible: false,
    barsVisible: true
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setBarsVisible(visible) {
    this.setState({barsVisible: visible});
  }

  render() {
    const { navigate } = this.props.navigation;
    const photo_uri = this.props.navigation.getParam('uri');

    return (
      <View style={styles.container}>
            {/* Need to fix this image path*/}
            <Image style={styles.image} 
                    source={{uri: photo_uri}}/>
            <View style={
              this.state.barsVisible ? styles.topbar : styles.empty
              }>
              <TouchableOpacity 
                  style={styles.toggleButton}
                  onPress={() => navigate('CameraView')}>
              <Ionicons name="ios-close" size={50} color="white"/>
              </TouchableOpacity>
            </View>
            <View style={this.state.barsVisible ? styles.bottombar : styles.empty}>
            
            <TextInput 
              label = "Size"
              onChangeText={size => this.setState({ size })}
              placeholder = "Select a size."
              style={styles.textinput} />

            <TextInput 
              label = "Price"
              onChangeText={price => this.setState({ price })}
              placeholder = "Enter a price."
              style={styles.textinput} />

            <Button title="Next" onPress={() => {
              this.setModalVisible(true)
              this.setBarsVisible(false)
            }}/>

          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          coverScreen = {true}>
        

          <View style={styles.modal}>

          <TouchableOpacity 
          style={styles.modalToggleButton}
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
          this.setBarsVisible(!this.state.barsVisible)
          }}>
          <Ionicons name="ios-close" size={50} color="white"/>
          </TouchableOpacity>

              <TextInput 
              label = "Where in the store did you find this item?"
              onChangeText={location => this.setState({ location })}
              placeholder = "e.g.  middle rack under “Women’s Tops” sign"
              multiline = {true}
              style={styles.longinput} />

            <TextInput 
              label = "Additional Notes (optional)"
              onChangeText={description => this.setState({ description })}
              placeholder = "e.g.  The color’s not an exact much, but I hope this is close to what you’re looking for! :)"
              multiline = {true}
              style={styles.longinput} />


              <TouchableOpacity
                  onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                  navigate('SpotSuccess', {'uri': photo_uri})}}
                  style = {styles.button}>
              <Text style={styles.title1}>Submit</Text>
              </TouchableOpacity>
          </View>
        </Modal>

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
    height: '25%',
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
    height: 50,
  },
  modal: {
    width: '100%',
    height: '81%',
    marginTop: '10%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: .5,
    position: 'absolute',
    top: '5%',
    left: 0,
  },
  longinput: {
    width: '80%',
    height: 200,
    marginTop: 5,
  },
  button: {
    marginTop: 10,
  },
  title1: {
    color: 'white',
    fontSize: 24,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
    fontWeight: 'bold'
  },
  empty: {
    height: 0
  },
  modalToggleButton: {
    height: 70,
    paddingRight: '80%'

  }
});