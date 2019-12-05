import React, { Component } from 'react'
import { StyleSheet, Text, View, ImageBackground} from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { TabNavigator } from 'react-navigation';
import * as firebase from 'firebase'

import MyLikes from "../components/MyLikes";
import SubmitButton from "../components/SubmitButton";

export default class Profile extends React.Component {

  state = {
    currentUser: null,
    username: '',
    sizeLetter: [],
    sizeNumber: [],
    profilePhoto: '',
  };
  // defaultPhotoURI = "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/profile_photo_placeholder.png";

  componentDidMount() {
    const { currentUser } = firebase.auth()
    userId = currentUser.uid;
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      sizeLetter = (snapshot.val() && snapshot.val().sizeLetter) || [];
      sizeNumber = (snapshot.val() && snapshot.val().sizeNumber) || [];
      profilePhoto = (snapshot.val() && snapshot.val().profilePhoto) || defaultPhotoURI;
    }).then(() => this.setState({
                    username: username,
                    sizeLetter: sizeLetter,
                    sizeNumber: sizeNumber,
                    profilePhoto: profilePhoto,
                  }));
    this.setState({ currentUser });
  }


  render() {
    const url = "{this.state.profilePhoto}";

    return (
      <View style={styles.container}>

        <View style={ styles.spacer }/>

        <Text style = {styles.header}> {this.state.username}{'\''}s Fit </Text>

        <View style={ styles.spacer }/>
         <View style={ styles.spacerSmall }/>

        <View style = {styles.numbers}>

        {/*"http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/greenlacenohalo.png"*/}
          <ImageBackground
            // source={{ uri: this.state.profilePhoto }}
            style={ styles.imageWrapper }>
          </ImageBackground>

          <View style={ styles.sideSpacer}/>


          <View>
            <Text style = {styles.size}> {this.state.sizeLetter} </Text>
            <Text style = {styles.description}> Letter Sizes </Text>
            
          </View>

          <View style={ styles.sideSpacer }/>


          <View>
          <Text style = {styles.size}> {this.state.sizeNumber} </Text>
            <Text style = {styles.description}> Number Sizes </Text>
          </View>
         

        </View>

        <View style={ styles.spacer }/>
         <View style={ styles.spacer }/>

        <Button color = "#7adbc9"
          mode = "contained"
          uppercase = "false"
          onPress={() => this.props.navigation.navigate('UpdateProfile')}>
          Edit My Sizes
        </Button>

        <View style={ styles.spacer }/>
        <View style={ styles.spacer }/>

        <View style = {styles.divider} />


        <View style={ styles.spacer }/>
         <View style={ styles.spacer }/>

        <View style = {styles.numbers}>

          <Button color = "#7adbc9"
            mode = "contained"
            uppercase = "false"
            onPress={() => this.toggleBox }>
            My Likes
          </Button>

          <View style={ styles.sideSpacer}/>

          <Button color = "#7adbc9"
            mode = "contained"
            uppercase = "false"
            onPress={() => alert("Doesn't work yet")}>
            My Spots
          </Button>

        </View>

        <View style={ styles.spacer }/>
         <View style={ styles.spacer }/>

        <MyLikes mylikes = {1}/>

      </View>
    )}
}

const styles = StyleSheet.create({
  container: {

    alignItems: "center",
    height: '100%',
    justifyContent: "center",
  },
  numbers: {
    flexDirection: 'row',
  },
  line : {
    backgroundColor:  'black',
    height: 10,
  },
  description:{
    fontSize: 16,
    fontWeight: '300',
    color: "#121212",
    fontFamily: "ibm-plex-sans-regular",
    textAlign: 'center',
  },
  size: {
    fontSize: 40,
    fontWeight: '400',
    color: "#121212",
    fontFamily: "ibm-plex-sans-regular",
    textAlign: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: '600',
    color: "#121212",
    textAlign: 'center',
    fontFamily: "ibm-plex-sans-regular",
  },
  top: {
    width: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  spacer: {
      height: 12,
  },
  spacerSmall: {
      height: 6,
  },
  sideSpacer: {
      width: 20,
  },
  sideSpacerSmall: {
      width: 10,
  },
  imageWrapper:{
     width:85,
     height:85,
     borderRadius:0,
  },
  divider: {
    backgroundColor: '#d3d3d3',
    height: 2,
    width: "100%",
  }
})
