'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Button, Modal, ScrollView } from 'react-native';
import ShopHeader from "../../components/ShopHeader";
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import { Searchbar, TextInput } from 'react-native-paper';
import SubmitButton from "../../components/SubmitButton";

export default class Photo extends React.Component {

    static navigationOptions = ({ navigation }) => {
    return {
          headerShown: false
      };
    };

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
            

            <SubmitButton caption="Next" onPress={() => {
              this.setModalVisible(true)
              this.setBarsVisible(false)
            }}/>

          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          coverScreen = {true}
          onSwipe={this.closeModal}>
        

          
          <ScrollView contentContainerStyle={{
            width: '100%',
            height: '95%',
            marginTop: '0%',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            opacity: 1,
            position: 'absolute',
            top: '5%',
            left: 0
          }}>

          <TouchableOpacity 
          style={styles.modalToggleButton}
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
          this.setBarsVisible(!this.state.barsVisible)
          }}>
          <Ionicons name="ios-close" size={50} color="white"/>
          </TouchableOpacity>

          <TextInput 
              label = "Size"
              onChangeText={size => this.setState({ size })}
              placeholder = {"i.e. 'XL'"}
              theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
              style={styles.textinput} />

            <TextInput 
              label = "Price"
              onChangeText={price => this.setState({ price })}
              placeholder = {"i.e. '$5.50'"}
              theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
              style={styles.textinput} />


              <TextInput 
              label = "Where in the store did you find this item?"
              onChangeText={location => this.setState({ location })}
              multiline={true}
              placeholder = {"i.e. Middle rack under “Women’s Tops” sign"}
              theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
              style={styles.longinput} />

            <TextInput 
              label = "Additional Notes (optional)"
              onChangeText={description => this.setState({ description })}
              multiline={true}
              theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
              placeholder = {"i.e.  The color’s not an exact much, but I hope this is close to what you’re looking for! :)"}
              style={styles.longinput} />

            <View style={styles.spacer}></View>


              <SubmitButton
                  onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                  navigate('SpotSuccess', {'uri': photo_uri})}}
                  caption= "Submit" />
              <View style={styles.spacer}></View>
            </ScrollView>
          
            
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
    flexDirection: 'column',
    height: '25%',
    justifyContent: 'space-evenly',
    paddingBottom: 0,
    width: '100%',
    zIndex: 3,
    position: 'absolute',
    bottom: 0,
    left: 0,
    opacity: 1
    },

  topbar: {
    zIndex: 3,
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-between',
    paddingBottom: 0,
    width: '100%',
    position: 'absolute',
    top: 44,
    left: 0,
    opacity: 1
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
  longinput: {
    width: '80%',
    height: 100,
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
    height: 60,
    paddingRight: '80%'
  },
  spacer: {
    height: '15%'
  },
  contentContainer: {
    height: '95%'
  },
  title1: {
    color: "#121212",
    fontSize: 20,
    fontFamily: "ibm-plex-sans-regular",
    width: '80%',
  },
});