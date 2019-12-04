import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import * as firebase from 'firebase'


export default class SignUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    unsubscribe();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('BuildProfile'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }


  render() {
      return (
        <View style={styles.container}>
          <Image
            style={{width: '80%', resizeMode: 'contain'}}
            source={require('../../../assets/images/logo.png')}
          />
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            label="Email"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
          />
          <TextInput
            secureTextEntry
            label="Password"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            theme={{colors: {primary: "#50CDB6", underlineColor: "#50CDB6"}}}
          />
          <Button mode="contained"
                  color="#50CDB6"
                  contentStyle={{height: 40}}
                  onPress={this.handleSignUp}
                  style={styles.button}>
            Sign Up
          </Button>
          <Button
            color="#50CDB6"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}>
            Already have an account? Login
          </Button>
        </View>
      )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 60,
    width: '90%',
    marginTop: 8
  },
  button: {
    marginTop: 15,
  }
})
