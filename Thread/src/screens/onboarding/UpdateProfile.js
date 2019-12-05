import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";

import { Button, TextInput } from 'react-native-paper';
import { ButtonGroup } from "react-native-elements";
import * as firebase from 'firebase';


export default class BuildProfile extends React.Component {
  state = {
    selectedIndexesLetter: [],
    selectedIndexesNumber: [],
    selectedIndexesShoe: [],
    username: '',
    currentUser: null
  }

  buttonsLetter = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '0X', '1X', '2X', '3X', '4X', '5X'];
  buttonsNumber = ['00', '0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32'];
  buttonsShoe = ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5'];


  writeUserData(user) {
    const userId = user.uid;
    const name = this.state.username;
    const email = user.email;
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      sizeLetter: this.state.selectedIndexesLetter.map(x => this.buttonsLetter[x]),
      sizeNumber: this.state.selectedIndexesNumber.map(x => this.buttonsNumber[x]),
      sizeShoe: this.state.selectedIndexesShoe.map(x => this.buttonsShoe[x]),
    })
    .then(() => this.props.navigation.navigate('Profile'))

  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    userId = currentUser.uid;

    buttonsLetter = this.buttonsLetter;
    buttonsNumber = this.buttonsNumber;
    buttonsShoe = this.buttonsShoe;

    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      username = (snapshot.val() && snapshot.val().username) || '';
      selectedIndexesLetter = (snapshot.val() && snapshot.val().sizeLetter.map(x => buttonsLetter.indexOf(x))) || [];
      selectedIndexesNumber = (snapshot.val() && snapshot.val().sizeNumber.map(x => buttonsNumber.indexOf(x))) || [];
      selectedIndexesShoe = (snapshot.val() && snapshot.val().sizeShoe.map(x => buttonsShoe.indexOf(x))) || [];
    }).then(() => this.setState({ username: username,
                          selectedIndexesLetter: selectedIndexesLetter,
                          selectedIndexesNumber: selectedIndexesNumber,
                          selectedIndexesShoe: selectedIndexesShoe,
                        }));
  }

  updateSelectedIndexes(selectedIndex, num, sizeType) {
    if (sizeType == 'letter') {
      selectedIndexes = this.state.selectedIndexesLetter;
    } else if (sizeType == 'number') {
      selectedIndexes = this.state.selectedIndexesNumber;
    } else {
      selectedIndexes = this.state.selectedIndexesShoe;
    }

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
    } else {
      this.setState({selectedIndexesShoe: selectedIndexes});
    }
  }

  render() {
    const { selectedIndexesLetter } = this.state;
    const { selectedIndexesNumber } = this.state
    const { selectedIndexesShoe } = this.state

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
            </View>

            <View style={styles.submit}>
              <Button
                color = "#7adbc9"
                mode="contained"
                labelStyle={{fontSize: 18}}
                style={{width: 200, height: 70, justifyContent: 'center'}}
                onPress={() => this.writeUserData(this.state.currentUser)}>
                  Update!
              </Button>
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
