import React, { Component } from "react";
import {
  AsyncStorage,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";

import { Button, TextInput } from 'react-native-paper';
import { ButtonGroup } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import SubmitButton from "../../components/SubmitButton";

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';


export default class BuildProfile extends React.Component {

  getPermissionAsync = async (permission) => {
    const { status } = await Permissions.askAsync(permission);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload an image!');
    }
  }

  uploadImage = async(uri) => {
    const name = await AsyncStorage.getItem('name');
    const response = await fetch(uri);
    const blob = await response.blob();
    let splitURI = uri.split('/');
    let filename = splitURI[splitURI.length - 1];
    var ref = firebase.storage().ref().child(name+'/'+filename);
    let task = ref.put(blob);
    return {task, ref};
  };

  uploadFromLibrary = async () => {
    await this.getPermissionAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      //uri is the local name of the image on phone
      let res = await this.uploadImage(result.uri);

      //To save where the image is, we can do 2 things.
      //1) just keep track of the url by putting it in the user data in firebase or locally
      //2) don't get the url until you need it. i.e., you know the user folder in storage, so why get url right now? Get it when you need it
      await res.task;
      let url = await res.ref.getDownloadURL();
      console.log(url);
      this.setState({profilePhotoURI: url,
                     profilePhotoUploaded: true});
    }
  }

  deletePhoto = () => {
    this.setState({ profilePhotoURI: this.defaultPhotoURI,
                    profilePhotoUploaded: false});
  }

  defaultPhotoURI = "http://web.stanford.edu/class/cs147/projects/HumanCenteredAI/Thread/hifi_photos/profile_photo_placeholder.png";
  state = {
    selectedIndexesLetter: [],
    selectedIndexesNumber: [],
    // selectedIndexesShoe: [],
    profilePhotoURI: this.defaultPhotoURI,
    profilePhotoUploaded: false,
    username: '',
    currentUser: null
  }

  buttonsLetter = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '0X', '1X', '2X', '3X', '4X', '5X'];
  buttonsNumber = ['00', '0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32'];
  // buttonsShoe = ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5'];


  writeUserData = (user) => {
    const userId = user.uid;
    const name = this.state.username;
    const email = user.email;
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      sizeLetter: this.state.selectedIndexesLetter.map(x => this.buttonsLetter[x]),
      sizeNumber: this.state.selectedIndexesNumber.map(x => this.buttonsNumber[x]),
      // sizeShoe: this.state.selectedIndexesShoe.map(x => this.buttonsShoe[x]),
      coins: 3,
      likes: [],
      seeks: [],
      profilePhoto: this.state.profilePhotoURI,
    })
    .then(() => this.props.navigation.navigate('TabNavigator'))

  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  updateSelectedIndexes(selectedIndex, num, sizeType) {
    if (sizeType == 'letter') {
      selectedIndexes = this.state.selectedIndexesLetter;
    } else if (sizeType == 'number') {
      selectedIndexes = this.state.selectedIndexesNumber;
    }
    // else {
    //   selectedIndexes = this.state.selectedIndexesShoe;
    // }

    if (num == 1) {
      selectedIndex = selectedIndex + 5;
    } else if (num == 2) {
      selectedIndex = selectedIndex + 10;
    } else if (num == 3) {
      selectedIndex = selectedIndex + 15;
    }

    var idx = selectedIndexes.indexOf(selectedIndex);
    if (idx < 0) {
      selectedIndexes.push(selectedIndex);
    } else  {
      selectedIndexes.splice(idx, 1);
    }

    if (sizeType == 'letter') {
      this.setState({selectedIndexesLetter: selectedIndexes});
    } else if (sizeType == 'number') {
      this.setState({selectedIndexesNumber: selectedIndexes});
    }
    // else {
    //   this.setState({selectedIndexesShoe: selectedIndexes});
    // }
  }

  render() {
    const { selectedIndexesLetter } = this.state;
    const { selectedIndexesNumber } = this.state
    // const { selectedIndexesShoe } = this.state

    return (
      <View style={styles.container}>
          <ScrollView style={{marginTop:50, marginBottom: 50}}>
            <View style={styles.inside}>
              <Text style={styles.q1}>
                Who are you?
              </Text>
              <TextInput
                label='Username (visible to other users)'
                autoCapitalize="none"
                value={this.state.username}
                style={{width: '90%', alignSelf: 'center'}}
                onChangeText={username => this.setState({ username })}
              />

              <View style={styles.profilePhotoUpload}>
                <View style={styles.profilePhotoContainer}>
                  <TouchableOpacity activeOpacity = { .3 } onPress={ this.uploadFromLibrary }>
                    <Image
                      style={ styles.profilePhoto }
                      source={{uri: this.state.profilePhotoURI }}>
                    </Image>
                    { this.state.profilePhotoUploaded > 0 ?
                      <Ionicons style={styles.close}
                                name="ios-close-circle"
                                onPress={this.deletePhoto}
                                size={25} />
                    : null }
                  </TouchableOpacity>
                </View>
                <Button
                  icon="camera"
                  color="#50CDB6"
                  mode="contained"
                  onPress={ this.uploadFromLibrary }>
                  Upload Profile Photo
                </Button>
              </View>

              <Text style={styles.q1}>
                In general, what sizes do you prefer to wear?
              </Text>
              <Text style={{fontSize: 20, marginLeft: 20, marginBottom: 10}}>
                First, choose <Text style={{fontWeight: 'bold'}}>letters</Text>.
              </Text>
              <View style={styles.group5Elems}>
                <ButtonGroup
                  onPress={(selectedIndex) => this.updateSelectedIndexes(selectedIndex, 0, 'letter')}
                  Component={TouchableOpacity}
                  selectedIndexes={selectedIndexesLetter.filter((idx) => idx < 5)}
                  buttons={this.buttonsLetter.slice(0,5)}
                  selectedButtonStyle={{backgroundColor: "#50CDB6"}}
                  containerStyle={styles.container5Elems} />
              </View>
              <View style={styles.group5Elems}>
                <ButtonGroup
                  onPress={(selectedIndex) => this.updateSelectedIndexes(selectedIndex, 1, 'letter')}
                  Component={TouchableOpacity}
                  selectedIndexes={selectedIndexesLetter.filter((idx) => (idx >= 5 & idx < 10)).map(x => x-5)}
                  buttons={this.buttonsLetter.slice(5,10)}
                  containerStyle={styles.container5Elems} />
              </View>
              <View style={styles.group3Elems}>
                <ButtonGroup
                  onPress={(selectedIndex) => this.updateSelectedIndexes(selectedIndex, 2, 'letter')}
                  Component={TouchableOpacity}
                  selectedIndexes={selectedIndexesLetter.filter((idx) => idx >= 10).map(x => x-10)}
                  buttons={this.buttonsLetter.slice(10,13)}
                  containerStyle={styles.container3Elems} />
              </View>

              <Text style={{fontSize: 20, marginLeft: 20, marginBottom: 10, marginTop: 30}}>
                Now, choose <Text style={{fontWeight: 'bold'}}>numbers</Text>.
              </Text>
              <View style={styles.group5Elems}>
                <ButtonGroup
                  onPress={(selectedIndex) => this.updateSelectedIndexes(selectedIndex, 0, 'number')}
                  selectedIndexes={selectedIndexesNumber.filter((idx) => idx < 5)}
                  buttons={this.buttonsNumber.slice(0,5)}
                  containerStyle={styles.container5Elems} />
              </View>
              <View style={styles.group5Elems}>
                <ButtonGroup
                  onPress={(selectedIndex) => this.updateSelectedIndexes(selectedIndex, 1, 'number')}
                  selectedIndexes={selectedIndexesNumber.filter((idx) => (idx >= 5 & idx < 10)).map(x => x-5)}
                  buttons={this.buttonsNumber.slice(5,10)}
                  containerStyle={styles.container5Elems}  />
              </View>
              <View style={styles.group5Elems}>
                <ButtonGroup
                  onPress={(selectedIndex) => this.updateSelectedIndexes(selectedIndex, 2, 'number')}
                  selectedIndexes={selectedIndexesNumber.filter((idx) => (idx >= 10 & idx < 15)).map(x => x-10)}
                  buttons={this.buttonsNumber.slice(10,15)}
                  containerStyle={styles.container5Elems}  />
              </View>
              <View style={styles.group3Elems}>
                <ButtonGroup
                  onPress={(selectedIndex) => this.updateSelectedIndexes(selectedIndex, 3, 'number')}
                  selectedIndexes={selectedIndexesNumber.filter((idx) => idx >= 15).map(x => x-15)}
                  buttons={this.buttonsNumber.slice(15,18)}
                  containerStyle={styles.container3Elems} />
              </View>

              {/*<Text style={styles.q1}>
                What shoe size(s) usually fit?
              </Text>
              <View style={styles.group5Elems}>
                <ButtonGroup
                  onPress={(selectedIndex) => this.updateSelectedIndexes(selectedIndex, 0, 'shoe')}
                  selectedIndexes={selectedIndexesShoe.filter((idx) => idx < 5)}
                  buttons={this.buttonsShoe.slice(0,5)}
                  containerStyle={styles.container5Elems} />
              </View>
              <View style={styles.group5Elems}>
                <ButtonGroup
                  onPress={(selectedIndex) => this.updateSelectedIndexes(selectedIndex, 1, 'shoe')}
                  selectedIndexes={selectedIndexesShoe.filter((idx) => (idx >= 5 & idx < 10)).map(x => x-5)}
                  buttons={this.buttonsShoe.slice(5,10)}
                  containerStyle={styles.container5Elems}  />
              </View>
              <View style={styles.group5Elems}>
                <ButtonGroup
                  onPress={(selectedIndex) => this.updateSelectedIndexes(selectedIndex, 2, 'shoe')}
                  selectedIndexes={selectedIndexesShoe.filter((idx) => (idx >= 10 & idx < 15)).map(x => x-10)}
                  buttons={this.buttonsShoe.slice(10,15)}
                  containerStyle={styles.container5Elems}  />
              </View>
              <View style={styles.group3Elems}>
                <ButtonGroup
                  onPress={(selectedIndex) => this.updateSelectedIndexes(selectedIndex, 3, 'shoe')}
                  selectedIndexes={selectedIndexesShoe.filter((idx) => idx >= 15).map(x => x-15)}
                  buttons={this.buttonsShoe.slice(15,18)}
                  containerStyle={styles.container3Elems} />
              </View>*/}
            </View>

            <View style={styles.submit}>
              <SubmitButton
                caption="Done for now!"
                onPress={() => this.writeUserData(this.state.currentUser)}/>
              <Text style={{fontSize: 16, marginBottom: 10, marginLeft: 10, marginTop: 20, textAlign: 'center'}}>
                (You can change your size preferences whenever in your profile.)
              </Text>
            </View>

          </ScrollView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  q1: {
    fontSize: 24,
    fontFamily: "roboto-regular",
    lineHeight: 32,
    textAlign: "left",
    marginTop: 70,
    marginBottom: 15,
    marginLeft: 20
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
    width:110,
    height:100,
    marginBottom: 10,
  },
  close: {
    margin: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: 25,
    height: 25,
    color: "#50CDB6"
  },
  profilePhotoUpload:  {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  group5Elems: {
    height: 65,
    width: 325,
    marginLeft: 8
  },
  container5Elems: {
    height: 60,
    width: 325
  },
  group3Elems: {
    height: 60,
    width: 195,
    marginLeft: 8
  },
  container3Elems: {
    height: 60,
    width: 195
  },
  inside: {
    marginBottom: 20
  },
  submit:  {
    marginTop: 30,
    width: '90%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
