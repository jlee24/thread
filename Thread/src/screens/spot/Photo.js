'use strict';
import React, { PureComponent } from 'react';
import { AsyncStorage, AppRegistry, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Button, Modal, ScrollView } from 'react-native';
import ShopHeader from "../../components/ShopHeader";
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import { Searchbar, TextInput } from 'react-native-paper';
import SubmitButton from "../../components/SubmitButton";
import * as firebase from 'firebase';

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
    barsVisible: true,
    uri: this.props.navigation.getParam('uri'),
    seekId: '',
  }

 /* componentDidMount() {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
      username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    }).then( () => {
      this.setState({ username });
    });
  }*/

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setBarsVisible(visible) {
    this.setState({barsVisible: visible});
  }

  /*uploadImage = async(uri) => {
    const name = await AsyncStorage.getItem('name');
    const response = await fetch(uri);
    const blob = await response.blob();
    let splitURI = uri.split('/');
    let filename = splitURI[splitURI.length - 1];
    var ref = firebase.storage().ref().child(name+'/'+filename);
    let task = ref.put(blob);
    return {task, ref};
  };*/

  writeSpotData = async (photo_uri) => {
    /*let res = await this.uploadImage(photo_uri);
    await res.task;
    let url = await res.ref.getDownloadURL();
    this.setState({uri: photo_uri});*/

    var newSpot = firebase.database().ref('spots/').push();
    var curr_user = firebase.auth().currentUser;
    newSpot.set({
      'seekId': this.props.navigation.getParam('seekId'),
      'userId': curr_user.uid,
      'size': this.state.size,
      'price': this.state.price,
      'location': this.state.location,
      'description': this.state.description,
      'img': photo_uri,
    }).then(() => this.props.navigation.navigate('SpotSuccess', {'uri': this.state.uri}));

    /*var spotId = firebase.database().ref('seeks/' + this.state.seekId + '/spots').push();
    spotId.set({
        spotId: this.
        // get the ID of the spot
      }
    )
    .then(() => this.props.navigation.navigate('SpotSuccess', {'uri': uri}))*/
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
              label = "Where did you find it?"
              onChangeText={location => this.setState({ location })}
              multiline={true}
              placeholder = 'i.e. Middle rack under “Women’s Tops” sign'
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
                  this.setModalVisible(!this.state.modalVisible);
                  this.writeSpotData(photo_uri);
                }}
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