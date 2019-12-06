import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, FlatList} from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { TabNavigator } from 'react-navigation';
import { ButtonGroup } from 'react-native-elements';
import * as firebase from 'firebase'

import MyLikes from "../components/MyLikes";
import SubmitButton from "../components/SubmitButton";

export default class Profile extends React.Component {

  defaultPhotoURI = "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/profile_photo_placeholder.png";

  state = {
    currentUser: null,
    username: '',
    sizeLetter: [],
    sizeNumber: [],
    profilePhoto: this.defaultPhotoURI,
    selectedIndex: 0,
    myLikes: ['http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/brown.png', 'http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/pants.png'],
    mySpots: [],
  };
  updateIndex = this.updateIndex.bind(this)

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

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

  renderItem(item) {
    return (
        <Image style={styles.galleryImg} resizeMode='cover' source={{ uri:  item}}></Image>
    )
  }

  render() {
    const { selectedIndex } = this.state

    const myLikesTab = () => <Text>My Likes</Text>
    const mySpotsTab = () => <Text>My Spots</Text>
    const buttons = [{ element: myLikesTab }, { element: mySpotsTab }]

    const maxIdx = this.state.sizeLetter.length-1;
    letterText = this.state.sizeLetter.map(function(letter, key) {
      if (key < maxIdx) {
        return (<Text key={key}>{letter + ', '}</Text>)
      } else {
        return (<Text key={key}>{letter}</Text>)
      }
    });

    const maxIdxNum = this.state.sizeNumber.length-1;
    numberText = this.state.sizeNumber.map(function(number, key) {
      if (key < maxIdxNum) {
        return (<Text key={key}>{number + ', '}</Text>)
      } else {
        return (<Text key={key}>{number}</Text>)
      }
    });

    return (
      <View style={styles.container}>
        <View style={{width: '90%', height: 150, flexDirection: 'row'}}>
          {/*"http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/greenlacenohalo.png"*/}
          <View style={styles.profilePhotoContainer}>
            <Image
              style={ styles.profilePhoto }
              source={{uri: this.state.profilePhoto }}>
            </Image>
            <Text style={ styles.usernameText }>{this.state.username}</Text>
          </View>

          <View style={{width: '70%', flexDirection: 'column', marginTop: 10}}>
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'flex-start'}}>
              <View style={{width: '40%', alignItems: 'center'}}>
                <Text style={styles.size}> {letterText} </Text>
                <Text> Size (Letter) </Text>
              </View>
              <View style={{width: '50%', alignItems: 'center'}}>
                <Text style={styles.size}> {numberText} </Text>
                <Text> Size (Number)</Text>
              </View>
            </View>
            <View style={{width: '100%', height: 100, flexDirection: 'column', marginTop:10, alignItems: 'center', justifyContent: 'space-around'}}>
              <SubmitButton caption="Edit Sizes"
                onPress={() => this.props.navigation.navigate('UpdateProfile')}/>

            <Button
              color="#50CDB6"
              onPress={() => 
                  firebase.auth().signOut().then(function() {
                    console.log('Sign Out')
                  })
                }
              style={styles.button}>
              Sign Out
              </Button>
            </View>
          </View>

        </View>

        <View>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            selectedButtonStyle={{backgroundColor: "#e0e0e0"}}
            containerStyle={{width: '100%', height: 50, marginLeft:0}} />
            { this.state.selectedIndex === 0 ?
              <View>
                <FlatList
                   numColumns={3}
                   data={this.state.myLikes}
                   renderItem={({ item }) => this.renderItem(item)}
                   keyExtractor={item => this.state.myLikes.indexOf(item)}
                />
              </View>
              :
              <Text> My Spots </Text>
            }
            {/*<FlatList
               numColumns={3}
               data={this.state.data}
               renderItem={({ item }) => this.renderItem(item)}
            />*/}
        </View>



      </View>
    )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    alignItems: 'flex-start',
    flexDirection: 'row'
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
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#50CDB6",
  },
  profilePhotoContainer: {
    width:'30%',
    height:50,
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  usernameText: {
    marginTop: 10,
    fontSize: 14,
    width: 100,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  size: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    fontSize: 25,
    fontWeight: '600',
    color: "#121212",
    textAlign: 'center',
    fontFamily: "ibm-plex-sans-regular",
  },
  galleryImg: {
    flex: 1/3,
    aspectRatio: 1,
    marginRight: 3
  },
  button: {
    marginBottom: 15
  },
})
