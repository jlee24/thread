import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import * as firebase from 'firebase'

export default class Profile extends React.Component {

  state = {
    currentUser: null,
    username: '',
    sizeLetter: [],
    sizeNumber: [],
    sizeShoe: [],
  };

  componentDidMount() {
    const { currentUser } = firebase.auth()
    userId = currentUser.uid;
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      sizeLetter = (snapshot.val() && snapshot.val().sizeLetter) || [];
      sizeNumber = (snapshot.val() && snapshot.val().sizeNumber) || [];
      sizeShoe = (snapshot.val() && snapshot.val().sizeShoe) || [];
    }).then(() => this.setState({
                    username: username,
                    sizeLetter: sizeLetter,
                    sizeNumber: sizeNumber,
                    sizeShoe: sizeShoe
                  }));
    this.setState({ currentUser });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Username: {this.state.username}{'\n'}
          Sizes (Letter): {this.state.sizeLetter}{'\n'}
          Sizes (Number): {this.state.sizeNumber}{'\n'}
          Shoe Sizes: {this.state.sizeShoe}
        </Text>
        <Button
          mode='outlined'
          onPress={() => this.props.navigation.navigate('UpdateProfile')}>
          Edit Profile
        </Button>
      </View>
    )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
